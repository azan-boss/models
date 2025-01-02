"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";  // Make sure this import is correct
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const addTodo = useMutation(api.todo.addTodo);  // Match with the schema and functions
  const todos = useQuery(api.todo.getTodos);
  console.log("updated", todos);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    await addTodo({ title, isCompleted: false });
    setTitle("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task"
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Todo
        </button>
      </form>
      {todos && todos.map((todo) => (
        <div key={todo._id}>
          <h2>{todo.title}</h2>
          <p>{todo.isCompleted ? "Completed" : "Incomplete"}</p>
        </div>
      ))}

      <div>ff</div>
    </main>
  );
}
