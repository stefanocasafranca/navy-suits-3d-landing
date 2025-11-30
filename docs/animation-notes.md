# 3D Suit Background Animation Notes

This document describes how the scroll-driven 3D suit animation works and where to make adjustments.

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    app/page.tsx                      │
│  ┌───────────────────────────────────────────────┐  │
│  │         useSuitScrollAnimation()              │  │
│  │  Returns: rotationY, zoom, cameraY, opacity   │  │
│  └───────────────────────────────────────────────┘  │
│                        │                             │
│                        ▼                             │
│  ┌───────────────────────────────────────────────┐  │
│  │         SuitBackgroundScene                   │  │
│  │  - Fixed position, z-index: -10               │  │
│  │  - Wraps Canvas in motion.div for opacity     │  │
│  └───────────────────────────────────────────────┘  │
│                        │                             │
│                        ▼                             │
│  ┌───────────────────────────────────────────────┐  │
│  │           ThreeSuitCanvas                     │  │
│  │  - Single source of truth for 3D setup        │  │
│  │  - Bounding box, scaling, lighting            │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Per-Section Keyframe Values

To adjust how the suit behaves in each section, edit the `KEYFRAMES` object in:

**File:** `hooks/useSuitScrollAnimation.ts`

```typescript
const KEYFRAMES = {
  hero: {
    scrollStart: 0.0,
    scrollEnd: 0.2,
    rotationY: 0.55,  // Adjust facing angle (radians)
    zoom: 1.15,       // Adjust size (higher = closer)
    cameraY: 1.6,     // Adjust vertical framing
    opacity: 1.0,     // Visibility (0-1)
  },
  craft: { /* ... */ },
  collection: { /* ... */ },
  experience: { /* ... */ },
  contact: { /* ... */ },
};
```

### Value Reference

| Property   | Description                          | Typical Range    |
|------------|--------------------------------------|------------------|
| rotationY  | Y-axis rotation in radians           | 0 to π (0-3.14)  |
| zoom       | Camera distance multiplier           | 0.8 to 1.2       |
| cameraY    | Vertical camera position             | 1.4 to 2.0       |
| opacity    | Scene visibility                     | 0 to 1           |

### Section Scroll Ranges

| Section    | Start | End   | Purpose                    |
|------------|-------|-------|----------------------------|
| Hero       | 0.00  | 0.20  | Elegant 3/4 angle          |
| Craft      | 0.20  | 0.45  | Highlight lapels           |
| Collection | 0.45  | 0.70  | Side view, subtle backdrop |
| Experience | 0.70  | 0.85  | Warm 3/4, intimate         |
| Contact    | 0.85  | 1.00  | Fade out to invisible      |

## 3D Model Configuration

**⚠️ DO NOT MODIFY** unless intentionally tweaking 3D framing.

**File:** `components/ThreeSuitCanvas.tsx`

The following must remain unchanged:

1. **Bounding Box Calculation** - Ensures model fits properly
2. **Auto-Scaling** - Normalizes different model sizes
3. **Auto-Centering** - Places model at origin
4. **MODEL_CONFIG** - Contains model path and scale settings
5. **CAMERA_CONFIG** - Contains FOV, clipping planes, default position
6. **Lighting Setup** - Ambient, directional, and accent lights

If you need to adjust the base model position/scale, modify `MODEL_CONFIG`:

```typescript
const MODEL_CONFIG = {
  modelPath: "/models/suit.glb",
  yOffset: 0,           // Vertical offset after centering
  scaleMultiplier: 1.0, // Scale adjustment
  targetSize: 3,        // Target bounding size
};
```

## Adding a New Section

1. Define keyframe values in `KEYFRAMES` object
2. Update the `getInterpolationArrays()` function if adding to the middle
3. Create section component in `components/sections/`
4. Add section to `app/page.tsx`

## Performance Considerations

- The Canvas is created **once** and never unmounts
- All animations use Framer Motion's `MotionValue` for GPU-accelerated transforms
- Avoid adding multiple Canvas elements
- Use `requestAnimationFrame` for any custom Three.js animations

## Debugging

1. **Suit not visible?** Check if your GLB is in `/public/models/suit.glb`
2. **Choppy animation?** Check browser dev tools for JS errors
3. **Opacity not working?** Ensure `opacity` MotionValue is passed to SuitBackgroundScene

## Testing

Verify these behaviors:
- [x] Canvas created only once (no remounting on scroll)
- [x] Suit visible in Hero, Craft, Collection, Experience
- [x] Suit fades out in Contact section
- [x] Text always readable over 3D background
- [x] Smooth animation on desktop and mobile
- [x] No console errors

## Notes

- The body background is set to `transparent` in `globals.css` to allow the 3D canvas to show through
- The 3D canvas uses a fixed position with `z-index: -10` to sit behind all content
- Content elements use `z-index: 10` or higher to appear above the 3D scene
- The GLB model path is configured in `ThreeSuitCanvas.tsx` as `/models/navy-suit.glb`

