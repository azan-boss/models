"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";  // Make sure this import is correct
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";  // Add this import

export default function Home() {
  const [title, setTitle] = useState("");
  const addTodo = useMutation(api.todo.addTodo);
  const updateTodo = useMutation(api.todo.updateTodo);
  const todos = useQuery(api.todo.getTodos);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;
    await addTodo({ title, isCompleted: false });
    setTitle("");
  };


  const toggleCompletion = async (id: Id<"todo">, isCompleted: boolean, title: string) => {
    await updateTodo({ id, isCompleted: !isCompleted, title });
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
      <div className="w-full max-w-md">
        {todos && todos.map((todo) => (
          <div key={todo._id} className="flex justify-between items-center p-2 border-b">
            <div>
              <h2 className={`text-lg ${todo.isCompleted ? "line-through" : ""}`}>{todo.title}</h2>
              <p className="text-sm text-gray-500">{todo.isCompleted ? "Completed" : "Incomplete"}</p>
            </div>
            <button
              onClick={() => toggleCompletion(todo._id, todo.isCompleted, todo.title)}
              className={`p-2 rounded ${todo.isCompleted ? "bg-green-500" : "bg-red-500"} text-white`}
            >
              {todo.isCompleted ? "Undo" : "Complete"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
