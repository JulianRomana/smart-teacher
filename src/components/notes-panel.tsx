"use client";

import { Bold, Italic, List, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NotesPanelProps {
  className?: string;
}

const toolbarButtons = [
  { icon: Bold, label: "Bold", shortcut: "Ctrl+B" },
  { icon: Italic, label: "Italic", shortcut: "Ctrl+I" },
  { icon: List, label: "List", shortcut: "Ctrl+L" },
  { icon: Code, label: "Code", shortcut: "Ctrl+E" },
] as const;

export function NotesPanel({ className }: NotesPanelProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col bg-[#161b22]",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-1">
          {toolbarButtons.map(({ icon: Icon, label, shortcut }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-gray-400 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {label} ({shortcut})
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Button
          size="sm"
          className="gap-1.5 bg-blue-600 text-white hover:bg-blue-700"
        >
          <Sparkles className="size-3.5" />
          Summarize
        </Button>
      </div>

      {/* Content area */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Title and metadata */}
          <h1 className="text-xl font-semibold text-white">
            Notes: Wealth of Nations - Ch. 1
          </h1>
          <p className="mt-1 text-sm text-gray-500">Last edited 2 mins ago</p>

          <Separator className="my-6 bg-white/10" />

          {/* Content */}
          <article className="space-y-6 text-gray-300">
            <section>
              <h2 className="mb-3 text-lg font-medium text-blue-400">
                The Division of Labor
              </h2>
              <p className="leading-relaxed">
                The greatest improvement in the productive powers of labour, and
                the greater part of the skill, dexterity, and judgment with which
                it is any where directed, or applied, seem to have been the
                effects of the division of labour.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-gray-500">
                <li>Increases dexterity in individual workers</li>
                <li>Saves time lost in switching between tasks</li>
                <li>Enables invention of specialized machinery</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-medium text-blue-400">
                Origin of Money
              </h2>
              <p className="leading-relaxed">
                When the division of labour has been once thoroughly established,
                it is but a very small part of a man&apos;s wants which the
                produce of his own labour can supply. Every man thus lives by
                exchanging, or becomes in some measure a merchant.
              </p>

              <blockquote className="mt-4 border-l-4 border-blue-500/50 bg-white/5 py-3 pl-4 pr-3 text-gray-400 italic">
                &ldquo;It is not from the benevolence of the butcher, the brewer,
                or the baker that we expect our dinner, but from their regard to
                their own interest.&rdquo;
              </blockquote>
            </section>
          </article>
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-white/10 p-4">
        <Textarea
          placeholder="Continue typing your notes here..."
          className="min-h-[80px] resize-none border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20"
        />
      </div>
    </div>
  );
}
