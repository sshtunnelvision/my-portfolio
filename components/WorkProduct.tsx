"use client";

import React from "react";

const WorkProduct = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl aspect-video relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-1 bg-zinc-900 rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/5XyEKVpZjLo?si=NLJALZ90Rq1oYdlZ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WorkProduct;
