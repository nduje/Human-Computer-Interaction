"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";

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

        // Spremanje asseta (slika)
        setAssets(data.includes.Asset);

        // Grupiranje entiteta po contentType
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

        // Odabir jednog nasumičnog entiteta iz svake grupe
        const selectedItems = Object.values(groupedByType).map((group: any[]) =>
          group[Math.floor(Math.random() * group.length)]
        );

        // Ako ima više od 3 odabranih entiteta, smanji broj na 3
        const shuffledItems = selectedItems.sort(() => 0.5 - Math.random()).slice(0, 3);

        setFeaturedItems(shuffledItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Funkcija za dohvaćanje URL-a slike iz asseta
  const getImageUrl = (imageId: string) => {
    const asset = assets.find((asset: any) => asset.sys.id === imageId);
    return asset ? `https:${asset.fields.file.url}` : null;
  };

  return (
    <article>
      <h2>Istaknuti entiteti:</h2>
      <ul>
        {featuredItems.map((item) => (
          <li key={item.sys.id}>
            <Link href={`/${item.sys.contentType.sys.id}/${item.sys.id}`}>
              <h3>{item.fields.name}</h3>
            </Link>
            {item.fields.images && item.fields.images.length > 0 && (
              <img
                src={getImageUrl(item.fields.images[0].sys.id)}
                alt={item.fields.name}
                style={{ width: "150px", height: "auto" }}
              />
            )}
            <p>Cijena: {item.fields.price}€</p>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FeaturedSection;
