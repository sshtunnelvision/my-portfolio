import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Ubuntu_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Arek Halpern's Portfolio",
  description: "Arek Halpern's Portfolio",
  icons: {
    icon: [
      {
        url: "/ah-logo-2.png",
        sizes: "32x32",
      },
      {
        url: "/ah-logo-2.png",
        sizes: "48x48",
      },
      {
        url: "/ah-logo-2.png",
        sizes: "96x96",
      },
    ],
    apple: {
      url: "/ah-logo-2.png",
      sizes: "180x180",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntuMono.variable} bg-zinc-900`}>
      <body
        className={cn(
          "min-h-screen antialiased text-zinc-100 flex flex-col font-chivo",
          "bg-[url('/bg-gradient.png')] bg-cover bg-fixed bg-no-repeat w-screen",
          "before:content-[''] before:fixed before:inset-0 before:bg-zinc-900/60"
        )}
      >
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full px-3 sm:px-4 lg:px-6 pt-32 relative">
          {children}
        </main>
      </body>
    </html>
  );
}
