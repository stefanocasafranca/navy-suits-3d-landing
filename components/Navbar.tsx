/**
 * Navbar Component
 * 
 * Fixed navigation that sits on top of all content.
 * Provides links to each section of the page.
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#craft", label: "Craft" },
  { href: "#collection", label: "Collection" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" />

      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a href="#hero" className="text-2xl font-light tracking-wider text-off-white">
          NAVY<span className="font-semibold text-gold">SUITS</span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-off-white/70 hover:text-gold 
                       transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 bg-gold/10 border border-gold/30 text-gold text-sm font-medium 
                     tracking-wide rounded-full hover:bg-gold hover:text-navy transition-all duration-300"
          >
            Book Now
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-off-white"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-off-white"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-off-white"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden relative mt-6 py-6 border-t border-off-white/10"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-off-white/70 hover:text-gold 
                           transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="inline-flex justify-center px-6 py-3 mt-4 bg-gold text-navy 
                         font-medium rounded-full"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

