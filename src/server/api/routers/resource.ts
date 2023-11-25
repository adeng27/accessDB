import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const resourceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.resource.findMany();
  }),

  filter: publicProcedure.input(z.object({ name: z.string() })).query(({ ctx, input }) => {
    return ctx.db.resource.findMany({
      where: {
        name: input.name,
      },
    })
  }),
});
