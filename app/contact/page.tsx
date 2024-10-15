import React from "react";
import { FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <p className="text-lg sm:text-xl text-center max-w-2xl mb-6">
        Thank you for your interest!
        <br />
        <br />
        If you would like to discuss any opportunities, or have any questions at
        all, please feel free to reach out.
      </p>
      <a
        href="mailto:arek.halpern@gmail.com"
        className="text-cyan-400 hover:text-cyan-300 transition-colors"
        aria-label="Email Arek Halpern"
      >
        <FaEnvelope size={36} className="sm:w-12 sm:h-12" />
      </a>
    </div>
  );
}
