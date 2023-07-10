import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simple Auth",
  description: "A simple auth app built with Clerk and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gray-100 dark:bg-gray-800`}>
          <Toaster position="bottom-center" />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
