"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../../../lib/utils"
import "../../../components/styles/products.css"
import { colors } from "../page";

const FetchPercussion = () => {
  const [instruments, setInstruments] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=orchestra`
        );

        const data = await response.json();

        const percussions = data.items.filter(
          (instrument: any) => instrument.fields.category === "Percussion"
        );

        setInstruments(percussions);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstruments = instruments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (indexOfLastItem < instruments.length) {
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
    <section className="flex flex-col justify-center items-center text-center m-0">
      <ul className="flex flex-col items-center mx-auto my-12">
        {currentInstruments?.map((instrument) => (
          <Link key={instrument.sys.id} href={`/orchestra/${instrument.sys.id}`}>
            <li className="product grid grid-cols-[3fr_1fr] justify-around items-start bg-base-colors-100 rounded-md w-[1024px] m-6">
              <div className="flex flex-row">
                {instrument.fields.images.length > 0 && (
                  <>
                    {(() => {
                      const image = instrument.fields.images[0];
                      const asset = assets.find(
                        (asset) => asset.sys.id === image.sys.id
                      );
                      if (!asset) return null;

                      const imageUrl = `https:${asset.fields.file.url}`;

                      return (
                        <Image
                          key={image.sys.id}
                          src={imageUrl}
                          alt={instrument.fields.name}
                          width={200}
                          height={200}
                          style={{ objectFit: "cover" }}
                          className="rounded-md m-4 mr-0"
                        />
                      );
                    })()}
                  </>
                )}
                <div className="flex flex-col justify-start text-left font-roboto m-4">
                  <p className="name text-left font-medium text-xl">{instrument.fields.name}</p>
                  <p className="font-bold text-3xl">{instrument.fields.price}€</p>
                </div>
              </div>
              <div className="inline-flex flex-col ml-auto mr-4 my-4 justify-between">
                <p className={cn(colors[instrument.fields.category], "flex h-full items-center justify-center px-4 py-1 font-normal text-md rounded-tl-3xl rounded-br-3xl")}>
                  {instrument.fields.category}
                </p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex flex-row justify-evenly items-center w-full font-roboto font-medium text-xl mx-auto mt-2">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="inline-block text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2">
            Previous Page
          </button>
        )}
        {indexOfLastItem < instruments.length && (
          <button onClick={handleNextPage} className="inline-block text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2">
            Next Page
          </button>
        )}
      </div>
    </section>
  );
};

export default FetchPercussion;
