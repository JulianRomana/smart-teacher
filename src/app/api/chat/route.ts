import { createGateway, streamText, convertToModelMessages } from "ai";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ChatRequestSchema, type Message } from "@/lib/types";
import { convertToUIMessage, extractTitle } from "@/lib/message-utils";

export const maxDuration = 30;

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? "",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request with Zod
    const validationResult = ChatRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validationResult.error.issues },
        { status: 400 },
      );
    }

    const { messages, conversationId, teacherId } = validationResult.data;

    // Fetch teacher's system prompt
    const teacher = await db.teacher.findUnique({
      where: { id: teacherId },
      select: { systemPrompt: true },
    });

    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 },
      );
    }

    // Save user message atomically with transaction
    const userMessage = messages[messages.length - 1];

    await db.$transaction(async (tx) => {
      const conversation = await tx.conversation.findUnique({
        where: { id: conversationId },
        select: { messages: true },
      });

      if (!conversation) {
        throw new Error("Conversation not found");
      }

      const currentMessages = conversation.messages as Message[];
      const isFirstMessage = currentMessages.length === 0;

      await tx.conversation.update({
        where: { id: conversationId },
        data: {
          messages: [...currentMessages, userMessage],
          ...(isFirstMessage && { title: extractTitle(userMessage) }),
        },
      });
    });

    // Stream AI response
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: gateway("anthropic/claude-3-5-sonnet-20241022"),
      system: teacher.systemPrompt,
      messages: modelMessages,
      async onFinish({ response }) {
        if (!response.messages || response.messages.length === 0) {
          return;
        }

        try {
          // Find the last assistant message
          const lastMessage = response.messages[response.messages.length - 1];

          // Only process assistant messages
          if (lastMessage.role !== "assistant") {
            return;
          }

          const assistantMessage = convertToUIMessage(lastMessage);

          // Save assistant message atomically
          await db.$transaction(async (tx) => {
            const conversation = await tx.conversation.findUnique({
              where: { id: conversationId },
              select: { messages: true },
            });

            if (!conversation) {
              throw new Error("Conversation not found");
            }

            const currentMessages = conversation.messages as Message[];

            await tx.conversation.update({
              where: { id: conversationId },
              data: {
                messages: [...currentMessages, assistantMessage],
              },
            });
          });
        } catch (error) {
          console.error("Error saving assistant message:", error);
          // Don't fail the stream if database save fails
        }
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
