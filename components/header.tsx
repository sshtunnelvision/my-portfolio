"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { FaHandPaper } from "react-icons/fa";

const Header = () => {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center z-0">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Hide Boxes on mobile, show on larger screens */}
      <div className="hidden sm:block">
        <Boxes className="absolute inset-0" />
      </div>

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold mb-4"
          )}
        >
          Hi, I&apos;m Arek Halpern{" "}
          <FaHandPaper className="inline-block ml-2 animate-[wave_2s_ease-in-out_infinite]" />
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto">
          Product manager, engineer and founder building software with an
          emphasis on{" "}
          <span className="text-cyan-400 font-semibold">
            marketing strategy
          </span>{" "}
          and{" "}
          <span className="text-cyan-400 font-semibold">
            user-centric design
          </span>
          .
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-gray-900 to-black"></div>
    </div>
  );
};

export default Header;
