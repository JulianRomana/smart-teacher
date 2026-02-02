import { z } from "zod";

/**
 * Message Types
 *
 * These types define the structure of messages in conversations.
 * They match the UIMessage format from the AI SDK.
 */

export const MessagePartSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  parts: z.array(MessagePartSchema),
});

export type MessagePart = z.infer<typeof MessagePartSchema>;
export type Message = z.infer<typeof MessageSchema>;

/**
 * API Request/Response Schemas
 */

export const CreateConversationRequestSchema = z.object({
  sessionId: z.string().uuid(),
  teacherId: z.string().uuid(),
  title: z.string().optional().default("New Conversation"),
});

export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema),
  conversationId: z.string().uuid(),
  teacherId: z.string().uuid(),
});

export type CreateConversationRequest = z.infer<
  typeof CreateConversationRequestSchema
>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
