"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import { Calendar, MapPin, Building } from "lucide-react";

const experiences = [
  {
    title: "",
    company: "",
    location: "",
    period: "",
    description: [""],
    skills: [""],
  },
];

const Experience = () => {
  return (
    <div className="flex-grow flex flex-col items-start justify-center w-full pt-4 opacity-0 animate-fade-in-up [animation-delay:600ms]">
      <h1 className="text-lg mb-4">Projects</h1>

      <div className="w-full flex flex-col gap-8 px-2 sm:px-0">
        {experiences.map((job, index) => (
          <WobbleCard
            key={index}
            containerClassName="border-2 border-white transition-colors duration-300 hover:border-cyan-400 w-full"
            className="p-6 bg-zinc-900"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
              <h2 className="text-xl font-bold text-cyan-400">{job.title}</h2>
              <span className="flex items-center gap-1 text-amber-200 text-sm">
                <Calendar className="w-4 h-4" />
                {job.period}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="flex items-center gap-1 text-zinc-300">
                <Building className="w-4 h-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-300">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
            </div>

            <ul className="list-disc pl-5 mb-4 space-y-2">
              {job.description.map((bullet, i) => (
                <li key={i} className="text-sm text-zinc-300">
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-cyan-500/20 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </WobbleCard>
        ))}
      </div>
    </div>
  );
};

export default Experience;
