"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner";

interface IAddTodoProps {
  access: "public" | "private" | "registered";
}

const AddTodo = ({ access }: IAddTodoProps) => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    if (!isSignedIn) {
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
        userId: user.id ?? null,
      }),
    });
    if (response.status === 200) {
      toast.success(`Todo "${newTodo}" added successfully!`);
      setNewTodo("");
      router.refresh();
    } else {
      `Something went wrong while adding "${newTodo}"! Please try again later.`;
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white my-12">
        Add todo
      </h2>
      <div className="relative z-0 w-full mb-6 group text-left">
        <input
          type="text"
          name="newTodo"
          id="newTodo"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          placeholder=""
          required
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <label
          htmlFor="newTodo"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter new todo
        </label>
        <button
          type="button"
          onClick={addTodo}
          disabled={loading}
          className="mt-6 text-white bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {loading ? <Spinner /> : "Add todo"}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;