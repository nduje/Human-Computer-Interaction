"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { cn } from "@/lib/utils";
import heroImage from "@/components/images/sheets-and-violin.png";
import Image, { StaticImageData } from "next/image";

const baseClass =
  "uppercase whitespace-nowrap font-roboto-condensed text-base px-5 py-3 rounded-sm text-brand-purple-900 hover:bg-brand-purple-200";

const HeadlineSection: FC = () => {
    return (
      <section className="container flex-col text-center align-middle justify-center mx-32 mt-2">
        <article className="container flex-col text-center align-middle justify-center mx-auto mb-5">
            <h1 className="font-inter text-7xl font-semibold text-secondary-purple-900 p-3">
                Unlock Your Music Journey
            </h1>
            <h2 className="font-inter text-4xl font-normal text-secondary-purple-900 p-2">
                Explore a world of instruments, gear, <br /> and resources for musicians of all levels.
            </h2>
            {/* <p className="font-inter text-2xl font-light text-secondary-purple-900 p-1">
            Core mission of the music shop, which is to serve as a portal for musicians of every skill level, 
            enabling them to commence their musical odyssey while equipping them with the necessary instruments 
            and resources to convey their artistic creativity and deep love for music.
            </p> */}
            <div className="flex justify-center items-center align-middle">
                <h3 className="bg-primary-violet-900 rounded-md font-inter text-xl font-bold text-primary-violet-50 w-48 m-5 px-8 py-4 hover:cursor-pointer hover:bg-primary-violet-700">
                    Join Now
                </h3>
            </div>
        </article>
        <div className="flex justify-center items-center align-middle my-5">
            <Image 
                src={heroImage}
                alt={"sheets-and-violin"}   
                style={{
                    borderRadius: "5px",
                    opacity: "90%"
                }}          
            />
        </div>
      </section>
    );
};
  
  export default HeadlineSection;