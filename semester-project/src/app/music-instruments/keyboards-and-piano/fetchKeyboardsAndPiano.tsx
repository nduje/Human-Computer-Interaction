"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FetchKeyboards = () => {
  const [keyboards, setKeyboards] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=keyboard`
        );

        const data = await response.json();

        setKeyboards(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popis klavijatura:</h1>
      <ul>
        {keyboards?.map((keyboard) => (
          <li key={keyboard.sys.id}>
            <p>ID: {keyboard.fields.id}</p>
            <p>
              <Link
                href={`/music-instruments/keyboards-and-piano/${keyboard.sys.id}`}
              >
                {keyboard.fields.name}
              </Link>
            </p>
            <p>Tip: {keyboard.fields.type}</p>
            {keyboard.fields.images.map((image: any) => {
              const asset = assets.find(
                (asset) => asset.sys.id === image.sys.id
              );
              if (!asset) return null;

              const imageUrl = `https:${asset.fields.file.url}`;

              return (
                <Link
                  key={image.sys.id}
                  href={`/music-instruments/keyboards-and-piano/${keyboard.sys.id}`}
                >
                  <img
                    key={image.sys.id}
                    src={imageUrl}
                    width={asset.fields.file.details.image.width}
                    height={asset.fields.file.details.image.height}
                  />
                </Link>
              );
            })}
            <p>Ocjena: {keyboard.fields.rating}</p>
            <p>Cijena: {keyboard.fields.price}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchKeyboards;
