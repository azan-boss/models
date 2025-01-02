import { mutation,query } from "./_generated/server";

const addTodo=mutation({
    handler:async (ctx,{title,isCompleted}:{title:string,isCompleted:boolean}) => {
        await ctx.db.insert("todo",{title,isCompleted})
    }
})