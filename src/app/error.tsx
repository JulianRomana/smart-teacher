"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mb-8 text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go home
          </Button>
        </div>
        {error.digest && (
          <p className="mt-4 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
