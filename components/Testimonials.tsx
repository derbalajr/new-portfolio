"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/data";
import { MessageSquareQuote, Star } from "lucide-react";

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="reviews" className="py-16 sm:py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-2"
      >
        <MessageSquareQuote size={18} className="text-accent" />
        <span className="text-accent text-sm font-mono">Testimonials</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
          What People <span className="gradient-text-accent">Say</span>
        </h2>
        <p className="mt-3 text-text-secondary text-sm sm:text-base max-w-lg">
          Feedback from colleagues, clients, and collaborators I&apos;ve worked
          with.
        </p>
      </motion.div>

      <div className="mt-10 sm:mt-14 relative">
        {/* Fade edges — smaller on mobile */}
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-16 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        {/* Scrollable on mobile, auto-scroll on desktop */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide sm:overflow-hidden"
        >
          <div className="flex gap-4 sm:gap-6 sm:animate-scroll-x sm:hover:[animation-play-state:paused] w-max">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="shrink-0 w-[280px] sm:w-[360px] lg:w-[400px] card-hover rounded-xl p-5 sm:p-6 flex flex-col"
              >
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      className="fill-accent/80 text-accent/80"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border-subtle flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent-muted border border-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] sm:text-xs font-semibold text-accent">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-text-primary">
                      {t.name}
                    </p>
                    <p className="text-[10px] sm:text-xs text-text-tertiary">
                      {t.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
