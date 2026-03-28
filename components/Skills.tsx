"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data";
import { Zap } from "lucide-react";
import { useCardSpotlight } from "@/hooks/useMousePosition";

function CardSpotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pos, hovering, onMouseMove, onMouseEnter, onMouseLeave } = useCardSpotlight();

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.07), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-2"
      >
        <Zap size={18} className="text-accent" />
        <span className="text-accent text-sm font-mono">Tech Stack</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
          Skills & <span className="gradient-text-accent">Expertise</span>
        </h2>
        <p className="mt-3 text-text-secondary text-base max-w-lg">
          Technologies and architectural patterns I use to build production
          systems.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <CardSpotlight className="card-hover rounded-xl p-6 h-full">
              <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
            </CardSpotlight>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
