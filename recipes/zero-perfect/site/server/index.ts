import { boolean, capsule, endpoint, mutation, query, string, table, text } from "@spacefast/zero/server";

import { cleanTodoText } from "../shared/todo";

export default capsule({
  name: "Zero Perfect",
  schema: {
    todos: table({
      text: string(),
      done: boolean().default(false),
      ownerId: string(),
    }).index("by_owner", ["ownerId"]),
  },
  queries: {
    todos: query(async (ctx) =>
      ctx.db.todos
        .withIndex("by_owner", (range) => range.eq("ownerId", ctx.auth.userId))
        .order("desc")
        .collect()
    ),
  },
  mutations: {
    addTodo: mutation(async (ctx, text: string) => {
      const cleanText = cleanTodoText(text);
      if (!cleanText) return;
      await ctx.db.todos.insert({ text: cleanText, done: false, ownerId: ctx.auth.userId });
    }),
  },
  endpoints: {
    status: endpoint({ mode: "read", method: "GET", path: "/api/status" }, () => text("ok")),
  },
});
