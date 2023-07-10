import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import TodoEl from "@/components/todos/TodoEl";
import { notFound } from "next/navigation";
import { ITodo } from "@/interfaces/ITodo";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { access: "public" | "private" | "registered" };
}) {
  const { access } = params;
  let todos: ITodo[] = [];

  if (access === "public") {
    todos = await prisma.publicTodo.findMany({
      orderBy: {
        id: "asc",
      },
    });
  } else if (access === "private") {
    const { userId } = auth();
    if (!userId) return notFound();
    todos = await prisma.privateTodo.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: "asc",
      },
    });
  } else if (access === "registered") {
    todos = await prisma.registeredTodo.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  if (!todos.length)
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4 w-full text-center text-2xl" colSpan={3}>
          No todo found !
        </td>
      </tr>
    );

  todos = todos.map((todo) => ({ ...todo, access: access }));

  return todos.map((todo) => <TodoEl key={todo.id} todo={todo} />);
}
