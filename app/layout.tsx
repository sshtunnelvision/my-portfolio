import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import Header from "@/components/header";

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
          "min-h-screen bg-gray-950 text-gray-200 font-sans antialiased",
          fontSans.variable
        )}
      >
        <Header />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
