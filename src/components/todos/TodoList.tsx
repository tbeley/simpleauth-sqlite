"use client";

import { ITodo } from "@/interfaces/ITodo";
import TodoEl from "./TodoEl";
import AddTodo from "./AddTodo";
import { usePathname } from "next/navigation";

type IOptions = "public" | "private" | "registered";
interface ITodoListProps {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList = ({ todos, setTodos }: ITodoListProps) => {
  const pathname = usePathname().split("/")[2] as IOptions;
  return (
    <>
      <AddTodo access={pathname} setTodos={setTodos} />
      {todos.length ? (
        todos.map((todo) => (
          <TodoEl
            key={todo.id}
            todo={todo}
            setTodos={setTodos}
            access={pathname}
          />
        ))
      ) : (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-6 py-4 w-full text-center text-2xl" colSpan={3}>
            No todo found !
          </td>
        </tr>
      )}
    </>
  );
};

export default TodoList;
