"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { searchMovies, type SearchResult } from "@/actions/search";

export function SearchForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handle = setTimeout(() => {
      startTransition(async () => {
        const r = await searchMovies(query);
        setResults(r);
      });
    }, 200);
    return () => clearTimeout(handle);
  }, [query]);

  return (
    <div className="space-y-6">
      <Input
        type="search"
        placeholder="search titles, overviews..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {isPending ? "searching..." : query ? `${results.length} results` : "type to search"}
      </div>

      {results.length > 0 && (
        <ul className="border border-foreground/20">
          {results.map((r) => (
            <li key={r.id} className="border-b border-foreground/20 last:border-b-0">
              <Link
                href={`/movies/${r.slug}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-foreground/5"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">{r.title}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    ★ {r.voteAverage.toFixed(1)}
                  </span>
                </div>
                <Badge variant="outline">{r.genre}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
