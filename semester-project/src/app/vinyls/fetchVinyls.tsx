"use client";
import { useEffect, useState } from "react";

const FetchVinyls = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=vinyl`
        );

        const data = await response.json();

        setRecords(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popis ploča:</h1>
      <ul>
        {records?.map((record) => {
          const image = record.fields.cover;
          const asset = assets.find((asset) => asset.sys.id === image.sys.id);
          if (!asset) return null;

          const imageUrl = `https:${asset.fields.file.url}`;

          return (
            <li key={record.sys.id}>
              <p>ID: {record.fields.id}</p>
              <p>Ime: {record.fields.name}</p>
              <p>Žanr: {record.fields.genre}</p>
              <img
                key={image.sys.id}
                src={imageUrl}
                width={asset.fields.file.details.image.width}
                height={asset.fields.file.details.image.height}
              />
              <p>Cijena: {record.fields.price}€</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchVinyls;
