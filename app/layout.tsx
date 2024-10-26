import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Arek Halpern's Portfolio",
  description: "Arek Halpern's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-zinc-900">
      <body
        className={cn(
          "h-screen antialiased bg-zinc-900 text-zinc-100 overflow-hidden flex flex-col font-suse"
        )}
      >
        <Navbar />
        <div className="flex-grow flex flex-col w-full pt-20">
          <main className="flex-grow flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
