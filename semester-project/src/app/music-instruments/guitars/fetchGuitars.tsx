"use client";
import { useEffect, useState } from "react";

const FetchGuitars = () => {
  const [guitars, setGuitars] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=guitar`
        );

        const data = await response.json();

        setGuitars(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popis gitara:</h1>
      <ul>
        {guitars?.map((guitar) => (
          <li key={guitar.sys.id}>
            <p>ID: {guitar.fields.id}</p>
            <p>Ime: {guitar.fields.name}</p>
            <p>Tip: {guitar.fields.type}</p>
            {guitar.fields.images.map((image) => {
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
            <p>Ocjena: {guitar.fields.rating}</p>
            <p>Cijena: {guitar.fields.price}€</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchGuitars;
