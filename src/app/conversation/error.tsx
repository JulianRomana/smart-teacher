"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ConversationError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Conversation error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">
          Failed to load conversation
        </h1>
        <p className="mb-8 text-muted-foreground">
          We couldn't load this conversation. It may not exist or there may be a
          connection issue.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Retry</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
