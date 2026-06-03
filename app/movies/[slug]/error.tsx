"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="border border-foreground p-6 space-y-4">
      <h2 className="text-lg font-semibold">Could not load this movie</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset} variant="outline" size="sm">
        retry
      </Button>
    </div>
  );
}
