import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const t = initTRPC.create();

export const appRouter = t.router({
  getRestaurants: t.procedure.query(async () => {
    return await prisma.restaurant.findMany();
  }),
  addFavorite: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.restaurant.update({
        where: { id: input.id },
        data: { isFavorite: true },
      });
    }),
});

export type AppRouter = typeof appRouter;
