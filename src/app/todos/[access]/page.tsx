"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { ITodo } from "@/interfaces/ITodo";
import TodoList from "@/components/todos/TodoList";
import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export const revalidate = 0;

export default function Page({
  params,
}: {
  params: { access: "public" | "private" | "registered" };
}) {
  const { access } = params;
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<ITodo[]>([]);

  if (!isSignedIn && access !== "public") {
    notFound();
  }

  const getTodos = useCallback(async () => {
    const response = await fetch(`/api/todo?access=${access}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { status, todos: to } = await response.json();
    if (status === 200) {
      toast.success(`Loading todos successfully!`);
      setTodos(to);
    } else {
      `Something went wrong while fetching todos"! Please try again later.`;
    }
    setLoading(false);
  }, [access]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  if (loading) {
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4 w-full text-center text-2xl" colSpan={3}>
          <Spinner size="md" />
        </td>
      </tr>
    );
  }

  return <TodoList todos={todos} setTodos={setTodos} />;
}
