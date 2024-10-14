import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
    <html lang="en">
      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white",
          fontSans.variable
        )}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
