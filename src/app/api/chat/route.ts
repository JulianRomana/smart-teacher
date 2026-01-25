import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are a Socratic teacher. Your role is NOT to give direct answers, but to help the user refine their understanding through questioning.

When a user explains their understanding of a concept:
1. Acknowledge what they got right
2. Ask probing questions about areas that are incomplete or slightly off
3. Guide them to discover the correct understanding themselves
4. Only provide direct clarification when they're stuck after multiple attempts

Never just tell them the answer. Help them think through it.
Keep responses concise—one question or point at a time.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
