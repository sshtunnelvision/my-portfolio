"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "AI-Powered Task Manager",
    description:
      "A smart task management app that uses AI to prioritize and suggest tasks. This innovative solution leverages machine learning algorithms to analyze user behavior and task patterns, providing intelligent recommendations for task prioritization and time management.",
    tags: ["React", "Node.js", "OpenAI", "Machine Learning"],
    link: "#",
  },
  {
    title: "Eco-Friendly Shopping Assistant",
    description:
      "An app that helps users make environmentally conscious shopping decisions. By integrating with various sustainability databases and carbon footprint calculators, this assistant provides real-time information on product sustainability, alternative eco-friendly options, and personalized recommendations for reducing environmental impact.",
    tags: [
      "React Native",
      "Firebase",
      "Sustainability API",
      "Carbon Footprint Calculator",
    ],
    link: "#",
  },
  {
    title: "Virtual Reality Meditation Space",
    description:
      "A VR application for immersive meditation experiences in beautiful virtual environments. This app combines cutting-edge VR technology with scientifically-backed meditation techniques to create a unique and effective relaxation tool. Users can choose from a variety of serene environments and guided meditation sessions tailored to their needs.",
    tags: ["Unity", "C#", "VR", "Oculus SDK", "Biofeedback Integration"],
    link: "#",
  },
];

const WorkProduct = () => {
  return (
    <div className="w-full bg-gradient-to-b from-slate-800 via-slate-800 to-slate-700 py-12 -mt-32 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800 to-slate-700"></div>
      <motion.div
        id="projects"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 hover:border-cyan-500 transition-all duration-300 h-full flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-white flex justify-between items-center">
                  {project.title}
                  <ArrowUpRight className="h-6 w-6 text-cyan-400" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-gray-300 mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="bg-slate-600 text-cyan-400"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WorkProduct;
