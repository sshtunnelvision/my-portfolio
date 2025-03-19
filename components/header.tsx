"use client";
import React from "react";
import { FaHandPaper } from "react-icons/fa";
import PixelTrail from "@/components/PixelTrail";

const Header = () => {
  return (
    <div className="mb-8 relative">
      <h1 className="text-xl font-bold mb-2 flex items-center opacity-0 animate-fade-in-up [animation-delay:200ms] mix-blend-difference">
        Hi, I&apos;m Arek{" "}
        <FaHandPaper className="inline-block ml-2 animate-wave" />
      </h1>
      <p className="text-lg max-w-3xl opacity-0 animate-fade-in-up [animation-delay:400ms] mix-blend-difference">
        I love to build software with an emphasis on{" "}
        <br className="hidden sm:inline" />
        <span className="text-cyan-400">marketing strategy</span> and{" "}
        <span className="text-cyan-400">generative AI</span>.
      </p>
      <div className="absolute inset-0">
        <PixelTrail
          pixelSize={10}
          delay={100}
          fadeDuration={400}
          pixelClassName="bg-orange-300"
        />
      </div>
    </div>
  );
};

export default Header;
