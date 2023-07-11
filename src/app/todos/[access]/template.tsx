"use client";

import { notFound, usePathname } from "next/navigation";
import { ReactNode } from "react";

type IOptions = "public" | "private" | "registered";

const options: IOptions[] = ["public", "private", "registered"];

const Template = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname().split("/")[2] as IOptions;
  if (!options.includes(pathname)) {
    return notFound();
  }

  const title = `${pathname[0].toUpperCase() + pathname.slice(1)} todos`;
  let message;
  if (pathname === "public") {
    message = "Anyone can add, edit and delete todos.";
  } else if (pathname === "private") {
    message = "Only you can add, edit and delete todos.";
  } else if (pathname === "registered") {
    message = "Only registered users can add, edit and delete todos.";
  }

  return (
    <main className="container mx-auto px-4">
      <h1 className="my-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {title}
      </h1>
      <p className="mb-6 text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {message}
      </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-2 py-3">
                Done
              </th>
              <th scope="col" className="px-2 py-3">
                Task
              </th>
              <th scope="col" className="px-2 py-3 text-right pr-16">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </main>
  );
};

export default Template;
