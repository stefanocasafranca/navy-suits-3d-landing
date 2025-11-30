/**
 * Experience Section
 * 
 * Details the customer experience. The suit returns to a warm 3/4 view,
 * feeling more intimate. A gradient ensures text contrast.
 */

"use client";

import { motion } from "framer-motion";

const experienceSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Begin with a private session where we understand your style, needs, and lifestyle. Every journey starts with a conversation.",
  },
  {
    step: "02",
    title: "Measurement",
    description: "Our master tailor takes over 30 precise measurements, ensuring a fit that's uniquely yours.",
  },
  {
    step: "03",
    title: "Selection",
    description: "Choose from our curated collection of the world's finest fabrics, buttons, and linings.",
  },
  {
    step: "04",
    title: "Creation",
    description: "Watch as your garment takes shape over 6-8 weeks, with two fitting sessions to perfect every detail.",
  },
  {
    step: "05",
    title: "Delivery",
    description: "Receive your finished piece, pressed and presented in our signature garment bag. Welcome to bespoke.",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative z-10 min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24"
    >
      {/* Gradient backdrop for text readability */}
      <div className="absolute inset-y-0 right-0 w-full md:w-2/3 lg:w-1/2 bg-gradient-to-l from-navy-soft via-navy-soft/95 to-transparent" />

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          {/* Section header - right aligned on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 lg:sticky lg:top-24 mb-12 lg:mb-0 lg:text-right lg:ml-auto"
          >
            <p className="text-gold font-medium tracking-widest text-sm uppercase mb-4">
              Your Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-off-white mb-6">
              The
              <span className="font-semibold"> Experience</span>
            </h2>
            <p className="text-lg text-slate leading-relaxed">
              From first consultation to final fitting, every moment is crafted 
              to make you feel valued and understood.
            </p>
          </motion.div>

          {/* Experience steps - left side on desktop */}
          <div className="lg:w-2/3 lg:order-first">
            <div className="space-y-8 lg:space-y-10">
              {experienceSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex gap-6"
                >
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <span className="block w-14 h-14 rounded-full border-2 border-gold/30 
                                   flex items-center justify-center text-gold font-light text-lg
                                   group-hover:bg-gold/10 group-hover:border-gold transition-all duration-300">
                      {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-2">
                    <h3 className="text-xl font-medium text-champagne mb-2 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate leading-relaxed max-w-md">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 ml-20"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-gold 
                         text-gold font-medium rounded-full transition-all duration-300 
                         hover:bg-gold hover:text-navy active:scale-95"
              >
                Begin Your Journey
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

