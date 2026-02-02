import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { NotesPanel } from "@/app/(app)/conversation/_components/notes-panel";
import { ChatPanel } from "@/app/(app)/conversation/_components/chat-panel";
import { TutorPanel } from "@/app/(app)/conversation/_components/tutor-panel";
import type { Message } from "@/types/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ConversationPage({ params }: PageProps) {
  const { id } = await params;

  const conversation = await db.conversation.findUnique({
    where: { id },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          subject: true,
        },
      },
    },
  });

  if (!conversation) {
    notFound();
  }

  return (
    <>
      <div className="w-[400px] flex-shrink-0 border-r border-border">
        <NotesPanel conversationId={conversation.id} />
      </div>

      <div className="flex-1 min-w-0 border-r border-border">
        <ChatPanel
          conversationId={conversation.id}
          teacherId={conversation.teacherId}
          teacherName={conversation.teacher.name}
          initialMessages={(conversation.messages as Message[]) || []}
        />
      </div>

      <TutorPanel />
    </>
  );
}
