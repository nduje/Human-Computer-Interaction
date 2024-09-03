"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect, useRef } from "react";
import "../styles/vertical-scrollbar.css"

const SearchBar: FC = () => {
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


      const filteredItems = items.filter(
        (item: any) => item.sys.contentType.sys.id !== "blogs"
      );

      setFilteredElements(filteredItems);
      setElements(filteredItems);
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
        setSearchInput("");
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      const liElements = divRef.current.querySelectorAll('li');
      let totalHeight = 0;

      liElements.forEach((li, index) => {
        if (index < 8) {
          totalHeight += li.offsetHeight;
        }
      });

      divRef.current.style.maxHeight = `${totalHeight}px`;
    }
  }, [filteredElements]);


  return (
    <section
      className="flex flex-col justify-center text-center items-center align-middle m-auto p-auto relative w-fit"
      ref={searchRef}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="font-roboto font-medium bg-transparent md:bg-base-colors-50 text-base-colors-50 md:text-base-colors-200 text-lg md:text-xl border-b-4 border-base-colors-400/50 border-solid focus:border-b-4 focus:border-base-colors-300/50 md:border-4 md:border-base-colors-200/20 md:focus:border-4 my-2 md:focus:border-base-colors-200 text-center w-3/4 md:w-[50vw] md:rounded-3xl px-4 py-2 outline-none md:outline"
      />
      {searchInput && (
        <div ref={divRef} className="vertical-scrollbar absolute text-base-colors-50 md:text-base-colors-200 bg-base-colors-200  md:bg-base-colors-50 border-2 border-base-colors-100 md:border top-14 mt-2 shadow-lg w-full overflow-y-auto">
          <ul className="font-roboto font-normal text-sm">
            {filteredElements.length > 0 ? (
              filteredElements.map((item: any) => (
                  <Link
                    href={`/${item.sys.contentType.sys.id}/${item.sys.id}`}
                    key={item.sys.id}
                    onClick={closeMenu}
                  >
                    <li key={item.sys.id} className="px-4 py-2 md:hover:bg-base-colors-100 md:hover:text-base-colors-300 active:bg-base-colors-100 active:text-base-colors-300">
                      {item.fields.name}
                    </li>
                  </Link>
              ))
            ) : (
              <li className="font-bold px-4 py-2 text-center text-base-colors-300">
                No elements found
              </li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default SearchBar;