import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const resourceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.resource.findMany();
  }),

  filter: publicProcedure.input(z.array(z.string())).query(({ ctx, input }) => {
    return ctx.db.resource.findMany({
      where: {
        name: {
          in: input,
        },
      },
    })
  }),

  
  // addResource: publicProcedure.input(z.object({
  //     name: z.string(), 
  //     description: z.string(), 
  //     providedBenefit: z.string() 
  //   })).mutation(async ({ ctx, input }) => {
  //     const newResource = await ctx.db.resource.create({
  //       data: {
  //         name: input.name,
  //         description: input.description,
  //         providedBenefit: input.providedBenefit,

  //         organizationId: "clpemeppo0000rg2v03lp9ocu"
  //       }
  //     })
  //     return newResource;
  // }),
});
