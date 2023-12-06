"use client"

import { FC } from "react";
import Image from "next/image";
import LogoIcon from "./images/violin_logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

interface FooterProps {
    pages: Record<string, `/${string}`>;
  }

const Footer: FC<FooterProps> = ({ pages }) => {
    const pathName = usePathname();
    
    return (
        <div className="font-roboto flex-col justify-center text-center align-middle bg-secondary-brown-900 p-3">
            <section className="flex justify-around text-center align-middle p-10">
                <article className="flex-col justify-center text-center align-middle w-64">
                    <div className="flex justify-center text-center align-middle">
                        <Image 
                            src={LogoIcon}
                            alt={"logo"}  
                            width={125}
                            height={125}   
                            style={{transform: 'rotate(270deg)'}}    
                        />
                    </div>
                    <h2 className="font-roboto text-lg font-medium text-primary-beige-50 p-2">
                        Explore a world of <br />instruments, gear, <br />and resources for <br />musicians of all levels.
                    </h2>
                </article>
                <article className="flex-col justify-center text-left align-center p-0 w-64">
                    <h1 className="font-roboto text-4xl font-extrabold text-primary-beige-50">
                        Sitemap
                    </h1>
                    <h2 className="font-roboto text-2xl font-light text-primary-beige-100 pb-3">
                        Explore our pages
                    </h2>
                    <ul className="flex-col gap-2">
                    {Object.entries(pages).map(([name, path]) => (
                        <li key={name}>
                        <Link href={path}>
                        <span className="font-roboto font-medium text-xl text-primary-beige-50 hover:text-primary-beige-100">
                            {name}
                        </span>
                        </Link>
                        </li>
                    ))}
                    </ul>
                </article>
                <article className="flex-col justify-center text-left align-center p-0 w-64">
                    <h1 className="whitespace-nowrap font-roboto font-extrabold text-4xl text-primary-beige-50 pb-8">Contact Us</h1>
                    <h2 className="whitespace-nowrap font-roboto font-bold text-2xl text-primary-beige-50">Duje Nikolić Malora</h2>
                    <h2 className="whitespace-nowrap font-roboto font-normal text-2xl text-primary-beige-50 pb-2">dnikol00@fesb.hr</h2>
                    <h2 className="whitespace-nowrap font-roboto font-bold text-2xl text-primary-beige-50">Joško Điko</h2>
                    <h2 className="whitespace-nowrap font-roboto font-normal text-2xl text-primary-beige-50">jdjiko00@fesb.hr</h2>
                </article>
            </section>
            <h3 className="font-normal text-sm text-primary-beige-100">Copyright © 2023. All rights reserved.</h3>
        </div>
    )
};

export default Footer