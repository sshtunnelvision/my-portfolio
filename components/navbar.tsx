"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react"; // Make sure to install lucide-react

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  // Add more links here
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="py-4 px-6">
      <div className="flex justify-between items-center">
        <ul className="inline-flex justify-center space-x-1 rounded-lg p-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <button
                  onClick={() => handleNavigation(href)}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    isActive
                      ? "bg-gray-200 dark:bg-gray-700 shadow-sm"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
