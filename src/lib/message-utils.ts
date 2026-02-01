import type { AssistantModelMessage } from "ai";
import type { Message } from "./types";

/**
 * Convert AI SDK AssistantModelMessage to our UIMessage format
 */
export function convertToUIMessage(
  coreMessage: AssistantModelMessage,
): Message {
  let parts: Message["parts"];

  if (typeof coreMessage.content === "string") {
    parts = [{ type: "text", text: coreMessage.content }];
  } else if (Array.isArray(coreMessage.content)) {
    parts = coreMessage.content
      .filter((part) => part.type === "text")
      .map((part) => ({
        type: "text" as const,
        text: part.text,
      }));
  } else {
    parts = [{ type: "text", text: String(coreMessage.content) }];
  }

  return {
    id: crypto.randomUUID(),
    role: coreMessage.role as "assistant",
    parts,
  };
}

/**
 * Extract title from first user message
 */
export function extractTitle(message: Message): string {
  const text = message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join(" ");

  return text.slice(0, 50) + (text.length > 50 ? "..." : "");
}
