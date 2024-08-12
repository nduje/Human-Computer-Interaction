"use client";

import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import Navbar from "../Navbar";

const pages: Record<string, `/${string}`> = {
    "Guitars": "/music-instruments/guitars",
    "Keys": "/music-instruments/keyboards-and-piano",
    "Drums": "/music-instruments/drums-and-percussion",
    "Amplifiers": "/audio-equipment/amplifiers",
    "Microphones": "/audio-equipment/microphones",
    "Pedals": "/audio-equipment/pedals",
    "DJ": "/audio-equipment/dj-equipment",
    "Sheet": "/learning-and-resources/sheet-music",
    "Vinyls": "/learning-and-resources/vinyl-records",
  };

const HeadlineSection: FC = () => {
    return (
      <section className="container flex-col text-center align-middle justify-center mx-auto bg-base-colors-100">
        <section className="flex flex-row justify-evenly align-middle items-center">
            <div className="flex flex-row justify-center align-middle text-5xl hover:text-6xl hover:cursor-pointer h-36">
                <Link href="/" className="flex flex-row justify-center align-middle items-center">
                    <div className="flex justify-center align-middle text-base-colors-300 my-10 font-bold">
                        G
                    </div>
                    <div className="flex justify-center align-middle text-base-colors-200 my-10 font-medium">
                        String
                    </div>
                </ Link>
            </div>
        </section>
        <Navbar pages={pages} />
      </section>
    );
};
  
  export default HeadlineSection;