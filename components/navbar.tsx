"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Weather from "./Weather";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaGithub } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (href: string) => {
    if (href.startsWith("/#")) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled ? "px-4 py-2" : "px-0 py-0"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 ${
          hasScrolled
            ? "bg-slate-900/80 backdrop-blur-sm rounded-full shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="flex justify-between items-center h-16 px-6">
          <ul className="flex space-x-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavigation(href)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {label}
                </button>
              </li>
            ))}
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
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <FaGithub size={24} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Source code for my portfolio</p>
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
