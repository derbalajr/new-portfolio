import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./ui/MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { heroData } from "@/data";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="pb-16 md:pb-20 pt-24 md:pt-36">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="lime" />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="flex justify-center relative my-16 md:my-20 z-10">
        <div className="max-w-[95vw] sm:max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center px-4">
                  <div className="relative mb-8 md:mb-12 group">
  {/* Animated Ring */}
  <div className="absolute inset-0 rounded-full animate-spin-slow">
    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full bg-gradient-to-r from-lime-400 via-blue-500 to-purple-500 opacity-75 blur-sm"></div>
  </div>
  
  {/* Main Border with Glow */}
  <div className="absolute inset-0 rounded-full p-[4px] modern-gradient group-hover:from-purple-600 group-hover:via-lime-400 group-hover:to-blue-500 transition-all duration-500 shadow-2xl animate-pulse-glow">
    {/* Inner glow */}
    <div className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-gradient-to-br from-black/20 via-transparent to-black/20 backdrop-blur-sm"></div>
  </div>
  
  {/* Profile Image */}
  <Image
    src={heroData.profileImg}
    alt={`${heroData.name} profile`}
    width={256}
    height={256}
    className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full object-cover border-2 border-white/50 shadow-2xl group-hover:scale-110 transition-all duration-500 z-10"
    priority
  />
  
  {/* Floating particles */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 primary-bg rounded-full animate-ping opacity-75"></div>
    <div className="absolute top-3/4 right-1/4 w-1 h-1 secondary-text rounded-full animate-pulse opacity-60"></div>
    <div className="absolute bottom-1/4 left-3/4 w-1 h-1 sm:w-1.5 sm:h-1.5 accent-text rounded-full animate-bounce opacity-50"></div>
  </div>
</div>
          <h3 className="uppercase tracking-widest text-xs sm:text-sm text-center text-blue-100 max-w-85 animate-fade-in opacity-80 hover:opacity-100 transition-opacity duration-300 mb-4 md:mb-6 px-4">
            {heroData.tagline}
          </h3>

          <div>
            <div className="my-4 md:my-6">
              <div className="dark:text-white text-black">
                <div className="text-center space-y-3 md:space-y-4">
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-wide px-2">
                    <span className="dark:text-white text-black">I&apos;m </span>
                    <span className="primary-text glow-text">
                      Omar Derbala
                    </span>
                  </h1>
                  <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-medium text-gray-300 leading-relaxed max-w-4xl mx-auto px-4">
                    An Egyptian Senior Full Stack Developer merging tech with Pharaohs&apos; majesty
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center md:tracking-wider mb-6 md:mb-8 text-sm md:text-base lg:text-lg text-gray-400 hover:text-gray-200 transition-colors duration-300 max-w-2xl mx-auto leading-relaxed px-4">
            {heroData.description}
          </p>

          <a href="#projects">
            <MagicButton
              title="Show My Work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
