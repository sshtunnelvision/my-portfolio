"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Weather from "./Weather";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollTop = window.pageYOffset;
      const opacity = Math.min(scrollTop / 100, 0.7);

      // Always show navbar at top of page
      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-8 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
        <div
          className={`relative rounded-xl my-2 transition-all duration-300 ${
            scrollOpacity > 0 ? "backdrop-blur-md" : ""
          }`}
        >
          <div
            className="absolute inset-0 bg-zinc-900/50 rounded-xl pointer-events-none"
            style={{ opacity: scrollOpacity }}
          ></div>
          <div
            className="absolute inset-0 border border-zinc-400/20 rounded-xl pointer-events-none"
            style={{ opacity: scrollOpacity }}
          ></div>
          <nav className="relative flex justify-between items-center h-14">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-zinc-300 hover:text-white px-4 sm:hidden focus:outline-none focus:ring-0"
              >
                {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
              <ul
                className={`hidden sm:flex transition-all duration-300 ${
                  scrollOpacity > 0 ? "ml-0" : "-ml-4"
                }`}
              >
                {navLinks.map(({ href, label }, index) => (
                  <li key={href}>
                    <button
                      onClick={() => handleNavigation(href)}
                      className={`px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-0 ${
                        index === 0 ? "rounded-l-xl" : ""
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`flex items-center transition-all duration-300 ${
                scrollOpacity > 0 ? "pr-4" : "pr-0"
              }`}
            >
              <div className="relative flex items-center">
                <Weather />
              </div>
            </div>
          </nav>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden bg-zinc-900/80 backdrop-blur-md">
          <ul className="py-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <button
                  onClick={() => handleNavigation(href)}
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors duration-200 focus:outline-none focus:ring-0"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
