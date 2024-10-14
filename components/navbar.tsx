"use client";

import { usePathname, useRouter } from "next/navigation";

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
    <div className="m:mx-8 md:mx-16 lg:mx-32 mt-4 rounded-lg">
      <nav className="text-zinc-600 py-2 px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <ul className="inline-flex space-x-4">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavigation(href)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      isActive
                        ? " text-blue-600"
                        : "text-zinc-600 hover: hover:text-zinc-400"
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
    </div>
  );
};

export default Navbar;
