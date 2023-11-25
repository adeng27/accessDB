import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const criteriaRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.criteria.findMany();
  }),

//   filter: publicProcedure.input(z.object({ name: z.string() })).query(({ ctx, input }) => {
//     return ctx.db.criteria.findMany({
//       where: {
//         name: input.name,
//       },
//     })
//   }),
});
