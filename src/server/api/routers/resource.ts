import { z } from "zod";
import { getEmbedding } from "~/lib/openai";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { resourcesIndex } from "~/server/pinecone";

export const resourceRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.resource.findMany();
  }),

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
        pinnedBy: "",
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
  }),

  pin: privateProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const userId = ctx.userId;
    const cur = await ctx.db.resource.findFirstOrThrow({
      where: {id: input},
    });

    let curPinned = cur.pinnedBy;

    if (curPinned?.indexOf(userId) === -1) {
      curPinned = curPinned + userId;
    } else if (curPinned) {
      const ind = curPinned.indexOf(userId);
      curPinned = curPinned.substring(0, ind) + curPinned.substring(ind + userId.length);
    }

    await ctx.db.resource.update({
      where: { id: input },
      data: { pinnedBy: curPinned }
    })

    const temp = await ctx.db.resource.findFirst({
      where: { id: input }
    })
    console.log(temp)
  }),

  findPinned: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    return await ctx.db.resource.findMany({
      where: {
        pinnedBy: {
          contains: userId
        }
      },
    })
  })
});
