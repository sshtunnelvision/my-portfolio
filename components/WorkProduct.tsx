"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Kunochi",
    description: "AI-powered marketing tools for Etsy shop owners",
    tags: ["AI", "Marketing", "Etsy"],
    link: "https://kunochi.com",
    image: "/kunochi-hero.jpg",
  },
  {
    title: "Copy Grid",
    description: "Effortless layout creation for web designers",
    tags: ["Design", "Layout", "Web"],
    link: "https://copygrid.com",
    image: "/copygrid-hero.jpg",
  },
  {
    title: "AI Chat",
    description: "Intelligent conversational AI platform",
    tags: ["AI", "Chat", "NLP"],
    link: "https://aichat.com",
    image: "/aichat-hero.jpg",
  },
  // Add more projects as needed
];

const WorkProduct = () => {
  return (
    <div className="w-full bg-gradient-to-b from-slate-900 to-slate-700 py-16 -mt-32 relative z-10">
      <div className="absolute inset-0 from-transparent to-slate-700"></div>
      <motion.div
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-slate-800 border-slate-700 hover:border-cyan-500 transition-all duration-300 overflow-hidden shadow-lg group"
            >
              <div className="relative aspect-square">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="bg-slate-700 text-cyan-400 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center"
                  >
                    View Project <ArrowUpRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WorkProduct;
