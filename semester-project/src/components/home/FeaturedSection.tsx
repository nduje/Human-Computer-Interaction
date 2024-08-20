"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import "../styles/products.css"

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
    <article className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
        <h1 className="font-bold text-3xl text-base-colors-200 m-12">
            Featured Products
        </h1>
        <ul className="flex flex-row justify-evenly text-left items-start align-middle my-8">
            {featuredItems.map((item) => (
            <li key={item.sys.id} className="flex flex-col bg-base-colors-100 w-1/6 rounded-md">
                <Link href={`/${item.sys.contentType.sys.id}/${item.sys.id}`} className="product flex flex-col justify-center items-left text-left align-middle">
                    {item.fields.images && item.fields.images.length > 0 && (
                    <img
                        src={getImageUrl(item.fields.images[0].sys.id)}
                        alt={item.fields.name}
                        style={{width: "100%", height: "100%", objectFit: "contain"}}
                        className="m-0 p-0 border-x-8 border-t-8 rounded-t-md border-base-colors-100"
                    />
                    )}
                    <h2 className="name font-medium text-lg mx-2 mt-2">{item.fields.name}</h2>
                    <h3 className="font-bold text-3xl mx-2 mb-2">{item.fields.price}€</h3>
                </Link>
            </li>
            ))}
        </ul>
    </article>
  );
};

export default FeaturedSection;
