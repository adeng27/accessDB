import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    pin: privateProcedure.input(z.string()).mutation(async ({ctx, input}) => {
        const userId = ctx.userId;
        if (typeof userId === "undefined") return;
        const result = await ctx.db.user.findFirst({
            where: {id: userId}
        })
        
        if (result) {
            await ctx.db.user.update({
                where: { id: input },
                data: { resources: { connect: [{ id: input }] } }
            })
        } else {
            await ctx.db.user.create({
                data: {
                    id: userId,
                    resources: { connect: [{id: input}]}
                }
            })
        }
    })
});