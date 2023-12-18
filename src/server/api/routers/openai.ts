import { PrismaClient } from "@prisma/client";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { z } from "zod";
import openai, { getEmbedding } from "~/lib/openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { resourcesIndex } from "~/server/pinecone";

export const openaiRouter = createTRPCRouter({
  chatCompletion: publicProcedure.input(
    z.object({
        prompt: z.string(),
    })
  ).mutation(async ({ctx, input: { prompt } }) => {
    console.log(prompt);

    const embedding = await getEmbedding(prompt);
    const vectorQueryResponse = await resourcesIndex.query({
        vector: embedding,
        topK: 4
    });

    const relevantIds = vectorQueryResponse.matches.map((match) => match.id);
    const relevantResources = await getResourcesByIds(relevantIds, ctx.db);

    const systemMessage: ChatCompletionMessageParam = {
        role: "system",
        content: "You are an assistant that finds resources for disabilities. " + 
            "You answer user's questions based off relevant resources. " + 
            "The relevant resources are: " + 
            relevantResources?.map((resource) => `Name: ${resource.name}\nDescription: ${resource.description}\nBenefit: ${resource.providedBenefit}`).join("\n\n")
    }

    const response  = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [systemMessage, {role: "user", content: prompt}]
    })

    return response;
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