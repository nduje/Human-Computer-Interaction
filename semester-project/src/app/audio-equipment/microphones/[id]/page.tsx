"use client";

import { useEffect, useState } from "react";

type Microphone = {
  name: string;
  rating: number;
  price: number;
  description: string;
};

const MicrophoneDetails = ({ params }: { params: { id: string } }) => {
  const [microphone, setMicrophone] = useState<Microphone | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchMicrophoneData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response1 = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const response2 = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=microphone`
        );

        const data1 = await response1.json();
        const data2 = await response2.json();

        setMicrophone(data1.fields);
        setAssets(data2.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMicrophoneData();
  }, [id]);

  if (!microphone) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{microphone.name}</h1>
      <p>Ocjena: {microphone.rating}</p>
      <p>Cijena: {microphone.price}€</p>
      {microphone.images.map((image: any) => {
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
      {microphone.images.map((image: any) => {
        const asset = assets.find((asset) => asset.sys.id === image.sys.id);
        if (!asset) return null;

        const description = asset.fields.description;

        return <p>Opis: {description}</p>;
      })}
    </div>
  );
};

export default MicrophoneDetails;
