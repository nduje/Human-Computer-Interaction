"use client";

import { useEffect, useState } from "react";

type Drum = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
  images: { sys: { id: string } }[];
};

const DrumDetails = ({ params }: { params: { id: string } }) => {
  const [drum, setDrum] = useState<Drum | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedDrums, setRelatedDrums] = useState<Drum[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchDrumData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response1 = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const response2 = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=drums`
        );

        const data1 = await response1.json();
        const data2 = await response2.json();

        setDrum(data1.fields);
        setAssets(data2.includes.Asset);

        const otherDrums = data2.items.filter(
          (item: any) => item.sys.id !== id
        );

        const selectedRelatedDrums = otherDrums.slice(0, 3).map((item: any) => ({
          ...item.fields,
          id: item.sys.id,
        }));

        setRelatedDrums(selectedRelatedDrums);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDrumData();
  }, [id]);

  if (!drum) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{drum.name}</h1>
      <p>Tip: {drum.type}</p>
      <p>Ocjena: {drum.rating}</p>
      <p>Cijena: {drum.price}€</p>
      {drum.images.map((image: any) => {
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
      {drum.images.map((image: any) => {
        const asset = assets.find((asset) => asset.sys.id === image.sys.id);
        if (!asset) return null;

        const description = asset.fields.description;

        return <p>Opis: {description}</p>;
      })}

      <h2>Related Drums</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedDrums.map((relatedDrum) => {
          const relatedImageAsset = relatedDrum.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedDrum.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedDrum.id}>
              {relatedImageAsset && (
                <img
                  src={`https:${relatedImageAsset.fields.file.url}`}
                  width="200"
                  height="200"
                  alt={relatedDrum.name}
                />
              )}
              <p>{relatedDrum.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DrumDetails;
