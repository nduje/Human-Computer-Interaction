"use client";

import { useEffect, useState } from "react";

type Keyboard = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
};

const KeyboardDetails = ({ params }: { params: { id: string } }) => {
  const [keyboard, setKeyboard] = useState<Keyboard | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedKeyboards, setRelatedKeyboards] = useState<Keyboard[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchKeyboardData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const keyboardResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedKeyboardsResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=keyboard`
        );

        const keyboardData = await keyboardResponse.json();
        const relatedKeyboardsData = await relatedKeyboardsResponse.json();

        setKeyboard(keyboardData.fields);
        setAssets(relatedKeyboardsData.includes.Asset);

        const otherKeyboards = relatedKeyboardsData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const selectedRelatedKeyboards = otherKeyboards
          .slice(0, 3)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedKeyboards(selectedRelatedKeyboards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchKeyboardData();
  }, [id]);

  if (!keyboard) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{keyboard.name}</h1>
      <p>Tip: {keyboard.type}</p>
      <p>Ocjena: {keyboard.rating}</p>
      <p>Cijena: {keyboard.price}€</p>
      {keyboard.images.map((image: any) => {
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
      {keyboard.images.map((image: any) => {
        const asset = assets.find((asset) => asset.sys.id === image.sys.id);
        if (!asset) return null;

        const description = asset.fields.description;

        return <p>Opis: {description}</p>;
      })}

      <h2>Related Keyboards</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedKeyboards.map((relatedKeyboard) => {
          const relatedImageAsset = relatedKeyboard.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedKeyboard.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedKeyboard.id}>
              {relatedImageAsset && (
                <img
                  src={`https:${relatedImageAsset.fields.file.url}`}
                  width="200"
                  height="200"
                  alt={relatedKeyboard.name}
                />
              )}
              <p>{relatedKeyboard.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyboardDetails;
