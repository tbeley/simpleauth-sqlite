import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <ClerkLoaded>
            <Toaster position="bottom-center" />
            <Navbar />
            {children}
          </ClerkLoaded>
          <ClerkLoading>
            <div
              className={`${inter.className} bg-gray-800 flex w-full h-screen justify-center items-center`}
            >
              <Spinner width={16} height={16} />
            </div>
          </ClerkLoading>
        </body>
      </html>
    </ClerkProvider>
  );
}
