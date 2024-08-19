"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type DJEquipment = {
  name: string;
  rating: number;
  price: number;
  description: string;
};

const DJEquipmentDetails = ({ params }: { params: { id: string } }) => {
  const [djEquipment, setDJEquipment] = useState<DJEquipment | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedDJEquipment, setRelatedDJEquipment] = useState<DJEquipment[]>(
    []
  );
  const { id } = params;

  useEffect(() => {
    const fetchDJEquipmentData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const djEquipmentResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedDJEquipmentResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=dj`
        );

        const djEquipmentData = await djEquipmentResponse.json();
        const relatedDJEquipmentData = await relatedDJEquipmentResponse.json();

        setDJEquipment({
          ...djEquipmentData.fields,
          id: djEquipmentData.sys.id,
        });
        setAssets(relatedDJEquipmentData.includes.Asset);

        const otherDJEquipment = relatedDJEquipmentData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledDJEquipment = otherDJEquipment.sort(
          () => 0.5 - Math.random()
        );

        const selectedRelatedDJEquipment = shuffledDJEquipment
          .slice(0, 1)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedDJEquipment(selectedRelatedDJEquipment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDJEquipmentData();
  }, [id]);

  if (!djEquipment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{djEquipment.name}</h1>
      <p>Ocjena: {djEquipment.rating}</p>
      <p>Cijena: {djEquipment.price}€</p>
      {djEquipment.images.map((image: any) => {
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
      {djEquipment.images.map((image: any) => {
        const asset = assets.find((asset) => asset.sys.id === image.sys.id);
        if (!asset) return null;

        const description = asset.fields.description;

        return <p>Opis: {description}</p>;
      })}

      <h2>Related DJEquipment</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedDJEquipment.map((relatedEquipment) => {
          const relatedImageAsset = relatedEquipment.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedEquipment.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedEquipment.id}>
              {relatedImageAsset && (
                <Link
                  href={`/dj-equipment/${relatedEquipment.id}`}
                >
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <Link
                href={`/dj-equipment/${relatedEquipment.id}`}
              >
                <p>{relatedEquipment.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DJEquipmentDetails;
