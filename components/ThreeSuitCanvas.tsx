/**
 * ThreeSuitCanvas.tsx
 * 
 * ============================================
 * SINGLE SOURCE OF TRUTH
 * ============================================
 * This component is the SINGLE SOURCE OF TRUTH for:
 * - Model scaling and centering (via bounding box calculation)
 * - MODEL_CONFIG (position, scale adjustments)
 * - CAMERA_CONFIG (fov, near, far, default position)
 * - Lighting setup (ambient, directional, accent lights)
 * 
 * DO NOT modify the bounding box logic, auto-scaling, centering,
 * or lighting setup unless intentionally tweaking 3D framing.
 * 
 * Animation values (rotationY, zoom, cameraY) are passed in as props
 * and controlled by useSuitScrollAnimation hook.
 * ============================================
 */

"use client";

import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { MotionValue, useMotionValue, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

// ============================================
// MODEL CONFIGURATION
// ============================================
// Adjust these values to change how the GLB model is positioned and scaled.
// These are applied AFTER bounding box auto-centering.

const MODEL_CONFIG = {
  /** Path to the GLB model file */
  modelPath: "/models/navy-suit.glb",
  /** Additional Y offset after centering (positive = up) */
  yOffset: 0,
  /** Scale multiplier applied after auto-fit (1 = auto-calculated size) */
  scaleMultiplier: 1.0,
  /** Target size for the model to fit within */
  targetSize: 3,
} as const;

// ============================================
// CAMERA CONFIGURATION
// ============================================
// Default camera settings. Position is dynamically adjusted by props.

const CAMERA_CONFIG = {
  /** Field of view in degrees */
  fov: 45,
  /** Near clipping plane */
  near: 0.1,
  /** Far clipping plane */
  far: 100,
  /** Default camera position [x, y, z] - positioned to the right for hero layout */
  defaultPosition: [2, 1.6, 5] as [number, number, number],
  /** Default zoom level */
  defaultZoom: 1.15,
} as const;

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ThreeSuitCanvasProps {
  /** Y-axis rotation in radians (from scroll animation) */
  rotationY: MotionValue<number>;
  /** Zoom level affecting camera distance */
  zoom: MotionValue<number>;
  /** Camera Y position for vertical framing */
  cameraY?: MotionValue<number>;
  /** Additional className for the canvas container */
  className?: string;
}

interface SuitModelProps {
  rotationY: MotionValue<number>;
}

interface CameraControllerProps {
  zoom: MotionValue<number>;
  cameraY: MotionValue<number>;
}

// ============================================
// SUIT MODEL COMPONENT
// ============================================
// Loads GLB, applies bounding box centering and auto-scaling

function SuitModel({ rotationY }: SuitModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_CONFIG.modelPath);
  const [currentRotation, setCurrentRotation] = useState(rotationY.get());

  // Listen to rotation changes
  useMotionValueEvent(rotationY, "change", (latest) => {
    setCurrentRotation(latest);
  });

  // Calculate bounding box and apply auto-scaling/centering
  const processedScene = useMemo(() => {
    const clonedScene = scene.clone();

    // ----------------------------------------
    // BOUNDING BOX CALCULATION
    // ----------------------------------------
    // Compute the bounding box of the entire model
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // ----------------------------------------
    // AUTO-SCALING
    // ----------------------------------------
    // Scale the model to fit within TARGET_SIZE
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = (MODEL_CONFIG.targetSize / maxDimension) * MODEL_CONFIG.scaleMultiplier;

    clonedScene.scale.setScalar(scale);

    // ----------------------------------------
    // AUTO-CENTERING
    // ----------------------------------------
    // Center the model at origin, then apply Y offset
    clonedScene.position.x = -center.x * scale;
    clonedScene.position.y = -center.y * scale + MODEL_CONFIG.yOffset;
    clonedScene.position.z = -center.z * scale;

    // Enable shadows on all meshes
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return clonedScene;
  }, [scene]);

  // Apply rotation in useFrame for smooth updates
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        currentRotation,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={processedScene} />
    </group>
  );
}

// ============================================
// CAMERA CONTROLLER
// ============================================
// Adjusts camera position based on scroll-driven values

function CameraController({ zoom, cameraY }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(...CAMERA_CONFIG.defaultPosition));
  const [currentZoom, setCurrentZoom] = useState(zoom.get());
  const [currentCameraY, setCurrentCameraY] = useState(cameraY.get());

  useMotionValueEvent(zoom, "change", (latestZoom) => {
    setCurrentZoom(latestZoom);
  });

  useMotionValueEvent(cameraY, "change", (latestY) => {
    setCurrentCameraY(latestY);
  });

  useFrame(() => {
    // Update target position based on current values
    const baseZ = CAMERA_CONFIG.defaultPosition[2];
    targetPosition.current.z = baseZ / currentZoom;
    targetPosition.current.y = currentCameraY;

    // Smoothly interpolate camera position
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(0, 1.2, 0); // Look at chest/torso area
  });

  return null;
}

// ============================================
// LIGHTING SETUP
// ============================================
// Premium lighting for navy suit - DO NOT MODIFY unless intentionally tweaking

function Lighting() {
  return (
    <>
      {/* Ambient fill - subtle to maintain contrast */}
      <ambientLight intensity={0.4} color="#8ba4c7" />

      {/* Key light - main illumination from front-right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light - softer from left side */}
      <directionalLight
        position={[-4, 5, 3]}
        intensity={0.6}
        color="#b8c5d9"
      />

      {/* Rim/accent light - highlights edges from behind */}
      <directionalLight
        position={[0, 3, -5]}
        intensity={0.5}
        color="#c9a962"
      />

      {/* Subtle gold accent from below for luxury feel */}
      <pointLight
        position={[0, -2, 2]}
        intensity={0.3}
        color="#c9a962"
        distance={8}
      />
    </>
  );
}

// ============================================
// LOADING FALLBACK
// ============================================

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#1a2d4a" wireframe />
    </mesh>
  );
}

// ============================================
// SCENE CONTENT
// ============================================
// Wrapper component that contains all 3D content

function SceneContent({ 
  rotationY, 
  zoom, 
  cameraY 
}: { 
  rotationY: MotionValue<number>; 
  zoom: MotionValue<number>; 
  cameraY: MotionValue<number>;
}) {
  return (
    <>
      {/* Lighting setup - DO NOT MODIFY */}
      <Lighting />

      {/* Optional environment for reflections */}
      <Environment preset="city" environmentIntensity={0.3} />

      {/* Camera animation controller */}
      <CameraController zoom={zoom} cameraY={cameraY} />

      {/* Debug sphere removed - 3D confirmed working */}

      {/* The suit model with suspense fallback */}
      <Suspense fallback={<LoadingFallback />}>
        <SuitModel rotationY={rotationY} />
      </Suspense>
    </>
  );
}

// ============================================
// MAIN CANVAS COMPONENT
// ============================================

export function ThreeSuitCanvas({
  rotationY,
  zoom,
  cameraY,
  className = "",
}: ThreeSuitCanvasProps) {
  // Create a proper MotionValue for cameraY if not provided
  const defaultCameraY = useMotionValue(CAMERA_CONFIG.defaultPosition[1]);
  const effectiveCameraY = cameraY || defaultCameraY;

  return (
    <div className={`w-full h-full min-h-screen ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          fov: CAMERA_CONFIG.fov,
          near: CAMERA_CONFIG.near,
          far: CAMERA_CONFIG.far,
          position: CAMERA_CONFIG.defaultPosition,
        }}
      >
        {/* Navy background matching page theme */}
        <color attach="background" args={["#0a1628"]} />

        <SceneContent 
          rotationY={rotationY} 
          zoom={zoom} 
          cameraY={effectiveCameraY} 
        />
      </Canvas>
    </div>
  );
}

// Preload the model for faster initial render
useGLTF.preload(MODEL_CONFIG.modelPath);

export { MODEL_CONFIG, CAMERA_CONFIG };
