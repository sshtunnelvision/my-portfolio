"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const kunochiFeatures = [
  {
    title: "Brand Asset Generator",
    description: "AI-powered tool for creating consistent brand assets",
    tags: ["AI", "Branding", "Design"],
    link: "https://brandassetgenerator.com",
    image: "/image-generator.png",
  },
  {
    title: "Copy Grid",
    description: "Effortless layout creation for web designers",
    tags: ["Design", "Layout", "Web"],
    link: "https://copygrid.com",
    image: "/copygrid-hero.jpg",
  },
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
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">
            Kunochi - AI-powered marketing tools for Etsy shop owners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            {kunochiFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-800 border-slate-700 hover:border-cyan-500 transition-all duration-300 overflow-hidden shadow-lg group"
              >
                <div className="relative aspect-video">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {feature.tags.map((tag, tagIndex) => (
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
                      href={feature.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 flex items-center"
                    >
                      View Feature <ArrowUpRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://kunochi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors duration-300"
            >
              Explore Kunochi <ArrowUpRight className="h-5 w-5 ml-2" />
            </a>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default WorkProduct;
