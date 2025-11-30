/**
 * Contact Section
 * 
 * Final section where the suit fades out completely.
 * Solid navy background ensures a clean, minimal look
 * when the 3D model is fully transparent.
 */

"use client";

import { motion } from "framer-motion";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 min-h-screen flex items-center py-24 px-6 md:px-12 lg:px-24 bg-navy"
    >
      {/* Solid background to ensure clean look when suit fades */}
      <div className="absolute inset-0 bg-navy" />

      <div className="relative w-full max-w-4xl mx-auto text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold font-medium tracking-widest text-sm uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-off-white mb-6">
            Let's Create
            <span className="font-semibold"> Together</span>
          </h2>
          <p className="text-lg text-slate leading-relaxed max-w-xl mx-auto mb-12">
            Ready to experience bespoke tailoring? Schedule a consultation 
            and discover the difference that true craftsmanship makes.
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="space-y-6">
            {/* Name input */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-6 py-4 bg-navy-soft border border-off-white/20 rounded-xl 
                         text-off-white placeholder:text-slate focus:outline-none focus:border-gold
                         transition-colors duration-300"
              />
            </div>

            {/* Email input */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-6 py-4 bg-navy-soft border border-off-white/20 rounded-xl 
                         text-off-white placeholder:text-slate focus:outline-none focus:border-gold
                         transition-colors duration-300"
              />
            </div>

            {/* Message textarea */}
            <div>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your vision..."
                className="w-full px-6 py-4 bg-navy-soft border border-off-white/20 rounded-xl 
                         text-off-white placeholder:text-slate focus:outline-none focus:border-gold
                         transition-colors duration-300 resize-none"
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-gold text-navy font-medium rounded-xl 
                       transition-all duration-300 active:scale-95"
            >
              Request Consultation
            </motion.button>
          </div>
        </motion.form>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-12 border-t border-off-white/10"
        >
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 text-slate">
            <div>
              <p className="text-off-white font-medium mb-1">Visit</p>
              <p>123 Savile Row, London W1S 3PR</p>
            </div>
            <div>
              <p className="text-off-white font-medium mb-1">Call</p>
              <p>+44 20 7123 4567</p>
            </div>
            <div>
              <p className="text-off-white font-medium mb-1">Email</p>
              <p>bespoke@navysuits.com</p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-slate text-sm"
        >
          <p>© 2024 Navy Suits. All rights reserved.</p>
        </motion.footer>
      </div>
    </section>
  );
}

