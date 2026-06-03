import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { WatchlistButton } from "../watchlist-button";

// ISR: page is statically generated on first request, then re-validated
// at most every 60 seconds.
export const revalidate = 60;

// Pre-generate the most popular slugs at build time
export async function generateStaticParams() {
  const movies = await prisma.movie.findMany({
    select: { slug: true },
    orderBy: { voteAverage: "desc" },
    take: 5,
  });
  return movies.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const movie = await prisma.movie.findUnique({ where: { slug } });
  return {
    title: movie ? `${movie.title} — mvx` : "Not found",
    description: movie?.overview,
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const movie = await prisma.movie.findUnique({ where: { slug } });

  if (!movie) notFound();

  return (
    <article className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
        <div className="relative aspect-[2/3] border border-foreground/20 bg-muted">
          {movie.posterUrl && (
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover grayscale"
              priority
            />
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Badge variant="outline">{movie.genre}</Badge>
            <h1 className="text-3xl font-bold tracking-tight">{movie.title}</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {formatDate(movie.releaseDate)} · ★ {movie.voteAverage.toFixed(1)}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{movie.overview}</p>

          <div className="flex gap-3 pt-2">
            <WatchlistButton movieId={movie.id} />
            <Link
              href={`/movies/${movie.slug}/cast`}
              className="text-xs uppercase tracking-widest border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
            >
              view cast →
            </Link>
          </div>

          <p className="text-[10px] text-muted-foreground pt-4 border-t border-foreground/20">
            ISR · revalidates every 60s · generated at {new Date().toISOString()}
          </p>
        </div>
      </div>
    </article>
  );
}
