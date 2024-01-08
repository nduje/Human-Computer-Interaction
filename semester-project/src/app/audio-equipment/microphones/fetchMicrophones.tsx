"use client";
import { useEffect, useState } from "react";

const FetchMicrophones = () => {
  const [microphones, setMicrophones] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=microphone`
        );

        const data = await response.json();

        setMicrophones(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popis mikrofona:</h1>
      <ul>
        {microphones?.map((microphone) => (
          <li key={microphone.sys.id}>
            <p>ID: {microphone.fields.id}</p>
            <p>Ime: {microphone.fields.name}</p>
            {microphone.fields.images.map((image) => {
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
            <p>Ocjena: {microphone.fields.rating}</p>
            <p>Cijena: {microphone.fields.price}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchMicrophones;
