"use client";

import React, { useState } from "react";
import { projects } from "@/data";
import { FaLocationArrow, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

const RecentProjects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              Featured <span className="primary-text">Projects</span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-8"></div>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-lg">
              Discover my latest work where innovative technology meets exceptional design. 
              Each project represents a unique solution crafted with precision and passion.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="flex-1 relative group">
                {/* Browser Address Bar */}
                <div className="bg-gray-800 border border-gray-700 rounded-t-xl px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
                  {/* Browser Dots */}
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  {/* Address Bar */}
                  <div className="flex-1 mx-1 sm:mx-4 min-w-0">
                    <div className="bg-gray-700 rounded-lg px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-300 font-normal truncate">
                      {project.link}
                    </div>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-b-xl border border-gray-700 border-t-0 shadow-2xl">
                  {/* Project Screenshot - Straight Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Hover overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-0"
                    }`}>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex justify-center">
                          <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-all duration-300">
                            <FaExternalLinkAlt className="text-sm" />
                            <span className="text-sm font-medium">View Live Site</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 hover:primary-text transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {project.des}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-3 tracking-wider uppercase">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.iconLists.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 px-4 py-2 glass-card border border-green-500/20 rounded-xl hover:border-green-500/40 hover:scale-105 transition-all duration-300"
                      >
                        <Image
                          src={tech}
                          alt="Technology"
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white font-semibold hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    View Live Site
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-32"
        >
        </motion.div>
      </div>
    </section>
  );
};

export default RecentProjects;
