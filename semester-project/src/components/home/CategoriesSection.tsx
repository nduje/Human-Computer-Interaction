"use client";

import { FC } from "react";
import Image from "next/image";
import guitars from "../images/guitars.jpg";
import drums from "../images/drums.jpg";
import keys from "../images/keys.jpg";
import amplifiers from "../images/amplifiers.jpg";
import microphones from "../images/microphones.jpg";
import pedals from "../images/pedals.jpg";
import dj from "../images/dj.jpg";
import sheet from "../images/sheet.jpg";
import vinyls from "../images/vinyls.jpg";

const HeadlineSection: FC = () => {
    return (
      <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto">
        <h1 className="font-bold text-3xl text-base-colors-200 m-12">
          Our Categories
        </h1>
        <section className="flex flex-row justify-evenly text-center align-middle h-3/4">
            <section className="flex flex-col justify-evenly text-center align-middle h-full w-1/4 m-2 p-2">
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={guitars}
                            alt="guitars"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Guitars
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={drums}
                            alt="drums"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Drums
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={keys}
                            alt="keys"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Keys
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
            </section>
            <section className="flex flex-col justify-evenly text-center align-middle w-1/4 m-2 p-2">
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={amplifiers}
                            alt="amplifiers"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Amplifiers
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={microphones}
                            alt="microphones"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Microphones
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={pedals}
                            alt="pedals"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Pedals
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>       
            </section>
            <section className="flex flex-col justify-evenly text-center align-middle w-1/4 m-2 p-2">
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={dj}
                            alt="dj"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            DJ
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={sheet}
                            alt="sheet"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Sheet
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <div className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            width={75}
                            height={75}
                            src={vinyls}
                            alt="vinyls"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Vinyls
                        </h1>
                    </div>
                    <hr className="border-[1.5px] w-full border-base-colors-100 my-4"></hr>
                </div>  
            </section>
        </section>
      </article>
    );
};
  
  export default HeadlineSection;