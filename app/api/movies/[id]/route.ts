import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import type { NextRequest } from "next/server";

type Params = { params: Promise<{ id: string }> };

// GET /api/movies/:id
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const movie = await prisma.movie.findUnique({ where: { id } });

    if (!movie) {
      return fail("Movie not found", { status: 404, code: "NOT_FOUND" });
    }

    return ok(movie);
  } catch (e) {
    console.error(e);
    return fail("Failed to fetch movie", { status: 500, code: "DB_ERROR" });
  }
}

// PATCH /api/movies/:id
type UpdateBody = Partial<{
  title: string;
  overview: string;
  posterUrl: string;
  releaseDate: string;
  genre: string;
  voteAverage: number;
}>;

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = (await req.json()) as UpdateBody;

    const movie = await prisma.movie.update({
      where: { id },
      data: {
        ...body,
        releaseDate: body.releaseDate ? new Date(body.releaseDate) : undefined,
      },
    });

    return ok(movie);
  } catch (e) {
    if ((e as { code?: string }).code === "P2025") {
      return fail("Movie not found", { status: 404, code: "NOT_FOUND" });
    }
    console.error(e);
    return fail("Failed to update movie", { status: 500, code: "DB_ERROR" });
  }
}

// DELETE /api/movies/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.movie.delete({ where: { id } });
    return ok({ deleted: true, id });
  } catch (e) {
    if ((e as { code?: string }).code === "P2025") {
      return fail("Movie not found", { status: 404, code: "NOT_FOUND" });
    }
    console.error(e);
    return fail("Failed to delete movie", { status: 500, code: "DB_ERROR" });
  }
}
