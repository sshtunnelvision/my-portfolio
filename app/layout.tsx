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
          "min-h-screen antialiased bg-zinc-900 text-zinc-100 flex flex-col font-suse"
        )}
      >
        <Navbar />
        <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full px-3 sm:px-4 lg:px-6 pt-32">
          {children}
        </main>
      </body>
    </html>
  );
}
