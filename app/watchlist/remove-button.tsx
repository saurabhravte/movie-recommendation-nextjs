"use client";

import { useTransition } from "react";
import { removeFromWatchlist } from "@/actions/watchlist";
import { Button } from "@/components/ui/button";

export function RemoveButton({ movieId }: { movieId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          removeFromWatchlist(movieId);
        })
      }
    >
      {isPending ? "removing..." : "remove"}
    </Button>
  );
}
