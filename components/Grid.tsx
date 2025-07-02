import React from "react";
import { skillCategories } from "@/data";
import Image from "next/image";

const Grid = () => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          text: 'primary-text',
          border: 'border-green-500/30',
          bg: 'bg-gradient-to-br from-green-500/10 to-emerald-500/5'
        };
      case 'secondary':
        return {
          text: 'secondary-text',
          border: 'border-emerald-500/30',
          bg: 'bg-gradient-to-br from-emerald-500/10 to-cyan-500/5'
        };
      case 'accent':
        return {
          text: 'accent-text',
          border: 'border-cyan-500/30',
          bg: 'bg-gradient-to-br from-cyan-500/10 to-green-500/5'
        };
      default:
        return {
          text: 'text-white',
          border: 'border-white/20',
          bg: 'bg-gradient-to-br from-gray-500/10 to-gray-600/5'
        };
    }
  };

  const achievements = [
    { icon: "🎓", title: "Continuous Learner", desc: "Always Exploring New Tech", color: "purple" },
    { icon: "🚀", title: "Innovation Driven", desc: "Turning Ideas into Reality", color: "green" },
    { icon: "🤝", title: "Team Player", desc: "Collaborative & Mentoring", color: "emerald" },
    { icon: "🔧", title: "Solution Architect", desc: "End-to-End Thinking", color: "cyan" }
  ];

  const personalStats = [
    { label: "Years of Experience", value: "3+", icon: "⚡" },
    { label: "Projects Delivered", value: "20+", icon: "🎯" },
    { label: "Technologies Mastered", value: "15+", icon: "🛠️" },
    { label: "Lines of Code", value: "100K+", icon: "💻" }
  ];

  return (
    <section id="about" className="py-20">
      {/* Hero Introduction */}
      <div className="relative mb-20 max-w-7xl mx-auto px-4 sm:px-5">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/5 to-cyan-500/5 rounded-3xl blur-3xl"></div>
        <div className="relative glass-card rounded-3xl p-6 sm:p-8 md:p-12 border border-green-500/20">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Header */}
            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                About <span className="primary-text">Me</span>
              </h1>
              <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 sm:mb-8"></div>
            </div>
            
            {/* Content */}
            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                My journey began with a simple fascination for how technology could solve real-world problems. 
                From building my first website during university to now architecting 
                <span className="primary-text font-semibold"> enterprise-level systems</span>, 
                I&apos;ve always believed in the power of code to create meaningful change.
              </p>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                What sets me apart is my unique blend of 
                <span className="secondary-text font-semibold"> technical expertise and business acumen</span>. 
                I don&apos;t just write code—I craft solutions that drive growth, streamline operations, 
                and deliver exceptional user experiences across diverse industries.
              </p>
              
              <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, mentoring junior developers, 
                or contributing to open-source projects. I believe in continuous learning and sharing knowledge 
                to help the developer community grow stronger together.
              </p>
            </div>

            {/* Upwork Success Highlight */}
            <div className="mb-8 sm:mb-12">
              <div className="glass-card rounded-3xl p-4 sm:p-6 md:p-8 max-w-5xl mx-auto border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-blue-500/5 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/20">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    <span className="primary-text">Upwork</span> Success Story
                  </h3>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold primary-text mb-1">334+</div>
                      <div className="text-xs sm:text-sm text-gray-400">Hours Worked</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-green-500/30"></div>
                    <div className="block sm:hidden w-12 h-px bg-green-500/30"></div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold secondary-text mb-1">5.0</div>
                      <div className="text-xs sm:text-sm text-gray-400">Rating</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-green-500/30"></div>
                    <div className="block sm:hidden w-12 h-px bg-green-500/30"></div>
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-bold accent-text mb-1">🌟</div>
                      <div className="text-xs sm:text-sm text-gray-400">Rising Talent</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-2 sm:gap-0">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg sm:text-xl">⭐</span>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 sm:ml-3">5.0 out of 5 • Recent Client Review</span>
                  </div>
                  
                  <blockquote className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4 italic text-center">
                    &ldquo;Omar is a professional PHP developer with a good coding skills. He knows his way in complex tasks. 
                    Hoping to have a long term collaboration with him.&rdquo;
                  </blockquote>
                  
                  <div className="text-center">
                    <div className="text-white font-semibold text-sm sm:text-base">Jalal Ouissal</div>
                    <div className="text-xs sm:text-sm text-gray-400">Apr 12, 2025 • Upwork Client</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-2xl sm:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-2">{achievement.title}</h4>
                  <p className="text-xs text-gray-400">{achievement.desc}</p>
                </div>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a 
                href="#projects"
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25 cursor-pointer text-sm sm:text-base"
              >
                View My Work
              </a>
              <a 
                href="/Omar_Derbala_Senior_Backend.pdf"
                download="Omar_Derbala_Senior_Backend.pdf"
                className="px-4 sm:px-6 py-3 glass-card border border-green-500/30 rounded-xl font-semibold text-green-300 hover:scale-105 hover:border-green-500/50 transition-all duration-300 cursor-pointer text-sm sm:text-base"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-20 max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            By The <span className="primary-text">Numbers</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here&apos;s a glimpse into my professional journey and the impact I&apos;ve made
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {personalStats.map((stat, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold primary-text mb-2 group-hover:secondary-text transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Technical <span className="primary-text">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies and skills I&apos;ve mastered throughout my career journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-6">
          {skillCategories.map((category) => {
            const colors = getColorClasses(category.color);
            return (
              <div
                key={category.id}
                className={`${category.className} glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-300 ${colors.border} ${colors.bg} group`}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-2xl font-bold ${colors.text} mb-3 group-hover:scale-105 transition-transform duration-300`}>
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border ${colors.border} ${colors.bg} text-gray-200 hover:${colors.text} hover:scale-105 transition-all duration-200 cursor-default`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Grid;
