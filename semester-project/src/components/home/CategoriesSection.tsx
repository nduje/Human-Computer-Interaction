"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import guitars from "../images/categories/guitars.jpg";
import drums from "../images/categories/drums.jpg";
import keys from "../images/categories/keys.jpg";
import orchestra from "../images/categories/orchestra.jpg";
import equipment from "../images/categories/equipment.jpg";
import vinyls from "../images/categories/vinyls.jpg";

const HeadlineSection: FC = () => {
    return (
        <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
            <h1 className="font-bold text-3xl text-base-colors-200 m-12">
            Our Categories
            </h1>
            <section className="grid grid-cols-3 gap-x-36 gap-y-12 m-8 mx-20 text-center align-middle">
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/guitars" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
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
                    <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/keys" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
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
                    <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
                </div>  
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/drums" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
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
                    <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
                </div>
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/orchestra" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={orchestra}
                            alt="orchestra"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Orchestra
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
                </div>
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/equipment" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
                        <Image
                            style={{width: "75px", height: "75px", objectFit: "contain"}}
                            src={equipment}
                            alt="equipment"
                            className="rounded-md"
                        />
                        <h1 className="my-auto text-xl font-semibold">
                            Equipment
                        </h1>
                    </Link>
                    <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
                </div>
                <div className="flex flex-col justify-between text-center align-middle">
                    <Link href="/vinyls" className="flex flex-auto justify-between text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300">
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
                    <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
                </div>
            </section>
        </article>
    );
};
  
  export default HeadlineSection;