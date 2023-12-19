import { z } from "zod";
import { getEmbedding } from "~/lib/openai";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { resourcesIndex } from "~/server/pinecone";

export const resourceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.resource.findMany();
  }),

  // filter: publicProcedure.input(z.array(z.string())).query(async ({ ctx, input }) => {
  //   const result = await ctx.db.resource.findMany({
  //     where: {
  //       description: {contains: "brain"}
  //     },
  //   })
  //   console.log("HERE ", result);
  //   return result;
  // }),

  addResource: publicProcedure.input(z.object({
    name: z.string(), 
    description: z.string(), 
    providedBenefit: z.string() 
  })).mutation(async ({ ctx, input }) => {
    const newResource = await ctx.db.resource.create({
      data: {
        name: input.name,
        description: input.description,
        providedBenefit: input.providedBenefit,

        // organizationId: "clpemeppo0000rg2v03lp9ocu"
      }
    })

    const embedding = await getEmbedding(
      newResource.name + "\n" + newResource.description + "\n" + newResource.providedBenefit
    );

    await resourcesIndex.upsert([
      {
        id: newResource.id,
        values: embedding,
      }
    ])

    return newResource;
  }),

  keywordSearch: privateProcedure.input(z.string()).query(({ctx, input}) => {
    return ctx.db.resource.findMany({
      where: {
        OR: [
          { name: { contains: input } },
          { description: { contains: input }, },
          { providedBenefit: { contains: input } },
        ]
      },
    })
  })
});
