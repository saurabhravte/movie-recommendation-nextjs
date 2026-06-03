"use server";

import { prisma } from "@/lib/prisma";
import { getOrCreateUserId } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function addToWatchlist(movieId: string) {
  const userId = await getOrCreateUserId();

  try {
    await prisma.watchlistItem.create({
      data: { movieId, userId },
    });
  } catch (e) {
    // Already in watchlist — ignore the unique constraint violation
    if ((e as { code?: string }).code !== "P2002") throw e;
  }

  revalidatePath("/watchlist");
  return { ok: true };
}

export async function removeFromWatchlist(movieId: string) {
  const userId = await getOrCreateUserId();

  await prisma.watchlistItem.deleteMany({
    where: { movieId, userId },
  });

  revalidatePath("/watchlist");
  return { ok: true };
}

export async function isInWatchlist(movieId: string): Promise<boolean> {
  const userId = await getOrCreateUserId();
  const item = await prisma.watchlistItem.findUnique({
    where: { movieId_userId: { movieId, userId } },
  });
  return !!item;
}
