"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import "../components/styles/hamburger.css";

interface NavbarProps {
  pages: Record<string, `/${string}`>;
}

const baseClass =
  "whitespace-nowrap font-roboto font-normal text-2xl px-2 py-1 m-1 text-base-colors-50";

const baseClassPhone =
  "whitespace-nowrap font-roboto font-normal text-lg p-0 text-base-colors-50";

const Navbar: FC<NavbarProps> = ({ pages }) => {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [elements, setElements] = useState<any[]>([]);
  const [filteredElements, setFilteredElements] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchElements = async () => {
      const SPACE_ID = "kxdn75bdbglk";
      const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

      const response = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}`
      );

      const data = await response.json();
      const items = data.items || [];

      setElements(items);

      const filteredItems = items.filter(
        (item: any) => item.sys.contentType.sys.id !== "blogs"
      );

      setFilteredElements(filteredItems);
    };

    fetchElements();
  }, []);

  useEffect(() => {
    const results = elements.filter((item: any) =>
      item.fields.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredElements(results);
  }, [searchInput, elements]);

  useEffect(() => {
    // Clear search input and close dropdown on navigation
    setSearchInput("");
    setMenuOpen(false);
  }, [pathName]);

  useEffect(() => {
    const handleResize = () => {
      const isMdOrLarger = window.matchMedia("(min-width: 768px)").matches;
      if (isMdOrLarger) {
        setMenuOpen(false);
      }
    };

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <section className="flex-col text-center align-middle justify-center mx-auto bg-base-colors-200 md:bg-base-colors-100">
      <section className="flex flex-row justify-between md:justify-evenly align-middle items-center h-16 md:h-20">
        <div className="flex flex-row justify-center align-middle font-roboto text-3xl md:text-5xl md:hover:text-[50px] hover:cursor-pointer h-auto max-h-16 md:max-h-20">
          <Link
            href="/"
            className="flex flex-row justify-center align-middle items-center ml-6 md:ml-0"
          >
            <div className="flex justify-center align-middle text-base-colors-300 my-10 font-bold">
              G
            </div>
            <div className="flex justify-center align-middle text-base-colors-50 md:text-base-colors-200 my-10 font-medium">
              String
            </div>
          </Link>
        </div>
        <nav className="flex md:hidden p-4">
          <div
            className={`hamburger-menu w-[30px] h-[30px] ml-auto relative z-50 ${
              menuOpen ? "active" : ""
            }`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </section>

      <section
        className="flex flex-col items-center mt-4 relative"
        ref={searchRef}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border rounded px-2 py-1 w-full max-w-xs"
        />
        {searchInput && (
          <div className="absolute bg-white border border-gray-300 mt-2 rounded shadow-lg w-full max-w-xs z-50">
            <ul>
              {filteredElements.length > 0 ? (
                filteredElements.map((item: any) => (
                  <li key={item.sys.id} className="px-4 py-2 hover:bg-gray-200">
                    <Link
                      href={`/${item.sys.contentType.sys.id}/${item.sys.id}`}
                      onClick={closeMenu}
                    >
                      {item.fields.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-center text-gray-500">
                  No elements found
                </li>
              )}
            </ul>
          </div>
        )}
      </section>

      <section className="hidden md:flex">
        <nav className="flex items-center align-middle justify-evenly mx-auto my-0 bg-base-colors-200 w-full h-14">
          <ul className="flex items-center justify-evenly align-middle m-auto w-full h-full p-2">
            {Object.entries(pages).map(([name, path]) => (
              <li
                key={name}
                className="flex h-full items-center justify-center align-middle px-2 rounded-tl-3xl rounded-br-3xl active:bg-base-colors-300 hover:bg-base-colors-300"
              >
                <Link href={path} className="rounded-tl-3xl rounded-br-3xl">
                  <span
                    className={cn(baseClass, {
                      "pointer-events-none": path === pathName,
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

      <div
        className={`overlay flex md:hidden ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />

      <section
        className={`off-screen-menu flex md:hidden ${menuOpen ? "active" : ""}`}
      >
        <hr className="mt-16 rounded-full border-base-colors-100/25 border-[1px] w-full max-w-full"></hr>
        <ul className="flex flex-col items-center justify-center align-middle m-auto p-auto w-full h-full gap-11">
          {Object.entries(pages).map(([name, path]) => (
            <li
              key={name}
              className="flex flex-col leading-none items-center justify-center align-middle px-4 rounded-tl-3xl rounded-br-3xl"
            >
              <Link
                href={path}
                className="flex m-0 px-4 rounded-tl-3xl rounded-br-3xl active:bg-base-colors-300"
              >
                <span
                  className={cn(baseClassPhone, {
                    "pointer-events-none": path === pathName,
                  })}
                >
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
