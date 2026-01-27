import { Sidebar } from "@/components/sidebar";
import { NotesPanel } from "@/components/notes-panel";
import { ChatPanel } from "@/components/chat-panel";
import { TutorPanel } from "@/components/tutor-panel";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Home() {
  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Left Sidebar - Navigation */}
        <Sidebar />

        {/* Notes Panel */}
        <div className="w-[400px] flex-shrink-0 border-r border-border">
          <NotesPanel />
        </div>

        {/* Chat Panel - Flexible width */}
        <div className="flex-1 min-w-0 border-r border-border">
          <ChatPanel />
        </div>

        {/* Tutor Panel - Right side */}
        <TutorPanel />
      </div>
    </TooltipProvider>
  );
}
