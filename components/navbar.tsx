"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  // Add more links here
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="py-4 px-6">
      <div className="flex justify-center">
        <ul className="inline-flex justify-center space-x-1 rounded-lg  p-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <button
                  onClick={() => handleNavigation(href)}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    isActive ? "bg-gray-600 shadow-sm" : "hover:bg-gray-600"
                  }`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
