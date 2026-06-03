import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import type { NextRequest } from "next/server";

// GET /api/movies?genre=&limit=
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get("genre");
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

    const movies = await prisma.movie.findMany({
      where: genre ? { genre } : undefined,
      orderBy: { voteAverage: "desc" },
      take: limit,
    });

    return ok({ movies, count: movies.length });
  } catch (e) {
    console.error(e);
    return fail("Failed to fetch movies", { status: 500, code: "DB_ERROR" });
  }
}

// POST /api/movies — create a new movie
type CreateMovieBody = {
  slug?: string;
  title?: string;
  overview?: string;
  posterUrl?: string;
  releaseDate?: string;
  genre?: string;
  voteAverage?: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateMovieBody;

    if (!body.slug || !body.title || !body.overview || !body.genre) {
      return fail("Missing required fields: slug, title, overview, genre", {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    const movie = await prisma.movie.create({
      data: {
        slug: body.slug,
        title: body.title,
        overview: body.overview,
        posterUrl: body.posterUrl,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : null,
        genre: body.genre,
        voteAverage: body.voteAverage ?? 0,
      },
    });

    return ok(movie, { status: 201 });
  } catch (e) {
    if ((e as { code?: string }).code === "P2002") {
      return fail("A movie with this slug already exists", {
        status: 409,
        code: "DUPLICATE_SLUG",
      });
    }
    console.error(e);
    return fail("Failed to create movie", { status: 500, code: "DB_ERROR" });
  }
}
