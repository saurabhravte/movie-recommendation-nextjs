import { prisma } from "@/lib/prisma";
import { ok, fail } from "@/lib/api-response";
import { getOrCreateUserId } from "@/lib/session";
import type { NextRequest } from "next/server";

// GET /api/watchlist — list current user's watchlist
export async function GET() {
  try {
    const userId = await getOrCreateUserId();
    const items = await prisma.watchlistItem.findMany({
      where: { userId },
      include: { movie: true },
      orderBy: { createdAt: "desc" },
    });
    return ok({ items, count: items.length });
  } catch (e) {
    console.error(e);
    return fail("Failed to fetch watchlist", { status: 500, code: "DB_ERROR" });
  }
}

// POST /api/watchlist  body: { movieId }
export async function POST(req: NextRequest) {
  try {
    const userId = await getOrCreateUserId();
    const { movieId } = (await req.json()) as { movieId?: string };

    if (!movieId) {
      return fail("movieId is required", { status: 400, code: "VALIDATION_ERROR" });
    }

    const item = await prisma.watchlistItem.create({
      data: { movieId, userId },
    });

    return ok(item, { status: 201 });
  } catch (e) {
    if ((e as { code?: string }).code === "P2002") {
      return fail("Already in watchlist", { status: 409, code: "DUPLICATE" });
    }
    console.error(e);
    return fail("Failed to add to watchlist", { status: 500, code: "DB_ERROR" });
  }
}

// DELETE /api/watchlist?movieId=...
export async function DELETE(req: NextRequest) {
  try {
    const userId = await getOrCreateUserId();
    const movieId = new URL(req.url).searchParams.get("movieId");

    if (!movieId) {
      return fail("movieId query param is required", {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }

    const result = await prisma.watchlistItem.deleteMany({
      where: { movieId, userId },
    });

    return ok({ deleted: result.count });
  } catch (e) {
    console.error(e);
    return fail("Failed to remove from watchlist", { status: 500, code: "DB_ERROR" });
  }
}
