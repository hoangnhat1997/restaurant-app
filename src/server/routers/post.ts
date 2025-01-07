/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from "../trpc";
import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultRestaurantSelect = {
  id: true,
  name: true,
  desc: true,
  images: true,
  rating: true,
  rating_count: true,
  category: true,
  city: true,
  price_range: true,
  featured: true,
  isFavorite: true,
} satisfies Prisma.RestaurantSelect;

export const postRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/v11/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.restaurant.findMany({
        select: defaultRestaurantSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const post = await prisma.restaurant.findUnique({
        where: { id },
        select: defaultRestaurantSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }
      return post;
    }),
  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        isFavorite: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const isFavorite = await prisma.restaurant.update({
        where: { id: input.id },
        data: {
          isFavorite: input.isFavorite,
        },
      });
      return isFavorite;
    }),
});
