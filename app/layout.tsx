import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Ubuntu_Mono } from "next/font/google";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  display: "swap",
  weight: ["400", "700"],
});

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
    <html lang="en" className={`bg-zinc-900 ${ubuntuMono.variable}`}>
      <body
        className={cn(
          "min-h-screen antialiased bg-zinc-900 text-zinc-100 flex flex-col font-chivo"
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
