import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/conversations/:id
 *
 * Get a conversation with all its messages
 */
export async function GET(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const conversation = await db.conversation.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        isArchived: true,
        createdAt: true,
        updatedAt: true,
        messages: true,
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        title: conversation.title,
        isArchived: conversation.isArchived,
        createdAt: conversation.createdAt.toISOString(),
        updatedAt: conversation.updatedAt.toISOString(),
        messages: conversation.messages, // Already in UIMessage format
      },
    });
  } catch (error) {
    console.error("Error fetching conversation:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/conversations/:id
 *
 * Update a conversation
 */
export async function PATCH(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { title, isArchived } = body;

    const updateData: { title?: string; isArchived?: boolean } = {};
    if (title !== undefined) updateData.title = title;
    if (isArchived !== undefined) updateData.isArchived = isArchived;

    const conversation = await db.conversation.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        title: conversation.title,
        isArchived: conversation.isArchived,
        createdAt: conversation.createdAt.toISOString(),
        updatedAt: conversation.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error updating conversation:", error);
    return NextResponse.json(
      { error: "Failed to update conversation" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/conversations/:id
 *
 * Delete a conversation
 */
export async function DELETE(req: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    await db.conversation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return NextResponse.json(
      { error: "Failed to delete conversation" },
      { status: 500 },
    );
  }
}
