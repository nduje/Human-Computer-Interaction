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
  "whitespace-nowrap font-pacifico font-normal text-2xl px-2 py-1 m-1 text-primary-grey-500 hover:text-secondary-brown-700";

const stroke = {
  textShadow: "-1px -1px 0 #FFDEA9, 1px -1px 0 #FFDEA9, -1px 1px 0 #FFDEA9, 1px 1px 0 #FFDEA9"
};

const Navbar: FC<NavbarProps> = ({ pages }) => {
  const pathName = usePathname();

  return (
    <section className="container flex items-center justify-between mx-auto">
        <LogoIcon />
        <nav style={stroke} className="flex items-center justify-center p-4">
            <ul className="flex gap-2">
            {Object.entries(pages).map(([name, path]) => (
                <li key={name}>
                    <Link href={path}>
                        <span
                            className={cn(baseClass, {
                            "font-medium text-secondary-brown-700 pointer-events-none":
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