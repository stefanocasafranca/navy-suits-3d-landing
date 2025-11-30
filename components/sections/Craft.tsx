/**
 * Craft Section
 * 
 * Showcases the craftsmanship. The suit rotates to highlight
 * lapels and shoulders. A subtle gradient panel ensures text readability.
 */

"use client";

import { motion } from "framer-motion";

const craftPoints = [
  {
    title: "Hand-Cut Fabric",
    description: "Every pattern meticulously cut by master tailors with decades of experience.",
  },
  {
    title: "Canvas Construction",
    description: "Full canvas interlining that molds to your body over time for a perfect fit.",
  },
  {
    title: "Hand-Stitched Details",
    description: "Over 2,000 hand stitches in every jacket, ensuring lasting quality.",
  },
  {
    title: "Premium Materials",
    description: "Only the finest Super 150s wool and silk from renowned European mills.",
  },
];

export function Craft() {
  return (
    <section
      id="craft"
      className="relative z-10 min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24"
    >
      {/* Gradient panel behind text for readability over 3D background */}
      <div className="absolute inset-y-0 left-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-r from-navy-soft via-navy-soft/95 to-transparent" />

      <div className="relative max-w-2xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold font-medium tracking-widest text-sm uppercase mb-4">
            The Art of Tailoring
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-off-white mb-8">
            Crafted with
            <br />
            <span className="font-semibold">Intention</span>
          </h2>
          <p className="text-lg text-slate max-w-xl leading-relaxed mb-12">
            Every stitch tells a story of dedication. Our artisans combine 
            centuries-old techniques with modern precision to create pieces 
            that transcend fashion.
          </p>
        </motion.div>

        {/* Craft points grid */}
        <div className="grid gap-8 md:gap-10">
          {craftPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex gap-4 items-start">
                {/* Index number */}
                <span className="text-gold/50 font-light text-2xl tabular-nums">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-champagne mb-2 group-hover:text-gold transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-slate leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

