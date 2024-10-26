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
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-6 ${
        hasScrolled ? "py-2" : "py-1"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-300 ${
            hasScrolled
              ? "bg-zinc-900/80 backdrop-blur-sm rounded-full shadow-lg"
              : "bg-transparent"
          }`}
        >
          <nav className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-zinc-300 hover:text-white mr-4 sm:hidden"
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
              <ul className="hidden sm:flex space-x-6">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <button
                      onClick={() => handleNavigation(href)}
                      className="px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center space-x-4">
              <Weather />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://github.com/ArekHalpern/my-portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-zinc-300 hover:text-white transition-colors duration-200"
                    >
                      <FaGithub size={20} />
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
      {isMenuOpen && (
        <div className="sm:hidden bg-zinc-900/95 backdrop-blur-sm">
          <ul className="py-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavigation(href)}
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
