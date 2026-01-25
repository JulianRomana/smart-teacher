import { Chat } from "@/components/chat";
import { Notes } from "@/components/notes";

export default function Home() {
  return (
    <div className="flex h-screen">
      <aside className="w-1/2 border-r border-border">
        <Notes />
      </aside>
      <main className="w-1/2">
        <Chat />
      </main>
    </div>
  );
}
