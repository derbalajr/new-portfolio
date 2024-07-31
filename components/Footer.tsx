import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px] md:mb-4" id="contact">
      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Discover new <span className="text-lime-400">possibilities</span> for
          outstanding growth!
        </h1>

        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out and let&apos;s discuss how I can contribute to your success.
        </p>
        <a href="mailto:derbalajr@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © {new Date().getFullYear()} Omar Derbala
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10  cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300">
              <a
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group">
                <img
                  src={profile.img}
                  alt={profile.title}
                  width={20}
                  height={20}
                />
                <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
