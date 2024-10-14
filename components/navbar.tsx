"use client";

import { usePathname, useRouter } from "next/navigation";
import Weather from "./Weather";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaGithub } from "react-icons/fa"; // Import GitHub icon from react-icons

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          <ul className="flex space-x-4">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavigation(href)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive
                        ? "text-white bg-white/20"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center space-x-4">
            <Weather />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://github.com/ArekHalpern/my-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <FaGithub size={24} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Source code for this website</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
