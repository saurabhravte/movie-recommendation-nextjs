import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type MovieCardProps = {
  slug: string;
  title: string;
  posterUrl?: string | null;
  releaseDate?: Date | string | null;
  genre: string;
  voteAverage: number;
};

export function MovieCard({
  slug,
  title,
  posterUrl,
  releaseDate,
  genre,
  voteAverage,
}: MovieCardProps) {
  return (
    <Link
      href={`/movies/${slug}`}
      className="group block border border-foreground/20 hover:border-foreground transition-colors"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover grayscale group-hover:grayscale-0 transition-all"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            no poster
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant="default">{voteAverage.toFixed(1)}</Badge>
        </div>
      </div>
      <div className="p-3 space-y-2">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>{formatDate(releaseDate)}</span>
          <Badge variant="outline">{genre}</Badge>
        </div>
      </div>
    </Link>
  );
}
