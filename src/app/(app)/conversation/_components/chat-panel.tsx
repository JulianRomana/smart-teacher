"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Message } from "@/types/types";
import {
  MoreHorizontal,
  PlusCircle,
  Mic,
  ArrowUp,
  Sparkles,
  FileText,
} from "lucide-react";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const quickActions: QuickAction[] = [
  {
    icon: <Sparkles className="h-4 w-4" />,
    label: "Explain 'Opulence'",
  },
  {
    icon: <FileText className="h-4 w-4" />,
    label: "Add definition to notes",
  },
];

function MessageBubble({
  message,
  teacherName,
}: {
  message: Message | any;
  teacherName: string;
}) {
  const isUser = message.role === "user";
  const sender = isUser ? "You" : teacherName;

  // Extract text from message parts (safe - no HTML rendering)
  const content = message.parts
    .filter((part: any) => part.type === "text")
    .map((part: any) => part.text)
    .join("");

  // Safe markdown-like formatting without dangerouslySetInnerHTML
  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {i > 0 && <br />}
        {line}
      </span>
    ));
  };

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar size="sm" className="mt-1 shrink-0">
        {!isUser ? (
          <AvatarImage src="/adam-smith-avatar.jpg" alt={sender} />
        ) : null}
        <AvatarFallback className={cn(isUser && "bg-blue-600 text-white")}>
          {isUser ? "U" : "AS"}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn("flex flex-col gap-1 max-w-[85%]", isUser && "items-end")}
      >
        <span className="text-xs text-gray-400">{sender}</span>
        <div
          className={cn(
            "rounded-lg px-4 py-3 text-sm whitespace-pre-wrap",
            isUser ? "bg-[#1f6feb] text-white" : "bg-[#21262d] text-gray-200",
          )}
        >
          {formatText(content)}
        </div>

        {!isUser && (
          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
            >
              Create flashcard
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
            >
              Add to notes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export interface ChatPanelProps {
  className?: string;
  conversationId: string;
  teacherId: string;
  teacherName: string;
  initialMessages: Message[];
}

function ChatContent({
  conversationId,
  teacherId,
  teacherName,
  initialMessages,
}: ChatPanelProps) {
  const transport = new DefaultChatTransport({
    api: "/api/chat",
    fetch: async (url, options) => {
      const originalBody = options?.body
        ? JSON.parse(options.body as string)
        : {};

      const cleanedMessages = originalBody.messages?.map((msg: any) => ({
        ...msg,
        parts: msg.parts?.filter((part: any) => part.type === "text") || [],
      }));

      const mergedBody = {
        ...originalBody,
        messages: cleanedMessages,
        teacherId,
        conversationId,
      };

      return fetch(url, {
        ...options,
        body: JSON.stringify(mergedBody),
      });
    },
  });

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: initialMessages as any,
  });

  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status !== "streaming") {
      const userMessage = input;
      setInput("");

      await sendMessage({ text: userMessage });
    }
  };

  const isLoading = status === "submitted";

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]",
        );
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    };

    scrollToBottom();
    // Use a small delay to ensure DOM has updated
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, status]);

  return (
    <div className="flex h-full flex-col bg-[#161b22]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <div>
          <h2 className="text-lg font-bold text-white">
            Discussion with {teacherName}
          </h2>
          <p className="text-sm text-gray-400">
            Conversation ID: {conversationId.slice(0, 8)}...
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
        <div className="flex flex-col gap-6 px-4 py-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <Sparkles className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Welcome to your study session with {teacherName}
              </h3>
              <p className="text-gray-400 max-w-md">
                Ask any question to start learning. I'm here to help you
                understand complex concepts through discussion.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                teacherName={teacherName}
              />
            ))
          )}
          {isLoading && (
            <div className="flex gap-3">
              <Avatar size="sm" className="mt-1 shrink-0">
                <AvatarImage src="/adam-smith-avatar.jpg" alt="Adam Smith AI" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 max-w-[85%]">
                <span className="text-xs text-gray-400">{teacherName}</span>
                <div className="rounded-lg px-4 py-3 text-sm bg-[#21262d] text-gray-200">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions Bar */}
      <div className="border-t border-gray-700 px-4 py-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="flex-shrink-0 gap-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="flex-shrink-0 text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <PlusCircle className="h-5 w-5" />
          </Button>

          <div className="relative flex-1">
            <input
              name="message"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${teacherName} anything...`}
              disabled={isLoading}
              className="h-10 w-full rounded-full border border-gray-600 bg-[#21262d] px-4 pr-10 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>

          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="flex-shrink-0 rounded-full bg-[#1f6feb] text-white hover:bg-[#388bfd] disabled:opacity-50"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export function ChatPanel(props: ChatPanelProps) {
  return <ChatContent {...props} />;
}
