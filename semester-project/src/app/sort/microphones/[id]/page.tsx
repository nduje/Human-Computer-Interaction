"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Microphone = {
  name: string;
  rating: number;
  price: number;
  description: string;
};

const MicrophoneDetails = ({ params }: { params: { id: string } }) => {
  const [microphone, setMicrophone] = useState<Microphone | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedMicrophones, setRelatedMicrophones] = useState<Microphone[]>(
    []
  );
  const { id } = params;

  useEffect(() => {
    const fetchMicrophoneData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const microphoneResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedMicrophonesResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=microphone`
        );

        const microphoneData = await microphoneResponse.json();
        const relatedMicrophonesData = await relatedMicrophonesResponse.json();

        setMicrophone({
          ...microphoneData.fields,
          id: microphoneData.sys.id,
        });
        setAssets(relatedMicrophonesData.includes.Asset);

        const otherMicrophones = relatedMicrophonesData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledMicrophones = otherMicrophones.sort(
          () => 0.5 - Math.random()
        );

        const selectedRelatedMicrophones = shuffledMicrophones
          .slice(0, 1)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedMicrophones(selectedRelatedMicrophones);
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

      <h2>Related Microphones</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedMicrophones.map((relatedMicrophone) => {
          const relatedImageAsset = relatedMicrophone.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedMicrophone.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedMicrophone.id}>
              {relatedImageAsset && (
                <Link
                  href={`/microphones/${relatedMicrophone.id}`}
                >
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <Link
                href={`/microphones/${relatedMicrophone.id}`}
              >
                <p>{relatedMicrophone.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MicrophoneDetails;
