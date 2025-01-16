import React from "react";
import { FaEnvelope, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("w-full mt-auto py-6 px-4 relative z-20", className)}>
      <div className="max-w-4xl mx-auto flex justify-center">
        <div className="flex items-center space-x-4">
          <a
            href="mailto:arek.halpern@gmail.com"
            className="text-zinc-100 hover:text-cyan-400 transition-colors"
            aria-label="Email Arek Halpern"
          >
            <FaEnvelope size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/arekhalpern/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-100 hover:text-cyan-400 transition-colors"
            aria-label="Arek Halpern on LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          {/* <a
            href="https://twitter.com/arek10000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-100 hover:text-cyan-400 transition-colors"
            aria-label="Arek Halpern on Twitter"
          >
            <FaTwitter size={20} />
          </a> */}
          <a
            href="https://github.com/arekhalpern"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-100 hover:text-cyan-400 transition-colors"
            aria-label="Arek Halpern on GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://huggingface.co/Arek10000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-100 hover:text-cyan-400 transition-colors"
            aria-label="Arek Halpern on Hugging Face"
          >
            <SiHuggingface size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
