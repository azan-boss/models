import { mutation,query } from "./_generated/server";

export const addTodo = mutation({
    handler: async (ctx,{title,isCompleted}:{title:string,isCompleted:boolean}) => {
        await ctx.db.insert("todo",{title,isCompleted})
    }
})

export const getTodos = query({
    handler: async (ctx) => {
        return await ctx.db.query("todo").collect()
    }
})