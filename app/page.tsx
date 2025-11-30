/**
 * Main Page
 * 
 * This page integrates the 3D suit background with scroll-driven animations.
 * The suit is rendered ONCE in SuitBackgroundScene and never unmounts.
 * All section content sits on top with z-10.
 */

"use client";

import { SuitBackgroundScene } from "@/components/SuitBackgroundScene";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Craft } from "@/components/sections/Craft";
import { Collection } from "@/components/sections/Collection";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { useSuitScrollAnimation } from "@/hooks/useSuitScrollAnimation";

export default function Home() {
  // Get scroll-driven animation values
  const { rotationY, zoom, cameraY, opacity } = useSuitScrollAnimation();

  return (
    <main className="relative min-h-screen overflow-x-hidden text-off-white">
      {/* 
        3D Suit Background Scene
        - Rendered once, fixed position behind all content
        - Animation driven by scroll via useSuitScrollAnimation
        - Canvas never unmounts during scroll
      */}
      <SuitBackgroundScene
        rotationY={rotationY}
        zoom={zoom}
        cameraY={cameraY}
        opacity={opacity}
      />

      {/* 
        Scrollable Content Layer
        - Sits on top of 3D background (z-10)
        - Contains all sections and navigation
      */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Craft />
        <Collection />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
