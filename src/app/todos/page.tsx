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
    <main className="w-100 container mx-auto">
        <h1 className="my-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          TODOS CRUD
        </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
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
