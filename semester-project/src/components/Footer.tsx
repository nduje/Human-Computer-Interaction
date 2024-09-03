"use client";

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
    <div className="font-roboto flex-col justify-center text-center align-middle bg-base-colors-200 w-full p-3 mb-0 mt-10 md:mt-20 overflow-x-hidden">
      <section className="grid grid-row-5 md:grid-cols-3 items-center align-middle w-full py-10 px-16 md:px-32 flex-col">
        <article className="flex flex-col justify-center items-center md:items-start text-center md:text-left align-middle">
          <Link
            href="/"
            className="flex flex-row justify-center md:justify-start items-center md:items-start text-center md:text-left align-middle text-2xl md:text-4xl py-1 px-2 my-1 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer active:bg-base-colors-400/30 md:hover:bg-base-colors-400/25"
          >
            <h1 className="font-roboto text-base-colors-300 font-bold my-1 md:my-2">
              G
            </h1>
            <h1 className="font-roboto text-base-colors-50 font-normal my-1 md:my-2">
              String
            </h1>
          </Link>
          <h2 className="font-roboto text-sm md:text-lg md:w-3/4 font-thin text-base-colors-100">
            Unlock your musical journey and explore a world of instruments, gear, and resources for musicians of all levels.
          </h2>
        </article>
        <hr className="md:hidden my-8 rounded-full border-base-colors-100 border-[1px] w-full max-w-full"></hr>
        <article className="flex flex-col justify-center text-center align-center p-0">
          <h1 className="font-roboto text-xl md:text-3xl font-normal text-base-colors-100">
            Sitemap
          </h1>
          <h2 className="font-roboto text-base md:text-xl font-thin text-base-colors-300 mb-1 md:mb-3">
            Explore our pages
          </h2>
          <ul className="flex flex-col gap-2">
            {Object.entries(pages).map(([name, path]) => (
              <li key={name}>
                <Link href={path}>
                  <span className="font-roboto font-light hover:font-normal text-base md:text-xl text-base-colors-50 active:bg-base-colors-300 md:hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl px-4">
                    {name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <hr className="md:hidden my-8 rounded-full border-base-colors-100 border-[1px] w-full max-w-full"></hr>
        <article className="flex flex-col justify-center text-center md:text-right align-center p-0">
          <h1 className="whitespace-nowrap font-roboto font-normal text-xl md:text-3xl text-base-colors-50 pb-1 md:pb-3">
            Contact Us
          </h1>
          <h2 className="whitespace-nowrap font-roboto font-light text-base md:text-xl text-base-colors-300/75">
            Duje Nikolić Malora
          </h2>
          <h2 className="whitespace-nowrap font-roboto font-extralight text-base md:text-xl text-base-colors-50">
            dnikol00@fesb.hr
          </h2>
          <h2 className="whitespace-nowrap font-roboto font-light text-base md:text-xl text-base-colors-300/75">
            Joško Điko
          </h2>
          <h2 className="whitespace-nowrap font-roboto font-extralight text-base md:text-xl text-base-colors-50">
            jdjiko00@fesb.hr
          </h2>
        </article>
      </section>
      <h3 className="font-thin text-xs text-base-colors-100/50">
        Copyright © 2023-2024 All rights reserved.
      </h3>
    </div>
  );
};

export default Footer;
