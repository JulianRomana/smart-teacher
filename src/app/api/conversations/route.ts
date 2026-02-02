import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { CreateConversationRequestSchema, type Message } from "@/types/types";

const GetConversationsSchema = z.object({
  sessionId: z.string().uuid(),
  includeArchived: z.boolean().optional().default(false),
});

/**
 * GET /api/conversations
 *
 * List all conversations for a session
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const validationResult = GetConversationsSchema.safeParse({
      sessionId: searchParams.get("sessionId"),
      includeArchived: searchParams.get("includeArchived") === "true",
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validationResult.error.issues },
        { status: 400 },
      );
    }

    const { sessionId, includeArchived } = validationResult.data;

    const conversations = await db.conversation.findMany({
      where: {
        sessionId,
        ...(includeArchived ? {} : { isArchived: false }),
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json({
      conversations: conversations.map((conv) => ({
        id: conv.id,
        title: conv.title,
        isArchived: conv.isArchived,
        createdAt: conv.createdAt.toISOString(),
        updatedAt: conv.updatedAt.toISOString(),
        messageCount: (conv.messages as Message[]).length,
      })),
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversations" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/conversations
 *
 * Create a new conversation
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validationResult = CreateConversationRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validationResult.error.issues },
        { status: 400 },
      );
    }

    const { sessionId, teacherId, title } = validationResult.data;

    const conversation = await db.conversation.create({
      data: {
        sessionId,
        teacherId,
        title,
      },
    });

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        title: conversation.title,
        isArchived: conversation.isArchived,
        createdAt: conversation.createdAt.toISOString(),
        updatedAt: conversation.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 },
    );
  }
}
