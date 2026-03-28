"use client";

import { useState, useEffect } from "react";
import { navItems } from "@/data";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/70 backdrop-blur-xl border-b border-border shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm group-hover:bg-accent/20 transition-colors">
            OD
          </span>
          <span className="text-text-primary font-medium text-sm hidden sm:inline">
            omar<span className="text-text-tertiary">.derbala</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="nav-link text-sm text-text-secondary hover:text-text-primary px-4 py-2 transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
          <a
            href="mailto:derbalajr@gmail.com"
            className="btn-shine ml-2 text-sm font-medium text-white bg-accent/90 hover:bg-accent px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-glow-sm"
          >
            Get in Touch
          </a>
        </div>

        {/* Hamburger — 44px+ touch target */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-secondary hover:text-text-primary p-3 -mr-2 rounded-lg hover:bg-white/[0.04]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-text-secondary hover:text-text-primary py-3.5 px-3 rounded-lg hover:bg-white/[0.04] transition-all"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="mailto:derbalajr@gmail.com"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-sm font-medium text-white bg-accent/90 px-5 py-3.5 rounded-lg text-center"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
