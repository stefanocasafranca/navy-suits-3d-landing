/**
 * Collection Section
 * 
 * Card grid showcasing the collection. The suit is zoomed out
 * as a subtle backdrop, allowing cards to be the main focus.
 */

"use client";

import { motion } from "framer-motion";

const collections = [
  {
    id: 1,
    name: "The Executive",
    description: "Power meets refinement in this structured silhouette.",
    price: "$2,800",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "The Diplomat",
    description: "Subtle elegance for the discerning professional.",
    price: "$3,200",
    tag: "New",
  },
  {
    id: 3,
    name: "The Artisan",
    description: "Bold details that speak to creative confidence.",
    price: "$2,600",
    tag: null,
  },
  {
    id: 4,
    name: "The Connoisseur",
    description: "Ultimate luxury with rare fabric selections.",
    price: "$4,500",
    tag: "Limited",
  },
];

export function Collection() {
  return (
    <section
      id="collection"
      className="relative z-10 min-h-screen py-24 px-6 md:px-12 lg:px-24"
    >
      {/* Section header - centered */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-2xl mx-auto mb-16"
      >
        {/* Mobile-only gradient background for better text contrast */}
        <div className="absolute inset-0 -mx-6 md:mx-0 -my-8 md:my-0 px-6 md:px-0 py-8 md:py-0 
                        bg-gradient-to-b from-transparent via-navy/95 to-transparent 
                        md:bg-transparent backdrop-blur-sm md:backdrop-blur-none 
                        rounded-2xl md:rounded-none -z-10" 
             aria-hidden="true" />
        
        <p className="text-gold font-medium tracking-widest text-sm uppercase mb-4 relative z-0">
          The Collection
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-off-white mb-6 relative z-0">
          Curated
          <span className="font-semibold"> Excellence</span>
        </h2>
        <p className="text-lg text-slate md:text-slate leading-relaxed relative z-0">
          Each piece in our collection represents the pinnacle of tailoring, 
          designed for those who demand nothing less than extraordinary.
        </p>
      </motion.div>

      {/* Cards grid - positioned to avoid suit overlap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
        {collections.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-navy-soft/95 md:bg-navy-soft/80 backdrop-blur-md md:backdrop-blur-sm 
                       border border-off-white/20 md:border-off-white/10 
                       rounded-2xl p-8 transition-all duration-300 active:scale-[0.98]"
          >
            {/* Card inner glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Tag badge */}
            {item.tag && (
              <span className="absolute top-6 right-6 px-3 py-1 text-xs font-medium tracking-wider uppercase 
                             bg-gold/20 text-gold rounded-full border border-gold/30">
                {item.tag}
              </span>
            )}

            {/* Content */}
            <div className="relative">
              {/* Placeholder image area */}
              <div className="aspect-[4/3] bg-navy-light/50 rounded-xl mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-slate/50">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-medium text-champagne mb-2 group-hover:text-gold transition-colors">
                {item.name}
              </h3>
              <p className="text-slate mb-4 leading-relaxed">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-light text-off-white">
                  {item.price}
                </span>
                <span className="text-gold text-sm font-medium tracking-wide uppercase 
                               opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details →
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

