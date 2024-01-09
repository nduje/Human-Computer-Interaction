"use client";
import { useEffect, useState } from "react";

const FetchPedals = () => {
  const [pedals, setPedals] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=pedal`
        );

        const data = await response.json();

        setPedals(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popis pedala:</h1>
      <ul>
        {pedals?.map((pedal) => (
          <li key={pedal.sys.id}>
            <p>ID: {pedal.fields.id}</p>
            <p>Ime: {pedal.fields.name}</p>
            {pedal.fields.images.map((image: any) => {
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
            <p>Ocjena: {pedal.fields.rating}</p>
            <p>Cijena: {pedal.fields.price}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchPedals;
