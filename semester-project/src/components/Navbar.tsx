"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import SearchBar from "./home/SearchBarSection"
import "../components/styles/hamburger.css"

interface NavbarProps {
  pages: Record<string, `/${string}`>;
}

const baseClass =
  "whitespace-nowrap font-roboto font-normal text-2xl px-2 py-1 m-1 text-base-colors-50";

const baseClassPhone = 
  "whitespace-nowrap font-roboto font-normal text-lg p-0 text-base-colors-50"

const Navbar: FC<NavbarProps> = ({ pages }) => {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    const isMdOrLarger = window.matchMedia("(min-width: 768px)").matches;
    if (isMdOrLarger) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    
    handleResize();

    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathName]);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <section className="flex-col text-center align-middle justify-center mx-auto bg-base-colors-200 md:bg-base-colors-100">
      <section className="flex flex-row justify-between md:justify-evenly align-middle items-center h-16 md:h-20">
          <div className="flex flex-row justify-center align-middle font-roboto text-3xl md:text-5xl md:hover:text-[50px] hover:cursor-pointer h-auto max-h-16 md:max-h-20">
              <Link href="/" className="flex flex-row justify-center align-middle items-center ml-6 md:ml-0">
                  <div className="flex justify-center align-middle text-base-colors-300 my-10 font-bold">
                      G
                  </div>
                  <div className="flex justify-center align-middle text-base-colors-50 md:text-base-colors-200 my-10 font-medium">
                      String
                  </div>
              </ Link>
          </div>
          <nav className="flex md:hidden p-4 z-50">
            <div
              className={`hamburger-menu w-[30px] h-[30px] ml-auto relative z-50 ${menuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
      </section>

      <div className="hidden md:flex">
        <SearchBar />
      </div>

      <section className="hidden md:flex">
        <nav className="flex items-center align-middle justify-evenly mx-auto my-0 bg-base-colors-200 w-full h-14">
          <ul className="flex items-center justify-evenly align-middle m-auto w-full h-full p-2">
            {Object.entries(pages).map(([name, path]) => (
              <li key={name} className={`flex h-full items-center justify-center align-middle px-2 rounded-tl-3xl rounded-br-3xl ${pathName.includes(path) ? "bg-base-colors-300" : "bg-transparent"} active:bg-base-colors-300 hover:bg-base-colors-300`}>
                <Link href={path} className="rounded-tl-3xl rounded-br-3xl">
                  <span className={cn(baseClass, {"pointer-events-none": path === pathName})}>
                    {name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <div 
        className={`overlay flex md:hidden ${menuOpen ? 'active' : ''}`} 
        onClick={closeMenu}
      />

      <section className={`off-screen-menu flex md:hidden ${menuOpen ? 'active' : ''} z-40`}>
        <hr className="mt-[63px] rounded-full border-base-colors-100/25 border-[1px] w-full max-w-full"></hr>
        <ul className="flex flex-col items-center justify-start align-middle m-auto p-auto w-full h-full gap-11">
          <li className="m-2"><SearchBar /></li>
          {Object.entries(pages).map(([name, path]) => (
            <li key={name} className="flex flex-col leading-none items-center justify-center align-middle px-4 rounded-tl-3xl rounded-br-3xl">
              <Link href={path} className={`flex m-0 px-4 rounded-tl-3xl rounded-br-3xl ${pathName.includes(path) ? "bg-base-colors-300" : "bg-transparent"} active:bg-base-colors-300`}>
                <span className={cn(baseClassPhone, {"pointer-events-none": path === pathName})}>
                  {name}
                </span>
              </Link>
              <hr className="mt-2 rounded-full border-base-colors-100/25 border-[1px] w-full"></hr>
            </li>
          ))}
        </ul>
      </section>
  </section>
  );
};

export default Navbar;