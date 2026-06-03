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
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4 border border-foreground p-6">
      <h2 className="text-lg font-semibold">Something broke.</h2>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      {error.digest && (
        <p className="text-[10px] text-muted-foreground">digest: {error.digest}</p>
      )}
      <Button onClick={reset} variant="outline" size="sm">
        try again
      </Button>
    </div>
  );
}
