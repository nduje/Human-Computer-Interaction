"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import LogoIcon from "./icons/LogoIcon";
import { cn } from "../../lib/utils";

interface NavbarProps {
  pages: Record<string, `/${string}`>;
}

const baseClass =
  "whitespace-nowrap font-inter font-normal text-base px-5 py-3 m-4 rounded-md text-secondary-purple-900 hover:bg-secondary-purple-100";

const Navbar: FC<NavbarProps> = ({ pages }) => {
  const pathName = usePathname();

  return (
    <section className="container flex items-center justify-between mx-auto">
        <LogoIcon />
        <nav className="flex items-center justify-center p-4">
            <ul className="flex gap-2">
            {Object.entries(pages).map(([name, path]) => (
                <li key={name}>
                    <Link href={path}>
                        <span
                            className={cn(baseClass, {
                            "font-medium bg-secondary-purple-50 text-secondary-purple-900 pointer-events-none":
                            path === pathName,
                            })}
                        >
                        {name}
                        </span>
                    </Link>
                </li>
            ))}
            </ul>
      </nav>
    </section>
  );
};

export default Navbar;