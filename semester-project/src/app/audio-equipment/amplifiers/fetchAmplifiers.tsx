"use client";
import { useEffect, useState } from "react";

const FetchAmplifiers = () => {
  const [amplifiers, setAmplifiers] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=amplifier`
        );

        const data = await response.json();

        setAmplifiers(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popis amplifiera:</h1>
      <ul>
        {amplifiers?.map((amplifier) => (
          <li key={amplifier.sys.id}>
            <p>ID: {amplifier.fields.id}</p>
            <p>Ime: {amplifier.fields.name}</p>
            {amplifier.fields.images.map((image) => {
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
            <p>Ocjena: {amplifier.fields.rating}</p>
            <p>Cijena: {amplifier.fields.price}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchAmplifiers;
