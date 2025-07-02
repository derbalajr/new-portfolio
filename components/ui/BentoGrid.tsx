"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { BackgroundGradientAnimation } from "./GradientBg";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";
import Image from 'next/image';
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["MySQL", "Laravel", "RESTful API"];
  const rightLists = ["Next.js", "React.js", "Redux"];

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = "derbalajr@gmail.com";
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-2xl hover:shadow-lime-400/20 transition-all duration-500 shadow-input dark:shadow-none justify-between flex flex-col space-y-4 glass-card hover:border-lime-400/30 animate-float",
        className
      )}
      style={{
        background: "linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)",
        backdropFilter: "blur(16px)",
      }}>
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <Image
              src={img}
              alt={img}
              width={100}
              height={100}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}>
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              width={100}
              height={100}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}>
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}>
            {title}
          </div>

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 2 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <div className="text-4xl mb-4">🌍</div>
                <p className="text-lg font-semibold">Global Reach</p>
                <p className="text-sm text-gray-400 mt-2">
                  Building solutions for clients worldwide
                </p>
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              {copied && (
                <div className="absolute -bottom-5 right-0 flex items-center justify-center">
                  <div className="text-green-400 text-2xl animate-bounce">
                    ✅
                  </div>
                </div>
              )}

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
