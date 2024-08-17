"use client";

import { useEffect, useState } from "react";

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
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=guitar`
        );

        const guitarData = await guitarResponse.json();
        const relatedGuitarsData = await relatedGuitarsResponse.json();

        setGuitar(guitarData.fields);
        setAssets(relatedGuitarsData.includes.Asset);

        const otherGuitars = relatedGuitarsData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const selectedRelatedGuitars = otherGuitars
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
      <p>Tip: {guitar.type}</p>
      <p>Ocjena: {guitar.rating}</p>
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
      {guitar.images.map((image: any) => {
        const asset = assets.find((asset) => asset.sys.id === image.sys.id);
        if (!asset) return null;

        const description = asset.fields.description;

        return <p>Opis: {description}</p>;
      })}

      <h2>Related Guitars</h2>
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
                <img
                  src={`https:${relatedImageAsset.fields.file.url}`}
                  width="200"
                  height="200"
                  alt={relatedGuitar.name}
                />
              )}
              <p>{relatedGuitar.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuitarDetails;
