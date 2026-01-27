"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  MoreHorizontal,
  PlusCircle,
  Mic,
  ArrowUp,
  Sparkles,
  FileText,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  sender?: string;
  avatar?: string;
  actions?: { label: string; onClick?: () => void }[];
}

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "assistant",
    sender: "Adam Smith AI",
    avatar: "/adam-smith-avatar.png",
    content:
      "Welcome to our study of *The Wealth of Nations*. I see you've started notes on the Division of Labor. Would you like to explore how this concept relates to universal opulence?",
  },
  {
    id: "2",
    role: "user",
    sender: "You",
    content:
      "Yes! I'm particularly interested in the pin factory example. Can you explain how specialization increases productivity?",
  },
  {
    id: "3",
    role: "assistant",
    sender: "Adam Smith AI",
    avatar: "/adam-smith-avatar.png",
    content: `The pin factory example brilliantly illustrates three key benefits of specialization:

1. **Increased dexterity** - Workers become highly skilled at their specific task
2. **Time savings** - No switching between different types of work
3. **Innovation opportunity** - Focused workers often devise improvements

I've highlighted these points in your notes as well.`,
    actions: [
      { label: "Create flashcard" },
      { label: "Expand on 'dexterity'" },
    ],
  },
];

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

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar size="sm" className="mt-1 flex-shrink-0">
        {message.avatar ? (
          <AvatarImage src={message.avatar} alt={message.sender || "Avatar"} />
        ) : null}
        <AvatarFallback className={cn(isUser && "bg-blue-600 text-white")}>
          {isUser ? "U" : "AS"}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex flex-col gap-1 max-w-[85%]", isUser && "items-end")}>
        <span className="text-xs text-gray-400">{message.sender}</span>
        <div
          className={cn(
            "rounded-lg px-4 py-3 text-sm",
            isUser
              ? "bg-[#1f6feb] text-white"
              : "bg-[#21262d] text-gray-200"
          )}
        >
          <div
            className="prose prose-sm prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: message.content
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/\n/g, "<br />"),
            }}
          />
        </div>

        {message.actions && message.actions.length > 0 && (
          <div className="flex gap-2 mt-2">
            {message.actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={action.onClick}
                className="text-xs text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export interface ChatPanelProps {
  className?: string;
  topic?: string;
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
}

export function ChatPanel({
  className,
  topic = "Economic Principles",
  messages = sampleMessages,
  onSendMessage,
}: ChatPanelProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("message") as HTMLInputElement;
    if (input.value.trim()) {
      onSendMessage?.(input.value);
      input.value = "";
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-[#161b22]",
        className
      )}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
        <div>
          <h2 className="text-lg font-bold text-white">Discussion</h2>
          <p className="text-sm text-gray-400">Topic: {topic}</p>
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
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="flex flex-col gap-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
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
              placeholder="Ask Adam Smith anything..."
              className="h-10 w-full rounded-full border border-gray-600 bg-[#21262d] px-4 pr-10 text-sm text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            className="flex-shrink-0 rounded-full bg-[#1f6feb] text-white hover:bg-[#388bfd]"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
