import React from "react";
import { FaEnvelope, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiHuggingface } from "react-icons/si";

export default function ContactPage() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-2">Contact</h1>
        <p className="text-lg text-zinc-300 max-w-3xl">
          Thank you for your interest! If you would like to discuss any
          opportunities, or have any questions at all, please feel free to reach
          out.
        </p>
      </div>
      <div className="flex space-x-4">
        <a
          href="mailto:arek.halpern@gmail.com"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Email Arek Halpern"
        >
          <FaEnvelope size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/arekhalpern/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Arek Halpern on LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://twitter.com/arek10000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Arek Halpern on Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://github.com/arekhalpern"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Arek Halpern on GitHub"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://huggingface.co/Arek10000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 transition-colors"
          aria-label="Arek Halpern on Hugging Face"
        >
          <SiHuggingface size={24} />
        </a>
      </div>
    </div>
  );
}
