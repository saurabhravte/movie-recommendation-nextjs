"use client";

import { useEffect, useState, useTransition } from "react";
import { addToWatchlist, isInWatchlist, removeFromWatchlist } from "@/actions/watchlist";
import { Button } from "@/components/ui/button";

export function WatchlistButton({ movieId }: { movieId: string }) {
  const [inList, setInList] = useState<boolean | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    isInWatchlist(movieId).then(setInList);
  }, [movieId]);

  const toggle = () => {
    startTransition(async () => {
      if (inList) {
        await removeFromWatchlist(movieId);
        setInList(false);
      } else {
        await addToWatchlist(movieId);
        setInList(true);
      }
    });
  };

  return (
    <Button
      onClick={toggle}
      disabled={isPending || inList === null}
      variant={inList ? "outline" : "default"}
      size="sm"
    >
      {inList === null
        ? "···"
        : inList
          ? isPending
            ? "removing..."
            : "✓ in watchlist"
          : isPending
            ? "adding..."
            : "+ watchlist"}
    </Button>
  );
}
