import { PrismaClient } from "@prisma/client";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { z } from "zod";
import openai, { getEmbedding } from "~/lib/openai";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { resourcesIndex } from "~/server/pinecone";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "1 m"),
    analytics: true,
  });

export const openaiRouter = createTRPCRouter({
  chatCompletion: privateProcedure.input(
    z.object({
        prompt: z.string(),
    })
  ).mutation(async ({ctx, input: { prompt } }) => {
    const userId = ctx.userId;

    const { success } = await ratelimit.limit(userId);
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

    if (prompt == "") throw new TRPCError({ code: "BAD_REQUEST" });

    const embedding = await getEmbedding(prompt);
    const vectorQueryResponse = await resourcesIndex.query({
        vector: embedding,
        topK: 6
    });

    const relevantIds = vectorQueryResponse.matches.map((match) => match.id);
    const relevantResources = await getResourcesByIds(relevantIds, ctx.db);

    console.log(relevantResources)

    const systemMessage: ChatCompletionMessageParam = {
        role: "system",
        content: "You are an assistant that finds resources for disabilities. " + 
            "You answer user's questions only based off the provided resources. " + 
            "The provided resources are: " + 
            relevantResources?.map((resource) => `Name: ${resource.name}\nDescription: ${resource.description}\nRequirements: ${resource.reqs}\nBenefit: ${resource.providedBenefit}`).join("\n\n")
    }

    const response  = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [systemMessage, {role: "user", content: prompt}]
    })

    return {response, relevantResources};
  }),
});

const getResourcesByIds = async (resourceIds: string[], prisma: PrismaClient) => {
    return prisma.resource.findMany({
        where: {
            id: {
                in: resourceIds,
            }
        }
    })
}