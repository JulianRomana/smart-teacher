"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircleQuestion } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";

const transport = new DefaultChatTransport({
  api: "/api/chat",
});

function getTextContent(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

export function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport,
  });

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div className="flex h-full flex-col">
      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Explain what you've learned"
              description="Articulate your understanding. I'll help you refine it through questions."
              icon={<MessageCircleQuestion className="size-8" />}
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.role === "user" ? (
                    <p>{getTextContent(message)}</p>
                  ) : (
                    <MessageResponse>{getTextContent(message)}</MessageResponse>
                  )}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
      </Conversation>

      <div className="border-t border-border p-4">
        <PromptInput
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Explain your understanding..."
          />
          <PromptInputFooter>
            <div />
            <PromptInputSubmit status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
