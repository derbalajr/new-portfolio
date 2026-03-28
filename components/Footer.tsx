"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/data";
import { Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="py-16 sm:py-20 lg:py-28 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute -top-32 left-0 w-[300px] sm:w-[400px] h-[200px] sm:h-[300px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
              Let&apos;s build something{" "}
              <span className="gradient-text-accent">together</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-text-secondary text-sm sm:text-base leading-relaxed max-w-md">
              Available for full-time roles, contract work, and consulting on
              enterprise systems. Based in Cairo, Egypt — open to remote.
            </p>

            <a
              href="mailto:derbalajr@gmail.com"
              className="btn-shine mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg transition-all duration-200 hover:shadow-glow"
            >
              <Mail size={16} />
              derbalajr@gmail.com
            </a>

            {/* Social links with proper touch targets */}
            <div className="mt-6 sm:mt-8 flex items-center gap-1 sm:gap-2 -ml-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors duration-200 px-3 py-2.5 rounded-lg"
                >
                  {link.name}
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-xs text-text-tertiary">
          &copy; {new Date().getFullYear()} Omar Derbala
        </p>
        <p className="text-xs text-text-tertiary">Cairo, Egypt</p>
      </div>
    </footer>
  );
}
