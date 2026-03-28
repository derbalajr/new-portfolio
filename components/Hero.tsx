"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { heroData } from "@/data";
import { ArrowDown, FileText } from "lucide-react";
import Image from "next/image";
import { useMousePosition } from "@/hooks/useMousePosition";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animate(count, target, { duration: 2, ease: "easeOut" });
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  const { pos: mousePos, active: mouseActive, handleMouseMove, handleMouseEnter, handleMouseLeave } = useMousePosition();

  const nameChars = "Omar Derbala".split("");

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] flex items-center pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Cursor-following spotlight — desktop only */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 hidden sm:block"
        style={{
          opacity: mouseActive ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.07), transparent 60%)`,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative w-full"
      >
        {/* Top: Title + Name + Photo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 items-stretch">
          {/* Main content — 3 cols */}
          <motion.div
            variants={item}
            className="md:col-span-3 flex flex-col justify-center"
          >
            <p className="text-accent text-xs sm:text-sm font-mono mb-4 sm:mb-6 tracking-wider uppercase">
              {heroData.title}
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.05]">
              <span className="text-text-primary">I&apos;m </span>
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.35 + i * 0.03,
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  }}
                  className="inline-block gradient-text"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={item}
              className="mt-4 sm:mt-6 text-sm sm:text-lg text-text-secondary leading-relaxed max-w-lg"
            >
              {heroData.description}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 sm:mt-8 flex flex-wrap gap-3"
            >
              <a
                href={heroData.cta.primary.link}
                className="btn-shine group inline-flex items-center gap-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg transition-all duration-300 hover:shadow-glow"
              >
                {heroData.cta.primary.text}
                <ArrowDown
                  size={15}
                  className="group-hover:translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href={heroData.cta.secondary.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary border border-border hover:border-border-hover px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg hover:text-text-primary hover:bg-white/[0.02] transition-all duration-300"
              >
                <FileText size={15} />
                {heroData.cta.secondary.text}
              </a>
            </motion.div>
          </motion.div>

          {/* Photo — 2 cols */}
          <motion.div
            variants={item}
            className="md:col-span-2 card-hover rounded-2xl overflow-hidden relative min-h-[240px] sm:min-h-[320px] lg:min-h-[420px]"
          >
            <Image
              src={heroData.photo}
              alt={heroData.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain object-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { value: 4, suffix: "+", label: "Years Experience" },
            { value: 20, suffix: "+", label: "Projects Shipped" },
            { value: 3, suffix: "", label: "Platforms (Web, Mobile, Admin)" },
            { value: 6, suffix: "", label: "Industries Covered" },
          ].map((stat) => (
            <div key={stat.label} className="card-hover rounded-xl p-4 sm:p-5">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text-accent">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] sm:text-xs text-text-tertiary mt-1 sm:mt-1.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
