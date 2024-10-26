"use client";
import React from "react";
import { FaHandPaper } from "react-icons/fa";

const Header = () => {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-bold mb-2">
        Hi, I&apos;m Arek Halpern{" "}
        <FaHandPaper className="inline-block ml-2 animate-[wave_2s_ease-in-out_infinite]" />
      </h1>
      <p className="text-lg text-zinc-300 max-w-3xl">
        Product manager, engineer and founder building software with an emphasis
        on <span className="text-cyan-400">marketing strategy</span> and{" "}
        <span className="text-cyan-400">user-centric design</span>.
      </p>
    </div>
  );
};

export default Header;
