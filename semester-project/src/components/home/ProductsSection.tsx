"use client";

import Link from "next/link";
import { FC } from "react";
import Image from "next/image";
import drumsImage from "../images/drums.png";
import microphoneImage from "../images/microphone.png";
import vinylsImage from "../images/vinyls.png";

const ProductsSection: FC = () => {
    return (
      <section className="bg-primary-white-300 container flex-col text-center align-middle justify-evenly px-32 py-16">
        <div className="flex justify-evenly items-center align-middle mx-auto mb-12">
            <article>
            <h1 className="font-inter text-5xl font-normal text-secondary-purple-900 py-3">
                Music Instruments
            </h1>
            <h2 className="font-inter text-2x font-normal text-secondary-purple-900 py-2">
                Discover Your Rhythm: Unleash the Beat Within
            </h2>
            <Link href="/music-instruments">
                <div className="flex justify-center items-center align-middle">
                    <h3 className="bg-primary-violet-900 rounded-md font-inter text-xl font-bold text-primary-violet-50 w-50 m-5 px-8 py-4 hover:cursor-pointer hover:bg-primary-violet-700">
                        Shop Drums
                    </h3>
                </div>
            </Link>
            </article>
            <Image 
                src={drumsImage}
                alt={"drums"}   
                style={{
                    borderRadius: "5px"
                }}          
            />
        </div>
        <div className="flex justify-evenly items-center align-middle mx-auto mb-12">
            <Image 
                src={microphoneImage}
                alt={"microphone"}   
                style={{
                    borderRadius: "5px"
                }}          
            />
            <article>
            <h1 className="font-inter text-5xl font-normal text-secondary-purple-900 py-3">
                Audio Equipment
            </h1>
            <h2 className="font-inter text-2x font-normal text-secondary-purple-900 py-2">
                Elevate Your Sound: Find Your Perfect Voice
            </h2>
            <Link href="/audio-equipment">
                <div className="flex justify-center items-center align-middle">
                    <h3 className="bg-primary-violet-900 rounded-md font-inter text-xl font-bold text-primary-violet-50 w-50 m-5 px-8 py-4 hover:cursor-pointer hover:bg-primary-violet-700">
                        Shop Microphones
                    </h3>
                </div>
            </Link>
            </article>
        </div>
        <div className="flex justify-evenly items-center align-middle mx-auto">
            <article>
            <h1 className="font-inter text-5xl font-normal text-secondary-purple-900 py-3">
                Learning and Resources
            </h1>
            <h2 className="font-inter text-2x font-normal text-secondary-purple-900 py-2">
                Spin the Classics: Vintage Vinyl, Timeless Grooves
            </h2>
            <Link href="/learning-and-resources/sheet-music">
                <div className="flex justify-center items-center align-middle">
                    <h3 className="bg-primary-violet-900 rounded-md font-inter text-xl font-bold text-primary-violet-50 w-50 m-5 px-8 py-4 hover:cursor-pointer hover:bg-primary-violet-700">
                        Shop Vinyl Records
                    </h3>
                </div>
            </Link>
            </article>
            <Image 
                src={vinylsImage}
                alt={"vinyls"}   
                style={{
                    borderRadius: "5px"
                }}          
            />
        </div>
      </section>
    );
};
  
  export default ProductsSection;