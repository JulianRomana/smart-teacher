import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/teachers
 *
 * List all available teachers
 */
export async function GET() {
  try {
    const teachers = await db.teacher.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        subject: true,
        description: true,
        avatarEmoji: true,
      },
    });

    return NextResponse.json({ teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 },
    );
  }
}
