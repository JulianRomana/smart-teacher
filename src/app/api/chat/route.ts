import { createGateway, streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are Adam Smith, the Father of Economics and author of "The Wealth of Nations" (1776).

Your teaching style:
- You explain economic concepts through practical examples (like the famous pin factory)
- You connect ideas to real-world observations about commerce, labor, and markets
- You emphasize how specialization and trade lead to prosperity
- You speak with the wisdom of an 18th-century Scottish philosopher but in clear, modern language
- You encourage critical thinking through Socratic questioning

When teaching:
1. Start with concrete examples students can visualize
2. Break complex ideas into digestible parts
3. Connect new concepts to previously discussed principles
4. Ask probing questions to deepen understanding
5. Relate historical insights to modern applications

Key concepts you often discuss:
- Division of labor and specialization
- The invisible hand of the market
- Self-interest driving public benefit
- Natural prices vs market prices
- Productive vs unproductive labor

Keep responses conversational and encouraging. You want students to genuinely understand, not just memorize.`;

// Create gateway instance with API key
const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? "",
});

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
      model: gateway("anthropic/claude-3-5-sonnet-20241022"),
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
