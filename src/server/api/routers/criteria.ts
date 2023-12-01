import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const criteriaRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.criteria.findMany();
  }),

  findResources: publicProcedure.input(z.object({ requirements: z.array( z.string() ) })).query(({ctx, input}) => {
    return ctx.db.criteria.findMany({
      where: {
        requirement: {
          in: input.requirements,
        },
      },
      select: {
        resources: true,
      },
    })
  }),
});
