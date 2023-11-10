"use client"

import { FC } from "react";
import LogoIcon from "./icons/LogoIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

interface FooterProps {
    pages: Record<string, `/${string}`>;
  }

const Footer: FC<FooterProps> = ({ pages }) => {
    const pathName = usePathname();
    
    return (
        <div className="font-inter flex-col justify-center text-center align-middle bg-primary-violet-900 p-3">
            <section className="flex justify-around text-center align-middle p-10">
                <article className="flex-col justify-center text-center align-middle w-56">
                    <div className="flex justify-center text-center align-middle">
                        <LogoIcon width={125} height={125}/>
                    </div>
                    <h2 className="font-inter text-lg font-medium text-primary-purple-50 p-2">
                        Explore a world of <br />instruments, gear, <br />and resources for <br />musicians of all levels.
                    </h2>
                </article>
                <article className="flex-col justify-center text-left align-center p-0 w-56">
                    <h1 className="font-inter text-4xl font-extrabold text-primary-purple-50">
                        Sitemap
                    </h1>
                    <h2 className="font-inter text-2xl font-light text-primary-purple-100 pb-3">
                        Explore our pages
                    </h2>
                    <ul className="flex-col gap-2">
                    {Object.entries(pages).map(([name, path]) => (
                        <li key={name}>
                        <Link href={path}>
                        <span className="font-inter font-medium text-xl text-primary-purple-50 hover:text-primary-purple-100">
                            {name}
                        </span>
                        </Link>
                        </li>
                    ))}
                    </ul>
                </article>
                <article className="flex-col justify-center text-left align-center p-0 w-56">
                    <h1 className="font-inter font-extrabold text-4xl text-primary-purple-50 pb-8">Contact Us</h1>
                    <h2 className="font-inter font-bold text-2xl text-primary-purple-50">Duje Nikolić Malora</h2>
                    <h2 className="font-inter font-normal text-2xl text-primary-purple-50 pb-2">dnikol00@fesb.hr</h2>
                    <h2 className="font-inter font-bold text-2xl text-primary-purple-50">Joško Điko</h2>
                    <h2 className="font-inter font-normal text-2xl text-primary-purple-50">jdjiko00@fesb.hr</h2>
                </article>
            </section>
            <h3 className="font-normal text-sm text-primary-purple-100">Copyright © 2023. All rights reserved.</h3>
        </div>
    )
};

export default Footer