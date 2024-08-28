"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../styles/products.css"
import "../styles/scrollbar.css"
import error from "../images/error/error.png"

const FeaturedSection: FC = () => {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}`
        );

        const data = await response.json();

        setAssets(data.includes.Asset);

        const groupedByType: { [key: string]: any[] } = data.items.reduce(
          (acc: { [key: string]: any[] }, item: any) => {
            const contentType = item.sys.contentType.sys.id;
            if (!acc[contentType]) {
              acc[contentType] = [];
            }
            acc[contentType].push(item);
            return acc;
          },
          {}
        );

        const selectedItems = Object.values(groupedByType).map((group: any[]) =>
          group[Math.floor(Math.random() * group.length)]
        );

        const shuffledItems = selectedItems.sort(() => 0.5 - Math.random()).slice(0, 3);

        setFeaturedItems(shuffledItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getImageUrl = (imageId: string) => {
    const asset = assets.find((asset: any) => asset.sys.id === imageId);
    return asset ? `https:${asset.fields.file.url}` : null;
  };

  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-6 md:m-12">
        <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">
            Featured Products
        </h1>
        <ul className="scrollbar flex flex-row justify-evenly text-left items-start align-middle p-4 md:p-0 md:my-8 overflow-x-auto snap-x snap-mandatory">
            {featuredItems.map((item) => (
            <li key={item.sys.id} className="flex flex-col bg-base-colors-100 w-1/2 md:w-1/6 rounded-md flex-shrink-0 snap-center snap-always mx-[25vw] md:mx-2">
                <Link href={`/${item.sys.contentType.sys.id}/${item.sys.id}`} className="product flex flex-col justify-center items-left text-left align-middle rounded-md m-auto">
                    {item.fields.images && item.fields.images.length > 0 && (
                      <Image
                          src={getImageUrl(item.fields.images[0].sys.id) || error}
                          alt={item.fields.name}
                          width={512}
                          height={512}
                          style={{objectFit: "contain"}}
                          className="w-full h-full m-0 p-0 border-x-8 border-t-8 rounded-t-md border-base-colors-100"
                      />
                    )}
                    <h2 className="name font-medium text-sm md:text-lg mx-2 mt-1 md:mt-2 h-[60px] md:h-[55px] overflow-hidden text-ellipsis">{item.fields.name}</h2>
                    <h3 className="font-bold text-xl md:text-3xl mx-2 mb-1 md:mb-2 mt-1">{item.fields.price}€</h3>
                </Link>
            </li>
            ))}
        </ul>
    </article>
  );
};

export default FeaturedSection;
