"use client";

import { motion } from "framer-motion";
import { experience } from "@/data";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-2"
      >
        <Briefcase size={18} className="text-accent" />
        <span className="text-accent text-sm font-mono">Career</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
          Work <span className="gradient-text-accent">Experience</span>
        </h2>
        <p className="mt-3 text-text-secondary text-sm sm:text-base">
          4+ years building production systems across industries.
        </p>
      </motion.div>

      <div className="mt-10 sm:mt-14 relative">
        {/* Timeline line */}
        <div className="absolute left-[5px] sm:left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />

        <div className="space-y-2">
          {experience.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative pl-7 sm:pl-10 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-5 sm:top-6 w-[11px] h-[11px] sm:w-[15px] sm:h-[15px] rounded-full border-2 border-border bg-bg group-hover:border-accent transition-colors duration-300">
                <div className="absolute inset-1 rounded-full bg-accent/0 group-hover:bg-accent/60 transition-colors duration-300" />
              </div>

              <div className="card-hover rounded-xl p-4 sm:p-5 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-text-primary group-hover:text-white transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
                      {role.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-[10px] sm:text-xs text-text-tertiary font-mono">
                      {role.period}
                    </span>
                    <span className="pill-accent text-[10px] sm:text-xs">
                      {role.type}
                    </span>
                  </div>
                </div>

                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {role.description}
                </p>

                {role.stack.length > 0 && (
                  <div className="mt-2 sm:mt-3 flex flex-wrap gap-x-2.5 sm:gap-x-3 gap-y-1">
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-[11px] font-mono text-text-tertiary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
