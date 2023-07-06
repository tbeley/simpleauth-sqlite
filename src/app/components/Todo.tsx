"use client";

import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Todo({ todo }: { todo: Todo }) {
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const router = useRouter();
  const update = async (todo: Todo) => {
    const response = await fetch(`/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const json = await response.json();
    setUpdatedTodo(json.todo);
  };

  return (
    <li key={updatedTodo.id} className="space-x-4">
      <input
        onChange={() => update(updatedTodo)}
        type="checkbox"
        checked={updatedTodo.completed}
      />
      {updatedTodo.title}
    </li>
  );
}
