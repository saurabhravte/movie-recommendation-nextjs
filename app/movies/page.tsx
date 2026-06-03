import { prisma } from "@/lib/prisma";
import { MovieCard } from "@/components/movie-card";
import Link from "next/link";

// SSR: this page is rendered on every request because it uses searchParams
// (dynamic API). It's always fresh.
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ genre?: string }>;

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { genre } = await searchParams;

  const movies = await prisma.movie.findMany({
    where: genre ? { genre } : undefined,
    orderBy: { voteAverage: "desc" },
  });

  const genres = await prisma.movie.findMany({
    distinct: ["genre"],
    select: { genre: true },
    orderBy: { genre: "asc" },
  });

  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-foreground/20 pb-6">
        <h1 className="text-2xl font-bold">All movies</h1>
        <p className="text-xs text-muted-foreground">
          Server-rendered on every request · {movies.length} results
        </p>
      </header>

      <nav className="flex flex-wrap gap-2">
        <Link
          href="/movies"
          className={`text-[10px] uppercase tracking-wider border px-3 py-1 ${
            !genre
              ? "border-foreground bg-foreground text-background"
              : "border-foreground/40 hover:border-foreground"
          }`}
        >
          all
        </Link>
        {genres.map((g) => (
          <Link
            key={g.genre}
            href={`/movies?genre=${g.genre}`}
            className={`text-[10px] uppercase tracking-wider border px-3 py-1 ${
              genre === g.genre
                ? "border-foreground bg-foreground text-background"
                : "border-foreground/40 hover:border-foreground"
            }`}
          >
            {g.genre}
          </Link>
        ))}
      </nav>

      {movies.length === 0 ? (
        <p className="text-sm text-muted-foreground">No movies found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              slug={m.slug}
              title={m.title}
              posterUrl={m.posterUrl}
              releaseDate={m.releaseDate}
              genre={m.genre}
              voteAverage={m.voteAverage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
