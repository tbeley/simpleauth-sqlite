import Link from "next/link";

export default async function Home() {
  return (
    <main className="w-100 text-center mt-8">
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        SIMPLEAUTH
      </h1>
      <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Template for Next.js with Tailwind CSS, TypeScript, Prisma and Clerk
      </p>
      <Link
        href="/todos"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900"
      >
        See the crud
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </main>
  );
}
