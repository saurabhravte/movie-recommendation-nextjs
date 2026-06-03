import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

// SSR: always fresh, no cache
export const dynamic = "force-dynamic";

type CastMember = { name: string; character: string };

export default async function CastPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const movie = await prisma.movie.findUnique({
    where: { slug },
    select: { id: true, title: true, slug: true, cast: true },
  });

  if (!movie) notFound();

  const cast = (movie.cast as CastMember[] | null) ?? [];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Link
          href={`/movies/${movie.slug}`}
          className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          ← {movie.title}
        </Link>
        <h1 className="text-2xl font-bold">Cast</h1>
        <p className="text-xs text-muted-foreground">
          Nested dynamic route · /movies/[slug]/cast
        </p>
      </div>

      {cast.length === 0 ? (
        <p className="text-sm text-muted-foreground">No cast on file.</p>
      ) : (
        <div className="border border-foreground/20">
          {cast.map((member, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-foreground/20 last:border-b-0 px-4 py-3"
            >
              <span className="font-medium text-sm">{member.name}</span>
              <span className="text-xs text-muted-foreground">{member.character}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
