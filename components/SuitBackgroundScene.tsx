/**
 * SuitBackgroundScene.tsx
 * 
 * Global fixed background wrapper for the 3D suit.
 * This component renders the ThreeSuitCanvas as a fixed background layer
 * that sits behind all page content.
 * 
 * The Canvas is created ONCE and never unmounted during scroll.
 * All animation is driven by MotionValues from useSuitScrollAnimation.
 */

"use client";

import { motion, MotionValue, useMotionValue } from "framer-motion";
import { ThreeSuitCanvas } from "./ThreeSuitCanvas";

// ============================================
// TYPE DEFINITIONS
// ============================================

export type SuitBackgroundProps = {
  /** Y-axis rotation in radians */
  rotationY: MotionValue<number>;
  /** Zoom level (affects camera distance) */
  zoom: MotionValue<number>;
  /** Optional: Camera Y position for vertical framing */
  cameraY?: MotionValue<number>;
  /** Optional: Scene opacity (0-1), defaults to 1 */
  opacity?: MotionValue<number>;
};

// ============================================
// MAIN COMPONENT
// ============================================

export function SuitBackgroundScene({
  rotationY,
  zoom,
  cameraY,
  opacity,
}: SuitBackgroundProps) {
  // Default opacity to 1 if not provided
  const defaultOpacity = useMotionValue(1);
  const effectiveOpacity = opacity || defaultOpacity;

  return (
    /**
     * Fixed positioning ensures the suit stays in place during scroll.
     * - inset-0: covers entire viewport
     * - -z-10: sits behind all content (content uses z-10 or higher)
     * - pointer-events-none: allows clicking through to content
     * 
     * motion.div allows us to animate opacity smoothly
     */
    <motion.div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: effectiveOpacity }}
      aria-hidden="true"
    >
      <ThreeSuitCanvas
        rotationY={rotationY}
        zoom={zoom}
        cameraY={cameraY}
      />
    </motion.div>
  );
}

