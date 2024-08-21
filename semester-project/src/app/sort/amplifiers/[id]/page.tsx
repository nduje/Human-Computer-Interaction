"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Amplifier = {
  name: string;
  rating: number;
  price: number;
  description: string;
};

const AmplifierDetails = ({ params }: { params: { id: string } }) => {
  const [amplifier, setAmplifier] = useState<Amplifier | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedAmplifiers, setRelatedAmplifiers] = useState<Amplifier[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchAmplifierData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const amplifierResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedAmplifiersResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=amplifier`
        );

        const amplifierData = await amplifierResponse.json();
        const relatedAmplifiersData = await relatedAmplifiersResponse.json();

        setAmplifier({
          ...amplifierData.fields,
          id: amplifierData.sys.id,
        });
        setAssets(relatedAmplifiersData.includes.Asset);

        const otherAmplifiers = relatedAmplifiersData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledAmplifiers = otherAmplifiers.sort(
          () => 0.5 - Math.random()
        );

        const selectedRelatedAmplifiers = shuffledAmplifiers
          .slice(0, 1)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedAmplifiers(selectedRelatedAmplifiers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAmplifierData();
  }, [id]);

  if (!amplifier) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{amplifier.name}</h1>
      <p>Ocjena: {amplifier.rating}</p>
      <p>Cijena: {amplifier.price}€</p>
      {amplifier.images.map((image: any) => {
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
      {amplifier.images.map((image: any) => {
        const asset = assets.find((asset) => asset.sys.id === image.sys.id);
        if (!asset) return null;

        const description = asset.fields.description;

        return <p>Opis: {description}</p>;
      })}

      <h2>Related Amplifiers</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedAmplifiers.map((relatedAmplifier) => {
          const relatedImageAsset = relatedAmplifier.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedAmplifier.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedAmplifier.id}>
              {relatedImageAsset && (
                <Link
                  href={`/amplifiers/${relatedAmplifier.id}`}
                >
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <Link href={`/amplifiers/${relatedAmplifier.id}`}>
                <p>{relatedAmplifier.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmplifierDetails;
