import { db } from "@/lib/db";
import { TeacherCard } from "./_components/teacher-card";

export default async function Home() {
  const teachers = await db.teacher.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      subject: true,
      description: true,
      avatarEmoji: true,
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          Smart Teacher
        </h1>
        <p className="mb-12 text-xl text-muted-foreground">
          Learn through the Socratic method with legendary thinkers
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))
          ) : (
            <p className="col-span-2 text-center text-muted-foreground">
              No teachers available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
