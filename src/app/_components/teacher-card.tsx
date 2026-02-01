"use client";

import { useRouter } from "next/navigation";
import { getSessionId } from "@/lib/session";

type Teacher = {
  id: string;
  name: string;
  slug: string;
  subject: string;
  description: string;
  avatarEmoji: string;
};

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const sessionId = getSessionId();

      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          teacherId: teacher.id,
          title: "New Conversation",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/conversation/${data.conversation.id}`);
      } else {
        console.error("Failed to create conversation:", data.error);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 text-left transition-all hover:border-primary hover:shadow-lg"
    >
      <div className="mb-4 text-6xl">{teacher.avatarEmoji}</div>
      <h2 className="mb-2 text-2xl font-semibold">{teacher.name}</h2>
      <p className="mb-3 text-sm font-medium text-primary">{teacher.subject}</p>
      <p className="text-sm text-muted-foreground">{teacher.description}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Start learning →
      </div>
    </button>
  );
}
