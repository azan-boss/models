import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const addTodo = mutation({
    handler: async (ctx, { title, isCompleted }: { title: string, isCompleted: boolean }) => {
        await ctx.db.insert("todo", { title, isCompleted })
    }
})

export const getTodos = query({
    handler: async (ctx) => {
        const q = ctx.db.query("todo");
        const result = await q
            .filter((q) => q.eq(q.field("isCompleted"), true))
            .order("desc")
            .collect();
            console.log(result);
            return result
            
    }
})

export const updateTodo = mutation({
    handler: async (ctx, { id, title, isCompleted }: { id: Id<"todo">, title: string, isCompleted: boolean }) => {
        await ctx.db.patch(id, { title, isCompleted });
    }
});

export const deleteTodo = mutation({
    handler: async (ctx, { id }: { id: Id<"todo"> }) => {
        await ctx.db.delete(id);
    }
});
