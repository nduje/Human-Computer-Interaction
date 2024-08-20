"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { cn } from "../../lib/utils";

interface NavbarProps {
  pages: Record<string, `/${string}`>;
}

const baseClass =
  "whitespace-nowrap font-roboto font-normal text-2xl px-2 py-1 m-1 text-base-colors-50";

const Navbar: FC<NavbarProps> = ({ pages }) => {
  const pathName = usePathname();

  return (
    <section className="container flex-col text-center align-middle justify-center mx-auto bg-base-colors-100">
      <section className="flex flex-row justify-evenly align-middle items-center h-36">
          <div className="flex flex-row justify-center align-middle font-roboto text-5xl hover:text-[50px] hover:cursor-pointer h-1/2">
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
      <section>
        <nav className="flex items-center align-middle justify-evenly mx-auto my-0 bg-base-colors-200 h-14">
          <ul className="flex items-center justify-evenly align-middle m-auto w-full h-full p-2">
            {Object.entries(pages).map(([name, path]) => (
              <li key={name} className="flex h-full items-center justify-center align-middle px-2 rounded-tl-3xl rounded-br-3xl hover:bg-base-colors-300">
                <Link href={path}>
                  <span className={cn(baseClass, {"pointer-events-none": path === pathName})}>
                    {name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
  </section>
  );
};

export default Navbar;