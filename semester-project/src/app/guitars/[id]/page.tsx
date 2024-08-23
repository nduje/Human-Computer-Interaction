"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Guitar = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
};

const GuitarDetails = ({ params }: { params: { id: string } }) => {
  const [guitar, setGuitar] = useState<Guitar | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedGuitars, setRelatedGuitars] = useState<Guitar[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchGuitarData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const guitarResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedGuitarsResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=guitars`
        );

        const guitarData = await guitarResponse.json();
        const relatedGuitarsData = await relatedGuitarsResponse.json();

        setGuitar({
          ...guitarData.fields,
          id: guitarData.sys.id,
        });
        setAssets(relatedGuitarsData.includes.Asset);

        const otherGuitars = relatedGuitarsData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledGuitars = otherGuitars.sort(() => 0.5 - Math.random());

        const selectedRelatedGuitars = shuffledGuitars
          .slice(0, 3)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedGuitars(selectedRelatedGuitars);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGuitarData();
  }, [id]);

  if (!guitar) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{guitar.name}</h1>
      <p>Kategorija: {guitar.category}</p>
      <p>Cijena: {guitar.price}€</p>
      {guitar.images.map((image: any) => {
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
      <p>Opis: {guitar.description}</p>;<h2>Related Equipment</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedGuitars.map((relatedGuitar) => {
          const relatedImageAsset = relatedGuitar.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedGuitar.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedGuitar.id}>
              {relatedImageAsset && (
                <Link href={`/equipment/${relatedGuitar.id}`}>
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <p>
                <Link href={`/equipment/${relatedGuitar.id}`}>
                  {relatedGuitar.name}
                </Link>
              </p>
              <p>Cijena: {relatedGuitar.price}€</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuitarDetails;
