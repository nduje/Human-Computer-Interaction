"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../../../lib/utils"
import "../../../components/styles/products.css"
import { colors } from "../page";

const FetchElectronicDrums = () => {
  const [drums, setDrums] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=drums`
        );

        const data = await response.json();

        const electronicDrums = data.items.filter(
          (drum: any) => drum.fields.category === "Electronic Drums"
        );

        setDrums(electronicDrums);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDrums = drums.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < drums.length) {
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
    <section className="flex flex-col justify-center items-center align-middle text-center m-0">
      <ul className="flex flex-col justify-between items-center align-middle text-center mx-auto my-12">
        {currentDrums?.map((drum) => (
          <Link key={drum.sys.id} href={`/drums/${drum.sys.id}`}>
            <li key={drum.sys.id} className="product grid grid-cols-[3fr_1fr] justify-around items-start align-middle text-center bg-base-colors-100 rounded-md w-[1024px] m-6">
                <div className="flex flex-row">
                  {drum.fields.images.length > 0 && (
                    <>
                      {(() => {
                        const image = drum.fields.images[0];
                        const asset = assets.find(
                          (asset) => asset.sys.id === image.sys.id
                        );
                        if (!asset) return null;

                        const imageUrl = `https:${asset.fields.file.url}`;

                        return (
                            <Image
                              src={imageUrl}
                              alt={drum.fields.name}
                              width={200}
                              height={200}
                              style={{objectFit: "cover"}}
                              className="rounded-md m-4 mr-0"
                            />
                        );
                      })()}
                    </>
                  )}
                  <div className="flex justify-start text-left flex-col font-roboto m-4">
                    <p className="name text-left font-medium text-xl">{drum.fields.name}</p>
                    <p className="font-bold text-3xl">{drum.fields.price}€</p>
                  </div>
                </div>
                <div className="inline-flex flex-col ml-auto mr-4 my-4 justify-between">
                  <p className={cn(colors[drum.fields.category], "flex h-full items-center justify-center align-middle px-4 py-1 font-normal text-md rounded-tl-3xl rounded-br-3xl")}>{drum.fields.category}</p>
                </div>
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex flex-row justify-evenly items-center align-middle text-center w-full font-roboto font-medium text-xl mx-auto mt-2">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="inline-block justify-center items-center text-center align-middle  text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2">Previous Page</button>
        )}
        {indexOfLastItem < drums.length && (
          <button onClick={handleNextPage} className="inline-block justify-center items-center text-center align-middle  text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2">Next Page</button>
        )}
      </div>
    </section>
  );
};

export default FetchElectronicDrums;
