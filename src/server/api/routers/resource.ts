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
    reqs: z.string(),
    providedBenefit: z.string(),
    dueDate: z.string()
  })).mutation(async ({ ctx, input }) => {
    const checkIfExists = await ctx.db.resource.findFirst({
      where: {
        name: input.name
      }
    })

    if (checkIfExists) {
      const embedding = await getEmbedding(
        checkIfExists.name + "\n" + checkIfExists.description + "\n" + checkIfExists.reqs + "\n" + checkIfExists.providedBenefit
      );
      await resourcesIndex.upsert([
        {
          id: checkIfExists.id,
          values: embedding,
        }
      ])

      return checkIfExists
    }
    const newResource = await ctx.db.resource.create({
      data: {
        name: input.name,
        description: input.description,
        reqs: input.reqs,
        providedBenefit: input.providedBenefit,
        dueDate: input.dueDate,
        pinnedBy: "",
      }
    })

    const embedding = await getEmbedding(
      newResource.name + "\n" + newResource.description + "\n" + newResource.reqs + "\n" + newResource.providedBenefit
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
          { reqs: { contains: input } },
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
    let pin = false;

    if (curPinned?.indexOf(userId) === -1) {
      curPinned = curPinned + userId;
      pin = true;
    } else if (curPinned) {
      const ind = curPinned.indexOf(userId);
      curPinned = curPinned.substring(0, ind) + curPinned.substring(ind + userId.length);
    }

    await ctx.db.resource.update({
      where: { id: input },
      data: { pinnedBy: curPinned }
    })

    return pin;
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
  }),

  isPinned: privateProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const userId = ctx.userId;
    const result = await ctx.db.resource.findFirst({
      where: {
        AND: [
          { id: input },
          { pinnedBy: { contains: userId } }
        ]
      }
    })
    if (result) return true;
    return false;
  })
});
