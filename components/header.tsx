"use client";
import React from "react";
import { FaHandPaper } from "react-icons/fa";

const Header = () => {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-bold mb-2 flex items-center">
        Hi, I&apos;m Arek Halpern{" "}
        <FaHandPaper className="inline-block ml-2 animate-wave" />
      </h1>
      <p className="text-lg text-zinc-300 max-w-3xl">
        I love to build software with an emphasis on{" "}
        <br className="hidden sm:inline" />
        <span className="text-cyan-400">marketing strategy</span> and{" "}
        <span className="text-cyan-400">generative AI</span>.
      </p>
    </div>
  );
};

export default Header;
