"use client";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

// import Lottie from "lottie-react";

import { cn } from "@/lib/utils";


import { BackgroundGradientAnimation } from "./GradientBg";
// import GridGlobe from "./GridGlobe";
import animationData from "@/data/confetti.json";
import MagicButton from "../MagicButton";
import dynamic from "next/dynamic";

const GridGlobe = dynamic(() => import("./GridGlobe"), { ssr: false });
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  //   remove unecessary things here
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
  const techStack = [
    { name: "React", icon: "https://skillicons.dev/icons?i=react" },
    { name: "Next.js", icon: "https://skillicons.dev/icons?i=next" },
    { name: "Vue.js", icon: "https://skillicons.dev/icons?i=vue" },
    { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
    { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
    { name: "Express", icon: "https://skillicons.dev/icons?i=express" },
    { name: "FastAPI", icon: "https://skillicons.dev/icons?i=fastapi" },
    { name: "Go", icon: "https://skillicons.dev/icons?i=go" },
    { name: "SwiftUI", icon: "https://developer.apple.com/assets/elements/icons/swiftui/swiftui-256x256_2x.png" },
    { name: "React Native", icon: "https://skillicons.dev/icons?i=react" },
    { name: "Android Studio", icon: "https://skillicons.dev/icons?i=androidstudio" },
    { name: "Flutter", icon: "https://skillicons.dev/icons?i=flutter" },
    { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
    { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
    { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
    { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
    { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" },
    { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
    { name: "Postman", icon: "https://skillicons.dev/icons?i=postman" },
    { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
    { name: "Kubernetes", icon: "https://skillicons.dev/icons?i=kubernetes" },
    { name: "Vercel", icon: "https://skillicons.dev/icons?i=vercel" },
    { name: "Jenkins", icon: "https://skillicons.dev/icons?i=jenkins" },
    { name: "GitHub Actions", icon: "https://skillicons.dev/icons?i=githubactions" },
    { name: "n8n", icon: "https://avatars.githubusercontent.com/u/52133374?s=280&v=4" },
    { name: "AWS", icon: "https://skillicons.dev/icons?i=aws" },
    { name: "GCP", icon: "https://skillicons.dev/icons?i=gcp" },
    { name: "ML Kit", icon: "https://developers.google.com/static/ml-kit/images/homepage/hero.png" },
    { name: "Tesseract", icon: "https://miro.medium.com/0*LaOhMRJBLnR693Aq.png" },
    { name: "Vision API", icon: "https://developer.apple.com/assets/elements/icons/volumetric-api/volumetric-api-256x256_2x.png" },
    { name: "OpenCV", icon: "https://skillicons.dev/icons?i=opencv" },
    { name: "LangChain", icon: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/langchain-color.png" },
  ];

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = "kritchanat.dev@gmail.com";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        // remove p-4 rounded-3xl dark:bg-black dark:border-white/[0.2] bg-white  border border-transparent, add border border-white/[0.1] overflow-hidden relative
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        //   add these two
        //   you can generate the color from here https://cssgradient.io/
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* add img divs */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
            } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              //   width={220}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          // add background animation , remove the p tag
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-5"
          )}
        >
          {/* change the order of the title and des, font-extralight, remove text-xs text-neutral-600 dark:text-neutral-300 , change the text-color */}
          <div className="font-sans font-extralight md:max-w-64 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10"
               style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
          >
            {description}
          </div>
          {/* add text-3xl max-w-96 , remove text-neutral-600 dark:text-neutral-300*/}
          {/* remove mb-2 mt-2 */}
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
          >
            {title}
          </div>

          {/* for the github 3d globe */}
          {id === 2 && <GridGlobe />}

          {/******** Tech stack list div with grid layout ********/}
          {id === 3 && (
            <div className="flex gap-1 w-full mt-4 justify-center">
                 {/* Grid for Tech Stack */}
                 <div className="grid grid-cols-5 md:grid-cols-8 gap-3 md:gap-4 p-2 justify-items-center">
                     {techStack.map((item, i) => (
                         <div key={i} className="group relative">
                             <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-[#10132E] border border-white/[0.1] rounded-xl hover:border-violet-500 transition-colors duration-300 cursor-pointer shadow-lg">
                                  <img src={item.icon} alt={item.name} className="w-6 h-6 md:w-9 md:h-9 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                             </div>
                             <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 font-bold border border-white/20">
                                {item.name}
                             </span>
                         </div>
                     ))}
                 </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              {/* button border magic from tailwind css buttons  */}
              {/* add rounded-md h-8 md:h-8, remove rounded-full */}
              {/* remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 */}
              {/* add handleCopy() for the copy the text */}
              <div
                className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"
                  }`}
              >
                {/* <img src="/confetti.gif" alt="confetti" /> */}
                <Lottie 
                  animationData={animationData}
                  loop={copied}
                  autoplay={copied}
                  style={{ height: 200, width: 400 }}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice"
                  }}
                />
              </div>

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
