"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Pedal = {
  name: string;
  rating: number;
  price: number;
  description: string;
};

const PedalDetails = ({ params }: { params: { id: string } }) => {
  const [pedal, setPedal] = useState<Pedal | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedPedals, setRelatedPedals] = useState<Pedal[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchPedalData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const pedalResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedPedalsResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=pedal`
        );

        const pedalData = await pedalResponse.json();
        const relatedPedalsData = await relatedPedalsResponse.json();

        setPedal({
          ...pedalData.fields,
          id: pedalData.sys.id,
        });
        setAssets(relatedPedalsData.includes.Asset);

        const otherPedals = relatedPedalsData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledPedals = otherPedals.sort(() => 0.5 - Math.random());

        const selectedRelatedPedals = shuffledPedals
          .slice(0, 1)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedPedals(selectedRelatedPedals);
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

      <h2>Related Pedals</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedPedals.map((relatedPedal) => {
          const relatedImageAsset = relatedPedal.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedPedal.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedPedal.id}>
              {relatedImageAsset && (
                <Link href={`/pedals/${relatedPedal.id}`}>
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <Link href={`/pedals/${relatedPedal.id}`}>
                <p>{relatedPedal.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PedalDetails;
