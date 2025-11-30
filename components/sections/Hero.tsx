/**
 * Hero Section
 * 
 * The opening statement. The suit is prominently visible behind
 * with an elegant 3/4 angle. Text sits on top with strong contrast.
 */

"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24"
    >
      {/* Content container - positioned to avoid suit overlap */}
      <div className="max-w-3xl">
        {/* Subtle backdrop for text readability */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Gradient backdrop */}
          <div className="absolute -inset-8 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent rounded-2xl" />
          
          <div className="relative">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gold font-medium tracking-widest text-sm uppercase mb-4"
            >
              Bespoke Excellence
            </motion.p>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-off-white mb-6"
            >
              Tailored
              <br />
              <span className="font-semibold text-champagne">Precision</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-slate max-w-xl leading-relaxed"
            >
              Where tradition meets innovation. Each piece crafted with 
              meticulous attention to detail and an unwavering commitment 
              to excellence.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex gap-4"
            >
              <a
                href="#collection"
                className="inline-flex items-center px-8 py-4 bg-gold text-navy font-medium rounded-full 
                         transition-all duration-300 active:scale-95"
              >
                View Collection
              </a>
              <a
                href="#craft"
                className="inline-flex items-center px-8 py-4 border border-off-white/30 text-off-white 
                         font-medium rounded-full transition-all duration-300 active:scale-95"
              >
                Our Craft
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-off-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

