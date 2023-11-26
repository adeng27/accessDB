import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const criteriaRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.criteria.findMany();
  }),

  filterResources: publicProcedure.input(z.object({ requirement: z.string() })).query(({ctx, input}) => {
    return ctx.db.criteria.findFirstOrThrow({
        where: {
          requirement: input.requirement,
        },
        // select: {
        //   resources: {
        //     select: {
        //       name: true,
        //     }
        //   }
        // },
        select: {
          resources: true,
        }
    })
  })
});
