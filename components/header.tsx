"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { FaHandPaper } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col justify-center">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
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
          Product engineering apps that{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-cyan-400 font-semibold glow-cyan hover:cursor-help">
                  make a difference
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="max-w-xs">
                  make a difference (phrase): to have a significant effect or
                  influence on a person or situation
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>{" "}
          and{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-cyan-400 font-semibold glow-cyan hover:cursor-help">
                  look cool
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="max-w-xs">
                  look cool (phrase): to have an attractive or impressive
                  appearance; to be fashionable or appealing
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>{" "}
          at the same time.
        </p>
      </div>
    </div>
  );
};

export default Header;
