/**
 * useSuitScrollAnimation.ts
 * 
 * Global scroll-driven animation hook for the 3D suit background.
 * This is the SINGLE SOURCE OF TRUTH for all scroll-based suit animations.
 * 
 * The suit animates through 5 sections based on scroll progress:
 * - Hero (0.00–0.20): Elegant 3/4 angle, powerful presence
 * - Craft (0.20–0.45): Highlights lapels and shoulders
 * - Collection (0.45–0.70): Side view, subtle backdrop for cards
 * - Experience (0.70–0.85): Warm 3/4 view, intimate feel
 * - Contact (0.85–1.00): Fades out into navy background
 */

"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useMemo } from "react";

// ============================================
// ANIMATION KEYFRAME CONFIG
// ============================================
// Adjust these values to tweak per-section animation.
// Each section defines target values that are interpolated smoothly.

const KEYFRAMES = {
  /**
   * Hero Section (0.00 - 0.20)
   * - Elegant 3/4 angle facing user
   * - Slightly closer zoom for powerful presence
   * - Natural chest/torso framing
   */
  hero: {
    scrollStart: 0.0,
    scrollEnd: 0.2,
    rotationY: 0.35, // More frontal and premium lean
    zoom: 3.0, // Closer, powerful
    cameraY: 1.6, // Chest/torso framing
    cameraX: 1.5, // Horizontal position - positive moves suit left
    opacity: 1.0,
  },

  /**
   * Craft Section (0.20 - 0.45)
   * - Rotates to highlight lapels and shoulders
   * - Adjusted zoom so suit doesn't overlap text
   * - Slightly elevated camera
   */
  craft: {
    scrollStart: 0.2,
    scrollEnd: 0.45,
    rotationY: 1.2, // ~69° - shows lapel detail
    zoom: 1.08, // Slightly zoomed out
    cameraY: 1.65, // Slightly higher
    cameraX: 1.5, // Horizontal position - positive moves suit left
    opacity: 1.0,
  },

  /**
   * Collection Section (0.45 - 0.70)
   * - Side/3/4-side pose for subtle backdrop
   * - Zoomed out so cards are the focus
   * - Suit becomes a silhouette backdrop
   */
  collection: {
    scrollStart: 0.45,
    scrollEnd: 0.7,
    rotationY: Math.PI * 0.75, // ~135° - side view
    zoom: 0.95, // Zoomed out, smaller silhouette
    cameraY: 1.7, // Slightly higher
    cameraX: 1.3, // Horizontal position - positive moves suit left
    opacity: 1.0,
  },

  /**
   * Experience Section (0.70 - 0.85)
   * - Returns to warm 3/4 view
   * - Slightly closer for intimate feel
   * - Natural shoulder framing
   */
  experience: {
    scrollStart: 0.7,
    scrollEnd: 0.85,
    rotationY: 2.0, // ~115° - warm 3/4 returning
    zoom: 1.02, // Slightly closer
    cameraY: 1.75, // Shoulder framing
    cameraX: 1.2, // Horizontal position - positive moves suit left
    opacity: 1.0,
  },

  /**
   * Contact Section (0.85 - 1.00)
   * - Fades to invisible
   * - Subtle zoom shift for cinematic dissolve
   * - Rotation slows/stabilizes
   */
  contact: {
    scrollStart: 0.85,
    scrollEnd: 1.0,
    rotationY: 2.2, // Stabilizes
    zoom: 0.98, // Slight zoom out as it fades
    cameraY: 1.8, // Final position
    cameraX: 1.0, // Horizontal position - positive moves suit left
    opacity: 0.0, // Fades out completely
  },
} as const;

// ============================================
// TYPE DEFINITIONS
// ============================================

export type SuitAnimationState = {
  /** Scroll progress from 0 (top) to 1 (bottom of page) */
  scrollProgress: MotionValue<number>;
  /** Y-axis rotation in radians - controls suit facing direction */
  rotationY: MotionValue<number>;
  /** Zoom level - affects apparent size of suit */
  zoom: MotionValue<number>;
  /** Camera Y position - controls vertical framing */
  cameraY: MotionValue<number>;
  /** Camera X position - controls horizontal framing */
  cameraX: MotionValue<number>;
  /** Opacity - 1 = visible, 0 = invisible (used in Contact section) */
  opacity: MotionValue<number>;
};

// ============================================
// HELPER: Linear interpolation
// ============================================

/**
 * Creates scroll breakpoints and corresponding values for smooth interpolation.
 * This extracts all keyframe data into arrays for useTransform.
 */
function getInterpolationArrays() {
  const sections = [
    KEYFRAMES.hero,
    KEYFRAMES.craft,
    KEYFRAMES.collection,
    KEYFRAMES.experience,
    KEYFRAMES.contact,
  ];

  // Build scroll position breakpoints
  const scrollBreakpoints: number[] = [];
  const rotationValues: number[] = [];
  const zoomValues: number[] = [];
  const cameraYValues: number[] = [];
  const cameraXValues: number[] = [];
  const opacityValues: number[] = [];

  sections.forEach((section, index) => {
    // Add start point for each section
    scrollBreakpoints.push(section.scrollStart);
    rotationValues.push(section.rotationY);
    zoomValues.push(section.zoom);
    cameraYValues.push(section.cameraY);
    cameraXValues.push(section.cameraX);
    opacityValues.push(section.opacity);

    // Add end point only for the last section
    if (index === sections.length - 1) {
      scrollBreakpoints.push(section.scrollEnd);
      rotationValues.push(section.rotationY);
      zoomValues.push(section.zoom);
      cameraYValues.push(section.cameraY);
      cameraXValues.push(section.cameraX);
      opacityValues.push(section.opacity);
    }
  });

  return {
    scrollBreakpoints,
    rotationValues,
    zoomValues,
    cameraYValues,
    cameraXValues,
    opacityValues,
  };
}

// ============================================
// MAIN HOOK
// ============================================

/**
 * useSuitScrollAnimation
 * 
 * Returns MotionValues that drive the 3D suit animation based on scroll position.
 * All values are smoothly interpolated between section keyframes.
 * 
 * @returns SuitAnimationState - Object containing all animation MotionValues
 * 
 * @example
 * ```tsx
 * const { rotationY, zoom, cameraY, cameraX, opacity } = useSuitScrollAnimation();
 * // Pass these to SuitBackgroundScene
 * ```
 */
export function useSuitScrollAnimation(): SuitAnimationState {
  // Track scroll progress for the entire page
  const { scrollYProgress } = useScroll();

  // Memoize interpolation arrays to avoid recalculation
  const interpolation = useMemo(() => getInterpolationArrays(), []);

  // Create smooth transforms for each property
  // useTransform linearly interpolates between breakpoint values

  /**
   * rotationY: Controls which direction the suit faces
   * - Lower values = facing more toward viewer
   * - Higher values = rotated away/to the side
   */
  const rotationY = useTransform(
    scrollYProgress,
    interpolation.scrollBreakpoints,
    interpolation.rotationValues
  );

  /**
   * zoom: Controls the apparent size/distance of the suit
   * - Higher values = suit appears closer/larger
   * - Lower values = suit appears further/smaller
   */
  const zoom = useTransform(
    scrollYProgress,
    interpolation.scrollBreakpoints,
    interpolation.zoomValues
  );

  /**
   * cameraY: Controls vertical camera position
   * - Lower values = camera at chest level
   * - Higher values = camera at shoulder/head level
   */
  const cameraY = useTransform(
    scrollYProgress,
    interpolation.scrollBreakpoints,
    interpolation.cameraYValues
  );

  /**
   * cameraX: Controls horizontal camera position (horizontal framing)
   * - Positive values = camera moves right, suit appears to move left
   * - Negative values = camera moves left, suit appears to move right
   * - Use this to position the suit on the right half of the hero section
   * - Higher positive values push the suit further to the right side of screen
   */
  const cameraX = useTransform(
    scrollYProgress,
    interpolation.scrollBreakpoints,
    interpolation.cameraXValues
  );

  /**
   * opacity: Controls suit visibility
   * - 1 = fully visible
   * - 0 = invisible (faded into background)
   * Only transitions to 0 in the Contact section
   */
  const opacity = useTransform(
    scrollYProgress,
    interpolation.scrollBreakpoints,
    interpolation.opacityValues
  );

  return {
    scrollProgress: scrollYProgress,
    rotationY,
    zoom,
    cameraY,
    cameraX,
    opacity,
  };
}

export { KEYFRAMES };

