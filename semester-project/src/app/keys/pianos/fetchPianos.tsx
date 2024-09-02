"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn, colors } from "../../../../lib/utils";
import "../../../components/styles/products.css";

const FetchPianos = () => {
  const [keys, setKeys] = useState<any[]>([]);
  const [originalOrder, setOriginalOrder] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=keys`
        );

        const data = await response.json();

        const pianos = data.items.filter(
          (key: any) => key.fields.category === "Pianos"
        );

        setKeys(pianos);
        setOriginalOrder(pianos);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const sortByRelevance = () => {
    setKeys([...originalOrder]);
    setSortOrder("");
    setCurrentPage(1);
  };

  const sortByNameAsc = () => {
    const sortedKeys = [...keys].sort((a, b) =>
      a.fields.name.localeCompare(b.fields.name)
    );
    setKeys(sortedKeys);
    setSortOrder("name-asc");
    setCurrentPage(1);
  };

  const sortByNameDesc = () => {
    const sortedKeys = [...keys].sort((a, b) =>
      b.fields.name.localeCompare(a.fields.name)
    );
    setKeys(sortedKeys);
    setSortOrder("name-desc");
    setCurrentPage(1);
  };

  const sortByPriceAsc = () => {
    const sortedKeys = [...keys].sort(
      (a, b) => a.fields.price - b.fields.price
    );
    setKeys(sortedKeys);
    setSortOrder("price-asc");
    setCurrentPage(1);
  };

  const sortByPriceDesc = () => {
    const sortedKeys = [...keys].sort(
      (a, b) => b.fields.price - a.fields.price
    );
    setKeys(sortedKeys);
    setSortOrder("price-desc");
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKeys = keys.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < keys.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center align-middle text-center text-base-colors-200 m-0">
      <div className="flex flex-row justify-center items-center space-x-4 mt-4 mb-4">
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

      <ul className="flex flex-col justify-center items-center align-middle mx-0 md:mx-auto my-6 md:my-12">
        {currentKeys?.map((key) => (
          <Link key={key.sys.id} href={`/keys/${key.sys.id}`}>
            <li className="product grid grid-rows-[auto,auto] md:grid-cols-[3fr_1fr] justify-around items-start bg-base-colors-100 rounded-md w-[90vw] md:w-[1024px] mx-auto my-3 md:m-6">
              <div className="flex flex-row col-span-2 md:col-auto">
                {key.fields.images.length > 0 && (
                  <>
                    {(() => {
                      const image = key.fields.images[0];
                      const asset = assets.find(
                        (asset) => asset.sys.id === image.sys.id
                      );
                      if (!asset) return null;

                      const imageUrl = `https:${asset.fields.file.url}`;

                      return (
                        <Image
                          key={image.sys.id}
                          src={imageUrl}
                          alt={key.fields.name}
                          width={256}
                          height={256}
                          style={{ objectFit: "cover" }}
                          className="w-[100px] md:w-[200px] h-[100px] md:h-[200px] rounded-md m-2 md:m-4 mr-2 md:mr-0"
                        />
                      );
                    })()}
                  </>
                )}
                <div className="flex flex-col justify-start text-left font-roboto m-2 md:m-4 col-span-2 md:col-auto">
                  <p className="name text-left font-medium text-xs md:text-xl">
                    {key.fields.name}
                  </p>
                  <p className="font-bold text-base md:text-3xl">
                    {key.fields.price}€
                  </p>
                </div>
              </div>
              <div className="flex md:inline-flex flex-col w-auto md:w-auto m-2 md:ml-auto md:mr-4 md:my-4 justify-between col-span-4 md:col-auto">
                <p
                  className={cn(
                    colors[key.fields.category],
                    "flex h-full items-center justify-center px-4 py-1 font-medium md:font-normal text-xs md:text-md rounded-3xl md:rounded-bl-none md:rounded-tr-none md:rounded-tl-3xl md:rounded-br-3xl"
                  )}
                >
                  {key.fields.category}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      <div
        className={`flex flex-row items-center w-[80vw] md:w-[50vw] font-roboto font-medium text-xs md:text-xl mx-0 md:mx-auto mt-1 md:mt-2 ${
          currentPage > 1 && indexOfLastItem < keys.length
            ? "justify-between"
            : "justify-center"
        }`}
      >
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            className="inline-block text-base-colors-50 bg-base-colors-200 active:bg-base-colors-300 md:hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2"
          >
            Previous Page
          </button>
        )}
        {indexOfLastItem < keys.length && (
          <button
            onClick={handleNextPage}
            className="inline-block text-base-colors-50 bg-base-colors-200 active:bg-base-colors-300 md:hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2"
          >
            Next Page
          </button>
        )}
      </div>
    </section>
  );
};

export default FetchPianos;
