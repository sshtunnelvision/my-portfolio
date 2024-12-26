"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { WobbleCard } from "@/components/ui/wobble-card";
import { SquareArrowOutUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI Email",
    image: "/lea-preview.png",
    description:
      "An intelligent email assistant that integrates with Gmail to enhance email composition and management. The application provides smart suggestions while composing emails, automatically summarizes email threads, and can generate contextually appropriate replies based on conversation history. This streamlines email communication by combining the power of large language models with Gmail's functionality.",
    videoUrl: "https://www.youtube.com/embed/-e3w6OnumNY",
    techStack: [
      "NextJS",
      "TypeScript",
      "Gmail API",
      "Anthropic API",
      "OpenAI API",
    ],
    imagePosition: "center",
  },
  {
    title: "AI Cover Letters",
    image: "/smrtfeed1.png",
    description: `Empowering job seekers with AI-powered document drafting. Smrtfeed combines advanced AI with intuitive document editing to streamline the job application process. The platform automatically generates tailored cover letters and optimizes resumes based on job descriptions, while providing a powerful in-line text editor for fine-tuning. Built with modern web technologies and featuring custom web scraping capabilities, Smrtfeed aims to create the most efficient document drafting experience available.`,
    videoUrl: "https://www.youtube.com/embed/C4C2dP231Z0",
    techStack: [
      "NextJS",
      "Typescript",
      "Supabase",
      "Prisma ORM",
      "TipTap",
      "OpenAI",
      "Firecrawl API",
      "Tailwind CSS",
    ],
    imagePosition: "center",
  },
  {
    title: "AI In-Line Text Editor",
    image: "/smrtfeed-editor2.png",
    description:
      "The Smrtfeed editor seamlessly integrates AI into your writing process, offering real-time suggestions and improvements as you type, while still giving you full control over your document down to each character. It enhances productivity and writing quality by providing context-aware assistance directly within your document. Smrtfeed also has the ability to generate images from text, and can be used to generate images for your documents.",
    videoUrls: [
      "https://www.youtube.com/embed/5XyEKVpZjLo?si=NLJALZ90Rq1oYdlZ",
    ],
    techStack: ["NextJS", "Typescript", "React", "TipTap", "REST APIs"],
    imagePosition: "center",
  },
  {
    title: "AI Copywriting Table",
    image: "/copy-table.png",
    description:
      "An AI-powered copy table for ideating content ideas at lightning speed. This tool speeds up copywriting brainstorming processes, allowing you to generate and organize creative content concepts efficiently.",
    videoUrl: "https://www.youtube.com/embed/vJ9nfZpi-Fs?si=_GQOEAIenOUKwVRS",
    techStack: [
      "NextJS",
      "Typescript",
      "React",
      "Flask",
      "Prisma",
      "Supabase",
      "REST APIs",
    ],
    imagePosition: "center",
  },
  {
    title: "AI Image Generator",
    image: "/kunochi-hero.jpg",
    description:
      "An image generation tool with my custom LoRAs (Low-Rank Adaptation) integrated. This project demonstrates the power of AI in creating unique, high-quality images tailored to specific themes or styles.",
    videoUrl: "https://www.youtube.com/embed/EKldEk2WJ7I?si=SVSyjxrT23CyC-rf",
    techStack: ["NextJS", "Typescript", "React", "Flux", "Python", "REST APIs"],
    imagePosition: "center",
  },
  {
    title: "Kunochi Chatbot",
    image: "/kunochi-1.png",
    description:
      "An AI-powered marketing assistant that streamlines the process from strategy to asset generation. Kunochi helps businesses develop marketing concepts and instantly transform them into visual assets, creating a seamless workflow from ideation to execution.",
    videoUrl: "https://www.youtube.com/embed/bqPFTg2iWHI",
    techStack: ["NextJS", "Typescript", "React", "OpenAI", "SDXL", "REST APIs"],
    imagePosition: "center",
  },
  {
    title: "YouTube To Content Generation",
    image: "/youtube-logo.png",
    description:
      "An AI-powered tool that transforms YouTube videos into engaging content threads. It automatically transcribes videos, processes the content through specialized prompts, and generates informative X (Twitter) threads. The system handles the complete pipeline from video processing to final content creation, making content repurposing effortless.",
    videoUrl: "https://www.youtube.com/embed/R6lDj3K2BvI?si=8B6-q_BwKkyDD4bS",
    techStack: ["Python", "Flask", "OpenAI API", "NextJS", "TypeScript"],
    imagePosition: "center",
  },
  {
    title: "Flmdrive LoRA",
    image: "/flmdrive-1.jpeg",
    description:
      "A custom LoRA (Low-Rank Adaptation) model trained on film photography aesthetics. This project showcases the ability to create AI-generated images that capture the unique characteristics and mood of film photography.",
    techStack: [""],
    imagePosition: "center",
    externalLink:
      "https://www.figma.com/board/6iVNRLCdXudIzWbrhQAkHP/Loras?node-id=0-1&t=G1HrZoH2H1Q9zfPR-1",
    linkType: "figma",
  },
];

const WorkProduct = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <div className="flex-grow flex flex-col items-start justify-center w-full pt-4 opacity-0 animate-fade-in-up [animation-delay:600ms]">
      <h1 className="text-lg mb-4">Projects</h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 sm:px-0">
        {projects.map((project, index) => (
          <Dialog
            key={index}
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <DialogTrigger asChild>
              <div
                className="cursor-pointer max-w-[98%] sm:max-w-full mx-auto w-full"
                onClick={() => {
                  if (project.externalLink) {
                    window.open(project.externalLink, "_blank");
                    return;
                  }
                  setSelectedProject(project);
                }}
              >
                <WobbleCard
                  containerClassName="border-2 border-white overflow-hidden transition-colors duration-300 hover:border-cyan-400"
                  className="p-0 relative aspect-square"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    priority={index === 0}
                    className="object-cover object-position-center z-0"
                    style={{
                      objectPosition: project.imagePosition || "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/70 to-zinc-800/70 backdrop-blur-[2px] flex flex-col justify-between text-white z-10">
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                      <h2 className="text-lg font-bold text-center leading-tight">
                        {project.title}
                      </h2>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1">
                    <span className="text-[10px] text-cyan-400">
                      {project.linkType === "figma"
                        ? "View Figma"
                        : "View Demo"}
                    </span>
                    <SquareArrowOutUpRight className="w-4 h-4 text-cyan-400" />
                  </div>
                </WobbleCard>
              </div>
            </DialogTrigger>
            {!project.externalLink && (
              <DialogContent className="sm:max-w-[725px] bg-zinc-900 border-2 border-white max-h-[90vh] overflow-y-auto">
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full"
                    src={
                      selectedProject.videoUrls
                        ? selectedProject.videoUrls[0]
                        : selectedProject.videoUrl
                    }
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
                {selectedProject.videoUrls &&
                  selectedProject.videoUrls.length > 1 && (
                    <div className="mt-4 aspect-video w-full">
                      <iframe
                        className="w-full h-full"
                        src={selectedProject.videoUrls[1]}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
              </DialogContent>
            )}
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default WorkProduct;
