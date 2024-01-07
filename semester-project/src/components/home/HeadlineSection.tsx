"use client";

import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import Navbar from "../Navbar";

const pages: Record<string, `/${string}`> = {
    "Home": "/",
    "Music\nInstruments": "/music-instruments/guitars",
    "Audio\nEquipment": "/audio-equipment/amplifiers",
    "Learning and Resources": "/learning-and-resources/sheet-music",
    "Contact and Support": "/contact-and-support",
    "Login": "/login"
  };

const HeadlineSection: FC = () => {
    return (
      <section className="container flex-col text-center align-middle justify-center mx-auto pb-5 bg-[url('../components/images/background.png')] bg-cover bg-left md:bg-center">
        <Navbar pages={pages} />
        <article className="container flex-col text-center self-start align-middle justify-center md:left-0 md:p-10 md:mt-5 md:mb-5 md:w-1/2">
            <h1 className="font-pacifico text-2xl md:text-7xl text-primary-brown-900 mb-0 md:mb-6 p-0 md:p-3">
                Unlock Your Music Journey
            </h1>
            <h2 className="font-roboto text-base md:text-4xl font-medium text-primary-brown-700 p-2">
                Explore a world of instruments, gear, <br /> and resources for musicians of all levels.
            </h2>
            <Link href="/login">
                <div className="flex justify-center items-center align-middle">
                    <h3 className="bg-primary-brown-900 rounded-full font-roboto text-base md:text-2xl font-semibold text-primary-beige-100 w-32 md:w-48 md:m-5 px-4 md:px-8 py-2 md:py-4 hover:cursor-pointer hover:bg-primary-brown-800">
                        Join Now
                    </h3>
                </div>
            </Link>
        </article>
      </section>
    );
};
  
  export default HeadlineSection;