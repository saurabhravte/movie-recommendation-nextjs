import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { MovieCard } from "@/components/movie-card";

// SSG: pages for every genre are generated at build time.
// dynamicParams=false means any unknown genre 404s instead of rendering on demand.
export const dynamicParams = false;

export async function generateStaticParams() {
  const genres = await prisma.movie.findMany({
    distinct: ["genre"],
    select: { genre: true },
  });
  return genres.map((g) => ({ genre: g.genre }));
}

export default async function GenrePage({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;

  const movies = await prisma.movie.findMany({
    where: { genre },
    orderBy: { voteAverage: "desc" },
  });

  if (movies.length === 0) notFound();

  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-foreground/20 pb-6">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Genre</p>
        <h1 className="text-3xl font-bold capitalize">{genre}</h1>
        <p className="text-xs text-muted-foreground">
          Statically generated at build time · {movies.length} titles
        </p>
      </header>

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
    </div>
  );
}
