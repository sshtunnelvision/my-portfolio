import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { Ubuntu_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Footer from "@/components/Footer";

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Arek Halpern's Portfolio",
  description: "Arek Halpern's Portfolio",
  verification: {
    google: "zZW3AYbMgAAzcSfTU-CZEBHorAoewlhVGwFEb9q_cdk",
  },
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

// Create an SVG noise pattern as a data URL
const noiseSvgUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ubuntuMono.variable} bg-neutral-900`}>
      <body
        className={cn(
          "antialiased text-amber-100 font-chivo min-h-screen relative"
        )}
      >
        {/* Background noise overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-30 z-0"
          style={{
            backgroundImage: noiseSvgUrl,
            backgroundRepeat: "repeat",
          }}
        />
        <GoogleAnalytics />
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow flex flex-col max-w-4xl mx-auto w-full px-3 sm:px-4 lg:px-6 pt-32">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
