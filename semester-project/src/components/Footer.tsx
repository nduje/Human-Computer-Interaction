"use client"

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

interface FooterProps {
    pages: Record<string, `/${string}`>;
  }

const Footer: FC<FooterProps> = ({ pages }) => {
    const pathName = usePathname();
    
    return (
        <div className="font-roboto flex-col justify-center text-center align-middle bg-base-colors-200 p-3 mt-20">
            <section className="flex md:flex-row justify-around text-center align-middle p-10 flex-col">
                <article className="flex flex-col justify-center text-center align-middle w-64 m-auto">
                    <div className="flex justify-center text-center align-middle text-4xl hover:bg-base-colors-400/25  rounded-tl-3xl rounded-br-3xl mx-12 hover:cursor-pointer">
                        <Link href="/" className="flex flex-row justify-center align-middle items-center">
                            <div className="flex justify-center align-middle text-base-colors-300 font-bold pl-12 py-2">
                                G
                            </div>
                            <div className="flex justify-center align-middle text-base-colors-50 font-normal pr-12 py-2">
                                String
                            </div>
                        </ Link>
                    </div>
                    <h2 className="font-roboto text-base md:text-lg font-thin text-base-colors-100 p-2">
                        Explore a world of <br />instruments, gear, <br />and resources for <br />musicians of all levels.
                    </h2>
                </article>
                <hr className="md:hidden m-8 rounded-full border-primary-beige-100 border-2"></hr>
                <article className="flex-col justify-center text-center md:text-center align-center p-0 w-64 m-auto">
                    <h1 className="font-roboto text-2xl md:text-3xl font-normal text-base-colors-50">
                        Sitemap
                    </h1>
                    <h2 className="font-roboto text-xl md:text-2xl font-thin text-base-colors-300 pb-1 md:pb-3">
                        Explore our pages
                    </h2>
                    <ul className="flex-col gap-2">
                    {Object.entries(pages).map(([name, path]) => (
                        <li key={name}>
                        <Link href={path}>
                        <span className="font-roboto font-light hover:font-normal text-base md:text-xl text-base-colors-50 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl px-4">
                            {name}
                        </span>
                        </Link>
                        </li>
                    ))}
                    </ul>
                </article>
                <hr className="md:hidden m-8 rounded-full border-primary-beige-100 border-2"></hr>
                <article className="flex-col justify-center text-center md:text-left align-center p-0 w-64 m-auto">
                    <h1 className="whitespace-nowrap font-roboto font-normal text-xl md:text-3xl text-base-colors-50 pb-1 md:pb-3">Contact Us</h1>
                    <h2 className="whitespace-nowrap font-roboto font-light text-base md:text-xl text-base-colors-300/75">Duje Nikolić Malora</h2>
                    <h2 className="whitespace-nowrap font-roboto font-extralight text-base md:text-xl text-base-colors-50 pb-1">dnikol00@fesb.hr</h2>
                    <h2 className="whitespace-nowrap font-roboto font-light text-base md:text-xl text-base-colors-300/75">Joško Điko</h2>
                    <h2 className="whitespace-nowrap font-roboto font-extralight text-base md:text-xl text-base-colors-50">jdjiko00@fesb.hr</h2>
                </article>
            </section>
            <h3 className="font-thin text-sm text-base-colors-100/50">Copyright © 2023-2024 All rights reserved.</h3>
        </div>
    )
};

export default Footer