"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Smrtfeed In-line Text Editor",
    image: "/smrtfeed-editor2.png",
    description:
      "This AI In-line Text Editor seamlessly integrates an LLM into your writing process, offering real-time suggestions and improvements as you type, while still giving you full control over your document down to each character. It enhances productivity and writing quality by providing context-aware assistance directly within your document.",
    videoUrl: "https://www.youtube.com/embed/5XyEKVpZjLo?si=NLJALZ90Rq1oYdlZ",
    techStack: ["NextJS", "React", "TipTap", "OpenAI API"],
  },
  {
    title: "Kunochi Copy Table",
    image: "/copy-table.png",
    description:
      "An AI-powered copy table for ideating content ideas at lightning speed. This tool speeds up copywriting brainstorming processes, allowing you to generate and organize creative content concepts efficiently.",
    videoUrl: "https://www.youtube.com/embed/vJ9nfZpi-Fs?si=_GQOEAIenOUKwVRS",
    techStack: ["NextJS", "React", "Flask", "Prisma", "Supabase"],
  },
  {
    title: "Kunochi Image Generator With Custom LoRa",
    image: "/kunochi-hero.jpg",
    description:
      "A custom image generation tool with my custom LoRAs (Low-Rank Adaptation) integrated. This project demonstrates the power of AI in creating unique, high-quality images tailored to specific themes or styles.",
    videoUrl: "https://www.youtube.com/embed/EKldEk2WJ7I?si=SVSyjxrT23CyC-rf",
    techStack: ["NextJS", "React", "Flux", "Python"],
  },
];

const WorkProduct = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="flex-grow flex flex-col items-start justify-center w-full pt-4">
      <h1 className="text-lg mb-2">Projects</h1>
      <div className="w-full h-px bg-zinc-700 mb-4"></div>
      <div className="w-full space-y-8">
        {projects.map((project, index) => (
          <Dialog
            key={index}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <DialogTrigger asChild>
              <Card
                className="w-full cursor-pointer border-2 border-white overflow-hidden transition-colors duration-300 hover:border-cyan-400"
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-0 relative">
                  <div className="relative w-full aspect-[21/9] bg-black">
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/70 to-zinc-800/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-6">
                      <h2 className="text-xl font-bold mb-2 text-center">
                        {project.title}
                      </h2>
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {project.techStack.map((tech, i) => (
                          <Badge key={i} variant="default">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-cyan-400">
                        View Demo
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
