import { workExperience } from "@/data";
import React from "react";
import Image from "next/image";

function Experience() {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'part-time':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'freelance':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'volunteer':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'education':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="py-16 md:py-20 px-4" id="experiences">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="heading mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
          My Professional <span className="primary-text">Journey</span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed px-2">
          From volunteer leadership to senior engineering roles, here&apos;s how I&apos;ve grown 
          through diverse experiences in tech and project management.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto px-2 md:px-4">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-emerald-500 to-cyan-500 rounded-full opacity-30"></div>
        
        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16">
          {workExperience.map((card, index) => (
            <div key={card.id} className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 md:border-4 border-black-100 z-10 shadow-lg animate-pulse-glow"></div>
              
              {/* Content Card */}
              <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8 xl:pr-16' : 'lg:pl-8 xl:pl-16'} px-2 md:px-0`}>
                <div className="group glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 border border-green-500/20 hover:border-green-500/40">
                  
                  {/* Card Header */}
                  <div className="flex items-start gap-3 md:gap-6 mb-4 md:mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center overflow-hidden p-2 md:p-3">
                        <Image
                          src={card.thumbnail}
                          alt={card.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 filter brightness-90 hover:brightness-110"
                        />
                      </div>
                      {/* Floating Badge */}
                      <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-black-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{workExperience.length - index}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-2 group-hover:primary-text transition-colors duration-300 leading-tight">
                        {card.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        <span className="px-2 md:px-3 py-1 text-xs font-semibold bg-green-500/15 text-green-300 rounded-full border border-green-500/25">
                          {(card as any).period}
                        </span>
                        <span className={`px-2 md:px-3 py-1 text-xs font-semibold rounded-full border ${getTypeColor((card as any).type)}`}>
                          {(card as any).type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                    {card.desc}
                  </p>
                  
                  {/* Bottom Accent Line */}
                  <div className="mt-4 md:mt-6 h-1 w-full bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              
              {/* Mobile Timeline Connector */}
              <div className="lg:hidden w-full flex justify-center my-4">
                <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
        

      </div>
      
      {/* Career Stats */}
      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto px-4">
        <div className="text-center glass-card rounded-2xl p-4 md:p-6 hover:scale-105 transition-all duration-300">
          <div className="text-2xl md:text-3xl font-bold primary-text mb-2">6</div>
          <div className="text-xs md:text-sm text-gray-400">Career Milestones</div>
        </div>
        <div className="text-center glass-card rounded-2xl p-4 md:p-6 hover:scale-105 transition-all duration-300">
          <div className="text-2xl md:text-3xl font-bold secondary-text mb-2">7+</div>
          <div className="text-xs md:text-sm text-gray-400">Years Journey</div>
        </div>
        <div className="text-center glass-card rounded-2xl p-4 md:p-6 hover:scale-105 transition-all duration-300">
          <div className="text-2xl md:text-3xl font-bold accent-text mb-2">5</div>
          <div className="text-xs md:text-sm text-gray-400">Different Industries</div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
