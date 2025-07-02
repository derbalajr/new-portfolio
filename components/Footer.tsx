import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full pb-8 md:pb-10 mb-[80px] md:mb-4 px-4" id="contact">
      <div className="flex flex-col items-center glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 section-glow">
        <h1 className="heading lg:max-w-[45vw] mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center px-2">
          Ready to turn your ideas into <span className="primary-text">reality</span>?
        </h1>

        <p className="text-gray-300 md:mt-4 my-4 md:my-5 text-center max-w-2xl leading-relaxed text-sm md:text-base px-2">
          Let&apos;s collaborate and build something amazing together. I&apos;m here to help bring your vision to life with cutting-edge technology and creative solutions.
        </p>
        <a href="mailto:derbalajr@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-12 md:mt-16 lg:mt-20 md:flex-row flex-col justify-between items-center gap-4 md:gap-6 pt-6 md:pt-8 border-t border-white/10">
        <p className="text-sm md:text-base md:font-normal font-light text-gray-400 text-center md:text-left">
          Copyright © {new Date().getFullYear()} Omar Derbala
        </p>
        <div className="flex items-center gap-4 md:gap-6">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 md:w-12 md:h-12 cursor-pointer flex justify-center items-center glass-card rounded-xl border border-white/10 hover:border-lime-400/50 transition-all duration-300 hover:scale-110 animate-pulse-glow">
              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group">
                <Image
                  src={profile.img}
                  alt={profile.title}
                  width={24}
                  height={24}
                  className="transition-transform duration-300 group-hover:scale-110 w-5 h-5 md:w-6 md:h-6"
                />
                <span className="absolute bottom-full mb-2 md:mb-3 left-1/2 transform -translate-x-1/2 w-max px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm text-white bg-black/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-lime-400/30">
                  {profile.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
