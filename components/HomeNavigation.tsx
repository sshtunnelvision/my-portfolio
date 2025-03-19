"use client";

import React from "react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  id: string;
};

const navItems: NavItem[] = [
  { name: "Projects", id: "projects" },
  { name: "Demos", id: "demos" },
];

interface HomeNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const HomeNavigation = ({ activeTab, setActiveTab }: HomeNavigationProps) => {
  return (
    <div className="w-full mb-8 opacity-0 animate-fade-in-up [animation-delay:400ms]">
      <nav className="flex space-x-4 justify-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              activeTab === item.id
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-amber-100 hover:bg-cyan-500/10 hover:text-cyan-300"
            )}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default HomeNavigation;
