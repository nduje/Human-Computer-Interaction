"use client";
import { useEffect, useState } from "react";

const FetchDrums = () => {
  const [drums, setDrums] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=drums`
        );

        const data = await response.json();

        setDrums(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popis bubnjeva:</h1>
      <ul>
        {drums?.map((drum) => (
          <li key={drum.sys.id}>
            <p>ID: {drum.fields.id}</p>
            <p>Ime: {drum.fields.name}</p>
            <p>Tip: {drum.fields.type}</p>
            {drum.fields.images.map((image: any) => {
              const asset = assets.find(
                (asset) => asset.sys.id === image.sys.id
              );
              if (!asset) return null;

              const imageUrl = `https:${asset.fields.file.url}`;

              return (
                <img
                  key={image.sys.id}
                  src={imageUrl}
                  width={asset.fields.file.details.image.width}
                  height={asset.fields.file.details.image.height}
                />
              );
            })}
            <p>Ocjena: {drum.fields.rating}</p>
            <p>Cijena: {drum.fields.price}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDrums;
