"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner";
import { ITodo } from "@/interfaces/ITodo";

interface ITodoElProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  access: "public" | "private" | "registered";
}

export default function TodoEl({ todo, setTodos, access }: ITodoElProps) {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const update = async () => {
    const response = await fetch(`/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        access,
      }),
    });
    const { status } = await response.json();
    if (status === 200) {
      toast.success(`Todo "${todo.title}" updated successfully!`);
      setTodos((prev) => {
        const index = prev.findIndex((t) => t.id === todo.id);
        prev[index].completed = !prev[index].completed;
        return [...prev];
      });
    } else {
      toast.error(
        `Something went wrong while updating "${todo.title}"! Please try again later.`
      );
    }
  };

  const deleteTodo = async () => {
    setLoadingDelete(true);
    const response = await fetch(`/api/todo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        access,
      }),
    });
    const { status } = await response.json();
    if (status === 200) {
      toast.success(`Todo "${todo.title}" deleted successfully!`);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } else {
      toast.error(
        `Something went wrong while deleting "${todo.title}"! Please try again later.`
      );
    }
    setLoadingDelete(false);
  };

  const Badge = () => {
    if (todo.completed)
      return (
        <span
          className="flex w-3 h-3 bg-green-500 rounded-full cursor-pointer"
          onClick={update}
        ></span>
      );

    return (
      <span
        className="flex w-3 h-3 bg-red-500 rounded-full cursor-pointer"
        onClick={update}
      ></span>
    );
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">
        <Badge />
      </td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white"
      >
        {todo.title}
      </td>
      <td className="text-right pr-8">
        <button
          type="button"
          onClick={deleteTodo}
          className={` text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2`}
          disabled={loadingDelete}
        >
          {loadingDelete ? <Spinner /> : "Delete"}
        </button>
      </td>
    </tr>
  );
}
