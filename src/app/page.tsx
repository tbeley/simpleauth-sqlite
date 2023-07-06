import prisma from "@/lib/prisma";
import Todo from "./components/Todo";

export const revalidate = 0;

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return (
    <main>
      <h1 className="font-bold">Todos</h1>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo}></Todo>
        ))}
      </ul>
    </main>
  );
}
