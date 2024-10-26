"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { WobbleCard } from "@/components/ui/wobble-card";
import { SquareArrowOutUpRight } from "lucide-react";

const projects = [
  {
    title: "Smrtfeed Text Editor",
    image: "/smrtfeed-editor2.png",
    description:
      "The Smrtfeed editor seamlessly integrates an LLM into your writing process, offering real-time suggestions and improvements as you type, while still giving you full control over your document down to each character. It enhances productivity and writing quality by providing context-aware assistance directly within your document.",
    videoUrl: "https://www.youtube.com/embed/5XyEKVpZjLo?si=NLJALZ90Rq1oYdlZ",
    techStack: ["NextJS", "React", "TipTap", "OpenAI API"],
    imagePosition: "center",
  },
  {
    title: "Copy Table With LLM",
    image: "/copy-table.png",
    description:
      "An AI-powered copy table for ideating content ideas at lightning speed. This tool speeds up copywriting brainstorming processes, allowing you to generate and organize creative content concepts efficiently.",
    videoUrl: "https://www.youtube.com/embed/vJ9nfZpi-Fs?si=_GQOEAIenOUKwVRS",
    techStack: ["NextJS", "React", "Flask", "Prisma", "Supabase"],
    imagePosition: "center",
  },
  {
    title: "Diffusion w/ LoRA",
    image: "/kunochi-hero.jpg",
    description:
      "A custom image generation tool with my custom LoRAs (Low-Rank Adaptation) integrated. This project demonstrates the power of AI in creating unique, high-quality images tailored to specific themes or styles.",
    videoUrl: "https://www.youtube.com/embed/EKldEk2WJ7I?si=SVSyjxrT23CyC-rf",
    techStack: ["NextJS", "React", "Flux", "Python"],
    imagePosition: "center",
  },
];

const WorkProduct = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="flex-grow flex flex-col items-start justify-center w-full pt-4">
      <h1 className="text-lg mb-2">Projects</h1>
      <div className="w-full h-px bg-zinc-700 mb-4"></div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Dialog
            key={index}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <DialogTrigger asChild>
              <div
                className="cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <WobbleCard
                  containerClassName="border-2 border-white overflow-hidden transition-colors duration-300 hover:border-cyan-400"
                  className="p-0 relative aspect-square"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition={project.imagePosition || "center"}
                    className="z-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/70 to-zinc-800/70 backdrop-blur-[2px] flex flex-col justify-between text-white z-10">
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                      <h2 className="text-lg font-bold text-center leading-tight">
                        {project.title}
                      </h2>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 z-20">
                    <SquareArrowOutUpRight className="w-4 h-4 text-cyan-400" />
                  </div>
                </WobbleCard>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] bg-zinc-900 border-2 border-white">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={selectedProject.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-4 text-sm text-zinc-300">
                {selectedProject.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-cyan-500/20 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default WorkProduct;
