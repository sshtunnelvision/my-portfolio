"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { FaHandPaper } from "react-icons/fa";

const Header = () => {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center z-0">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes className="absolute inset-0" />
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold mb-4"
          )}
        >
          Hi, I&apos;m Arek Halpern{" "}
          <FaHandPaper className="inline-block ml-2 animate-[wave_2s_ease-in-out_infinite]" />
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-300 max-w-3xl">
          Product Engineer building software with{" "}
          <span className="text-cyan-400 font-semibold">marketing intent</span>{" "}
          and <span className="text-cyan-400 font-semibold">design</span>.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-gray-900 to-black"></div>
    </div>
  );
};

export default Header;
