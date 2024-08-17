"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import guitars from "../images/categories/guitars.jpg";
import drums from "../images/categories/drums.jpg";
import keys from "../images/categories/keys.jpg";
import amplifiers from "../images/categories/amplifiers.jpg";
import microphones from "../images/categories/microphones.jpg";
import pedals from "../images/categories/pedals.jpg";
import dj from "../images/categories/dj.jpg";
import sheet from "../images/categories/sheet.jpg";
import vinyls from "../images/categories/vinyls.jpg";

const HeadlineSection: FC = () => {
    return (
      <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto">
        <h1 className="font-bold text-3xl text-base-colors-200 m-12">
          Our Categories
        </h1>
        <section className="flex flex-row justify-evenly text-center align-middle h-3/4">
            <section className="flex flex-col justify-evenly text-center align-middle h-full w-1/4 m-2 p-2">
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="music-instruments/guitars" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={guitars}
                            alt="guitars"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Guitars
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="music-instruments/keyboards-and-piano" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={keys}
                            alt="keys"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Keys
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="music-instruments/drums-and-percussion" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={drums}
                            alt="drums"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Drums
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
            </section>
            <section className="flex flex-col justify-evenly text-center align-middle w-1/4 m-2 p-2">
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/audio-equipment/amplifiers" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={amplifiers}
                            alt="amplifiers"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Amplifiers
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/audio-equipment/microphones" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={microphones}
                            alt="microphones"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Microphones
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/audio-equipment/pedals" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={pedals}
                            alt="pedals"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Pedals
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>       
            </section>
            <section className="flex flex-col justify-evenly text-center align-middle w-1/4 m-2 p-2">
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/audio-equipment/dj-equipment" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={dj}
                            alt="dj"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            DJ
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="resources-and-learning/sheet-music" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={sheet}
                            alt="sheet"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Sheet
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="resources-and-learning/vinyl-records" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={vinyls}
                            alt="vinyls"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Vinyls
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
            </section>
        </section>
      </article>
    );
};
  
  export default HeadlineSection;