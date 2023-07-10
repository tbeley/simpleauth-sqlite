"use client";

import { UserButton } from "@clerk/nextjs";
import { Collapse, CollapseInterface } from "flowbite";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DarkModeToggler from "./DarkModeToggler";

const activeLink =
  "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
const inactiveLink =
  "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

const Navbar = () => {
  const [target, setTarget] = useState<HTMLElement>();
  const [trigger, setTrigger] = useState<HTMLElement>();
  const [collapse, setCollapse] = useState<CollapseInterface>();
  const [active, setActive] = useState("/");
  const pathname = usePathname();

  useEffect(() => {
    setTarget(document.getElementById("navbar-default")!);
    setTrigger(document.getElementById("hamburger")!);
    setCollapse(new Collapse(target, trigger));
  }, [target, trigger]);

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <Image src="/todo.png" width={32} height={32} alt="Todo Logo" />
          <span className="self-center text-2xl ml-4 font-semibold whitespace-nowrap dark:text-white">
            Simple Auth
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          <div className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex mx-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
            <DarkModeToggler />
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={active === "/" ? activeLink : inactiveLink}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/todos/public"
                className={
                  active === "/todos/public" ? activeLink : inactiveLink
                }
                aria-current="page"
              >
                Public CRUD
              </Link>
            </li>
            <li>
              <Link
                href="/todos/registered"
                className={
                  active === "/todos/registered" ? activeLink : inactiveLink
                }
                aria-current="page"
              >
                Registered CRUD
              </Link>
            </li>
            <li>
              <Link
                href="/todos/private"
                className={
                  active === "/todos/private" ? activeLink : inactiveLink
                }
                aria-current="page"
              >
                Private CRUD
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
