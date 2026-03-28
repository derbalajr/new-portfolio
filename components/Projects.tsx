"use client";

import { motion } from "framer-motion";
import { projects } from "@/data";
import { ArrowUpRight, Layers } from "lucide-react";
import Image from "next/image";
import { useCardSpotlight } from "@/hooks/useMousePosition";

function BrowserMockup({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="rounded-lg overflow-hidden border border-border bg-bg-secondary">
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-border bg-bg-tertiary">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]/80" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]/80" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <div className="flex-1 mx-2 sm:mx-4">
          <div className="bg-bg/60 rounded-md px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] text-text-tertiary font-mono text-center truncate">
            {alt.toLowerCase().replace(/\s+/g, "-").replace(/[—]/g, "")}
          </div>
        </div>
      </div>
      <div className="relative aspect-[2/1] sm:aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 500px" className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}

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
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.06), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Projects() {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-2"
      >
        <Layers size={18} className="text-accent" />
        <span className="text-accent text-sm font-mono">Featured Work</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
          Projects I&apos;ve{" "}
          <span className="gradient-text-accent">Built</span>
        </h2>
        <p className="mt-3 text-text-secondary text-base max-w-lg">
          Enterprise systems, platforms, and tools — each solving real problems
          at scale.
        </p>
      </motion.div>

      {/* Featured project — full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-12"
      >
        <CardSpotlight className="card-hover rounded-xl">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-5 sm:p-7 lg:p-9 flex flex-col justify-center order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="pill-accent w-fit">{featured.role}</span>
                {"companyLogo" in featured && featured.companyLogo && (
                  <Image src={featured.companyLogo as string} alt="" width={20} height={20} className="rounded-sm invert" style={{ width: "auto", height: "auto" }} />
                )}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {featured.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featured.impact.map((i) => (
                  <span key={i} className="pill">{i}</span>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-border-subtle flex flex-wrap gap-x-3 gap-y-1">
                {featured.stack.map((tech) => (
                  <span key={tech} className="text-[11px] font-mono text-text-tertiary">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 sm:p-5 order-1 lg:order-2">
              {featured.image && (
                <BrowserMockup src={featured.image} alt={featured.title} priority />
              )}
            </div>
          </div>
        </CardSpotlight>
      </motion.div>

      {/* Rest of projects — 2-col grid */}
      <div className="mt-5 grid md:grid-cols-2 gap-5">
        {rest.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <CardSpotlight className="card-hover rounded-xl h-full flex flex-col">
              {project.image && (
                <div className="p-3 sm:p-4 pb-0">
                  <BrowserMockup src={project.image} alt={project.title} />
                </div>
              )}

              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-text-primary group-hover:text-white transition-colors leading-snug">
                    {project.title}
                  </h3>
                  {"link" in project && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-text-tertiary hover:text-accent transition-colors p-2.5 -m-1.5"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="pill-accent w-fit">{project.role}</span>
                  {"companyLogo" in project && project.companyLogo && (
                    <Image src={project.companyLogo as string} alt="" width={18} height={18} className="rounded-sm invert" style={{ width: "auto", height: "auto" }} />
                  )}
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.impact.map((item) => (
                    <span key={item} className="pill">{item}</span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border-subtle flex flex-wrap gap-x-3 gap-y-1">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-[11px] font-mono text-text-tertiary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardSpotlight>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
