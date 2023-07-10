"use client";

import AddTodo from "@/components/todos/AddTodo";
import { notFound, usePathname } from "next/navigation";
import { ReactNode } from "react";

type IOptions = "public" | "private" | "registered";

const options: IOptions[] = ["public", "private", "registered"];

const Template = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname().split("/")[2] as IOptions;
  if (!options.includes(pathname)) {
    return notFound();
  }

  return (
    <main className="w-100 container mx-auto">
      <h1 className="my-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {`${pathname[0].toUpperCase() + pathname.slice(1)} todos`}
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
          <tbody>{children}</tbody>
        </table>
      </div>
      <AddTodo access={pathname} />
    </main>
  );
};

export default Template;
