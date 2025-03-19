"use client";

import { useState } from "react";
import Header from "@/components/header";
import WorkProduct from "@/components/WorkProduct";
import Experience from "@/components/Experience";
import HomeNavigation from "@/components/HomeNavigation";
import PixelTrail from "@/components/PixelTrail";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <>
      <div className="fixed inset-0 -z-10"></div>
      <div className="fixed inset-0 -z-5">
        <PixelTrail
          pixelSize={10}
          delay={100}
          fadeDuration={400}
          pixelClassName="bg-orange-300"
        />
      </div>
      <div className="w-full pb-16 relative z-10">
        <Header />
        <HomeNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <AnimatePresence mode="wait">
          {activeTab === "projects" ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Experience />
            </motion.div>
          ) : (
            <motion.div
              key="demos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WorkProduct />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
