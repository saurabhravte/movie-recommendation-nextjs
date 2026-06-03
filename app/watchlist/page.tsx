import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/session";
import { MovieCard } from "@/components/movie-card";
import { RemoveButton } from "./remove-button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WatchlistPage() {
  const userId = await getUserId();

  const items = userId
    ? await prisma.watchlistItem.findMany({
        where: { userId },
        include: { movie: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-foreground/20 pb-6">
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <p className="text-xs text-muted-foreground">
          {items.length} {items.length === 1 ? "movie" : "movies"} · stored in DB ·
          modified via Server Actions
        </p>
      </header>

      {items.length === 0 ? (
        <div className="border border-foreground/20 p-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">Your watchlist is empty.</p>
          <Link
            href="/movies"
            className="inline-block text-xs uppercase tracking-widest border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            browse movies →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="space-y-2">
              <MovieCard
                slug={item.movie.slug}
                title={item.movie.title}
                posterUrl={item.movie.posterUrl}
                releaseDate={item.movie.releaseDate}
                genre={item.movie.genre}
                voteAverage={item.movie.voteAverage}
              />
              <RemoveButton movieId={item.movie.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
