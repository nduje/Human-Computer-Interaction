"use client";

import { FC, useState, useEffect, useRef } from "react";

interface Item {
    fields: {
        name: string,
        price: number
    };
}

interface SortProps {
    items: Item[];
    setItems: (item: Item[]) => void;
    setCurrentPage: (page: number) => void;
}

const Sort: FC<SortProps> = ({items, setItems, setCurrentPage}) => {
    const [sortOrder, setSortOrder] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    
    const originalOrder = [...items]

    const sortByNameAsc = () => {
        const sortedItems = [...items].sort((a, b) =>
          a.fields.name.localeCompare(b.fields.name)
        );
        setItems(sortedItems);
        setSortOrder("name-asc");
        setCurrentPage(1);
      };
    
      const sortByNameDesc = () => {
        const sortedItems = [...items].sort((a, b) =>
          b.fields.name.localeCompare(a.fields.name)
        );
        setItems(sortedItems);
        setSortOrder("name-desc");
        setCurrentPage(1);
      };
    
      const sortByPriceAsc = () => {
        const sortedItems = [...items].sort(
          (a, b) => a.fields.price - b.fields.price
        );
        setItems(sortedItems);
        setSortOrder("price-asc");
        setCurrentPage(1);
      };
    
      const sortByPriceDesc = () => {
        const sortedItems = [...items].sort(
          (a, b) => b.fields.price - a.fields.price
        );
        setItems(sortedItems);
        setSortOrder("price-desc");
        setCurrentPage(1);
      };
    
      const sortByRelevance = () => {
        setItems([...originalOrder]);
        setSortOrder("");
        setCurrentPage(1);
      };
    
      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            sortRef.current &&
            !sortRef.current.contains(event.target as Node)
          ) {
            setIsDropdownOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center space-x-0 lg:space-x-4 mt-4 mb-4 z-10">
        {/* Buttons for larger screens */}
            <div className="hidden lg:flex md:space-x-4">
            <button
                onClick={sortByRelevance}
                className={`px-4 py-2 bg-base-colors-200 text-base-colors-50 rounded-tl-3xl rounded-br-3xl hover:bg-base-colors-300 ${
                sortOrder === "" ? "bg-base-colors-300" : ""
                }`}
            >
                Sort by Relevance
            </button>
            <button
                onClick={sortByNameAsc}
                className={`px-4 py-2 bg-base-colors-200 text-base-colors-50 rounded-tl-3xl rounded-br-3xl hover:bg-base-colors-300 ${
                sortOrder === "name-asc" ? "bg-base-colors-300" : ""
                }`}
            >
                Sort by Name ↑
            </button>
            <button
                onClick={sortByNameDesc}
                className={`px-4 py-2 bg-base-colors-200 text-base-colors-50 rounded-tl-3xl rounded-br-3xl hover:bg-base-colors-300 ${
                sortOrder === "name-desc" ? "bg-base-colors-300" : ""
                }`}
            >
                Sort by Name ↓
            </button>
            <button
                onClick={sortByPriceAsc}
                className={`px-4 py-2 bg-base-colors-200 text-base-colors-50 rounded-tl-3xl rounded-br-3xl hover:bg-base-colors-300 ${
                sortOrder === "price-asc" ? "bg-base-colors-300" : ""
                }`}
            >
                Sort by Price ↑
            </button>
            <button
                onClick={sortByPriceDesc}
                className={`px-4 py-2 bg-base-colors-200 text-base-colors-50 rounded-tl-3xl rounded-br-3xl hover:bg-base-colors-300 ${
                sortOrder === "price-desc" ? "bg-base-colors-300" : ""
                }`}
            >
                Sort by Price ↓
            </button>
            </div>

            <div className="relative flex justify-center md:hidden">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-base-colors-200 text-base-colors-50 rounded-tl-3xl rounded-br-3xl hover:bg-base-colors-300"
            >
                Sort by
            </button>
            {isDropdownOpen && (
                <div ref={sortRef} className="absolute mt-12 bg-base-colors-200 text-base-colors-50 rounded-lg shadow-lg">
                    <button
                        onClick={sortByRelevance}
                        className={`flex px-4 py-2 hover:bg-base-colors-300 w-full ${
                        sortOrder === "" ? "bg-base-colors-300" : ""
                        }`}
                    >
                        Relevance
                    </button>
                    <button
                        onClick={sortByNameAsc}
                        className={`flex px-4 py-2 hover:bg-base-colors-300 w-full ${
                        sortOrder === "name-asc" ? "bg-base-colors-300" : ""
                        }`}
                    >
                        Name ↑
                    </button>
                    <button
                        onClick={sortByNameDesc}
                        className={`flex px-4 py-2 hover:bg-base-colors-300 w-full ${
                        sortOrder === "name-desc" ? "bg-base-colors-300" : ""
                        }`}
                    >
                        Name ↓
                    </button>
                    <button
                        onClick={sortByPriceAsc}
                        className={`flex px-4 py-2 hover:bg-base-colors-300 w-full ${
                        sortOrder === "price-asc" ? "bg-base-colors-300" : ""
                        }`}
                    >
                        Price ↑
                    </button>
                    <button
                        onClick={sortByPriceDesc}
                        className={`flex px-4 py-2 hover:bg-base-colors-300 w-full ${
                        sortOrder === "price-desc" ? "bg-base-colors-300" : ""
                        }`}
                    >
                        Price ↓
                    </button>
                </div>
            )}
            </div>
        </div>
    );
};

export default Sort;