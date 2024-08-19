import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/ThemeProvider";

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
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider>
          <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200 min-h-screen">
            <Header />
            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
