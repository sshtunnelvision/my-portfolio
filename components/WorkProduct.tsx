"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const projects = [
  {
    title: "Smrtfeed In-line Text Editor",
    image: "/smrtfeed-editor2.png",
    description:
      "This AI In-line Text Editor seamlessly integrates artificial intelligence into your writing process, offering real-time suggestions and improvements as you type. It enhances productivity and writing quality by providing context-aware assistance directly within your document.",
    videoUrl: "https://www.youtube.com/embed/5XyEKVpZjLo?si=NLJALZ90Rq1oYdlZ",
  },
  {
    title: "Kunochi Copy Table",
    image: "/copy-table.png",
    description:
      "An AI-powered copy table for ideating content ideas at lightning speed. This tool revolutionizes the brainstorming process, allowing you to generate and organize creative content concepts efficiently.",
    videoUrl: "https://www.youtube.com/embed/vJ9nfZpi-Fs?si=_GQOEAIenOUKwVRS",
  },
  {
    title: "Kunochi Image Generator With Custom LoRa",
    image: "/kunochi-hero.jpg",
    description:
      "A custom image generation tool using LoRa (Low-Rank Adaptation) technology. This project demonstrates the power of AI in creating unique, high-quality images tailored to specific themes or styles.",
    videoUrl: "https://www.youtube.com/embed/EKldEk2WJ7I?si=SVSyjxrT23CyC-rf",
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
                className="w-full cursor-pointer transition-all duration-300 hover:shadow-lg border border-cyan-400/20 overflow-hidden group"
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
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                    <h2 className="text-xl font-bold text-center mb-1">
                      {project.title}
                    </h2>
                    <p className="text-sm font-semibold">View Demo</p>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px] bg-zinc-900 border-zinc-800">
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
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default WorkProduct;
