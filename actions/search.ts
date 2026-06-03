"use server";

import { prisma } from "@/lib/prisma";

export type SearchResult = {
  id: string;
  slug: string;
  title: string;
  genre: string;
  posterUrl: string | null;
  voteAverage: number;
};

export async function searchMovies(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (!q) return [];

  const results = await prisma.movie.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { overview: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      slug: true,
      title: true,
      genre: true,
      posterUrl: true,
      voteAverage: true,
    },
    take: 20,
  });

  return results;
}
