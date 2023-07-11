"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../Spinner";
import { toast } from "react-hot-toast";
import { ITodo } from "@/interfaces/ITodo";

interface IAddTodoProps {
  access: "public" | "private" | "registered";
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export default function AddTodo({ access, setTodos }: IAddTodoProps) {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    if (!isSignedIn && access !== "public") {
      toast.error(`Please sign in to add a todo!`);
      return;
    }
    if (newTodo.length <= 0) {
      toast.error(`Please enter a todo to add!`);
      return;
    }
    setLoading(true);
    const response = await fetch(`/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access,
        title: newTodo,
        userId: user ? user.id : null,
      }),
    });
    const { status, todo } = await response.json();
    if (status === 200) {
      toast.success(`Todo "${newTodo}" added successfully!`);
      setNewTodo("");
      setTodos((prev) => [...prev, todo]);
    } else {
      `Something went wrong while adding "${newTodo}"! Please try again later.`;
    }
    setLoading(false);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white"
        colSpan={3}
      >
        <label
          htmlFor="add-todo"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Add todo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </div>
          <input
            type="text"
            id="add-todo"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
            placeholder="Learn Next.js and Tailwind CSS..."
            required
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            onClick={addTodo}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Add todo"}
          </button>
        </div>
      </td>
    </tr>
  );
}
