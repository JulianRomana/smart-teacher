import { cache } from "react";
import { db } from "@/lib/db";

/**
 * Cached teacher query with React.cache() for per-request deduplication
 * Following react-best-practices: server-cache-react
 */
export const getTeachers = cache(async () => {
  return await db.teacher.findMany({
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
});
