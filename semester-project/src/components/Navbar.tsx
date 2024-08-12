"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { cn } from "../../lib/utils";

interface NavbarProps {
  pages: Record<string, `/${string}`>;
}

const baseClass =
  "whitespace-nowrap font-roboto font-bold text-2xl px-2 py-1 m-1 text-base-colors-50";

const Navbar: FC<NavbarProps> = ({ pages }) => {
  const pathName = usePathname();

const colors: Record<string, string> = {
  "Guitars": "hover:bg-navbar-palette-50",
  "Keys": "hover:bg-navbar-palette-100",
  "Drums": "hover:bg-navbar-palette-200",
  "Amplifiers": "hover:bg-navbar-palette-300",
  "Microphones": "hover:bg-navbar-palette-400",
  "Pedals": "hover:bg-navbar-palette-500",
  "DJ": "hover:bg-navbar-palette-600",
  "Sheet": "hover:bg-navbar-palette-700",
  "Vinyls": "hover:bg-navbar-palette-800",
};

const diamond = {
  transform: 'translate(-50%, -50%) rotate(45deg)',
};

  return (
    <nav className="flex items-center align-middle justify-evenly mx-auto my-0 bg-base-colors-200 h-14">
      <ul className="flex items-center justify-evenly align-middle m-auto w-full h-full">
        {Object.entries(pages).map(([name, path]) => (
          <li key={name} className={cn(colors[name], "flex h-full items-center justify-center align-middle px-2")}>
            <Link href={path}>
              <span style={diamond} className={cn(baseClass, {"pointer-events-none": path === pathName})}>
                {name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;