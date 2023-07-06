import prisma from "@/lib/prisma";
import Todo from "../components/Todo";
import AddTodo from "../components/AddTodo";
import Link from "next/link";

export const revalidate = 0;

export default async function Todos() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="w-100 mt-8">
      <div className="flex justify-center items-center mb-8">
        <Link href={"/"}>
          <button
            type="button"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm pl-2 pr-3 py-2.5 mr-4 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            <svg
              className="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 8 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
              />
            </svg>
          </button>
        </Link>
        <h1 className=" text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          TODOS CRUD
        </h1>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Done
              </th>
              <th scope="col" className="px-6 py-3">
                Task
              </th>
              <th scope="col" className="px-6 py-3 text-right pr-16">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      </div>
      <AddTodo />
    </main>
  );
}
