"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NotesPanelProps {
  className?: string;
  conversationId: string;
}

const toolbarButtons = [
  { icon: Bold, label: "Bold", shortcut: "Ctrl+B", action: "toggleBold" },
  { icon: Italic, label: "Italic", shortcut: "Ctrl+I", action: "toggleItalic" },
  { icon: List, label: "List", shortcut: "Ctrl+L", action: "toggleBulletList" },
  { icon: Code, label: "Code", shortcut: "Ctrl+E", action: "toggleCodeBlock" },
] as const;

export function NotesPanel({ className, conversationId }: NotesPanelProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h1>Notes: Wealth of Nations - Ch. 1</h1>
      <p><em>Last edited 2 mins ago</em></p>

      <h2>The Division of Labor</h2>
      <p>The greatest improvement in the productive powers of labour, and the greater part of the skill, dexterity, and judgment with which it is any where directed, or applied, seem to have been the effects of the division of labour.</p>
      <ul>
        <li>Increases dexterity in individual workers</li>
        <li>Saves time lost in switching between tasks</li>
        <li>Enables invention of specialized machinery</li>
      </ul>

      <h2>Origin of Money</h2>
      <p>When the division of labour has been once thoroughly established, it is but a very small part of a man's wants which the produce of his own labour can supply. Every man thus lives by exchanging, or becomes in some measure a merchant.</p>
      <blockquote>
        <p>"It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest."</p>
      </blockquote>
    `,
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none p-6",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className={cn("flex h-full flex-col bg-[#161b22]", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-1">
          {toolbarButtons.map(({ icon: Icon, label, shortcut, action }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-50"
                  onClick={() => {
                    if (editor) {
                      // @ts-ignore - Tiptap commands are dynamically typed
                      editor.chain().focus()[action]().run();
                    }
                  }}
                  disabled={!editor}
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

      {/* Editor area */}
      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
