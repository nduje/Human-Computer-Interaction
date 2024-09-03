"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState, useEffect, useRef } from "react";

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

  return (
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
        <div className="absolute bg-white border border-gray-300 mt-2 rounded shadow-lg w-full max-w-xs z-30 max-h-64 overflow-y-auto">
          <ul className="">
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
  );
};

export default SearchBar;