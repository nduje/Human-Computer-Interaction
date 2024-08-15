"use client";

import { useEffect, useState } from "react";

type Pedal = {
  name: string;
  rating: number;
  price: number;
  description: string;
};

const PedalDetails = ({ params }: { params: { id: string } }) => {
  const [pedal, setPedal] = useState<Pedal | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchPedalData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response1 = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const response2 = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=pedal`
        );

        const data1 = await response1.json();
        const data2 = await response2.json();

        setPedal(data1.fields);
        setAssets(data2.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPedalData();
  }, [id]);

  if (!pedal) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pedal.name}</h1>
      <p>Ocjena: {pedal.rating}</p>
      <p>Cijena: {pedal.price}€</p>
      {pedal.images.map((image: any) => {
        const asset = assets.find((asset) => asset.sys.id === image.sys.id);
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
      {pedal.images.map((image: any) => {
        const asset = assets.find((asset) => asset.sys.id === image.sys.id);
        if (!asset) return null;

        const description = asset.fields.description;

        return <p>Opis: {description}</p>;
      })}
    </div>
  );
};

export default PedalDetails;
