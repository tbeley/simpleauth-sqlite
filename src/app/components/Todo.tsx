"use client";

import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Todo({ todo }: { todo: Todo }) {
  const router = useRouter();
  const update = async () => {
    const response = await fetch(`/api/todo`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (response.status === 200) {
      toast.success(`Todo "${todo.title}" updated successfully!`);
      router.refresh();
    } else {
      toast.error(
        `Something went wrong while updating "${todo.title}"! Please try again later.`
      );
    }
  };

  const deleteTodo = async () => {
    const response = await fetch(`/api/todo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (response.status === 200) {
      toast.success(`Todo "${todo.title}" deleted successfully!`);
      router.refresh();
    } else {
      toast.error(
        `Something went wrong while deleting "${todo.title}"! Please try again later.`
      );
    }
  };

  const badge = () => {
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
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">{badge()}</td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {todo.title}
      </td>
      <td className="text-right pr-8">
        <button
          type="button"
          onClick={deleteTodo}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
