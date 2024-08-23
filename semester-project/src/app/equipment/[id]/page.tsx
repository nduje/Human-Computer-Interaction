"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Equipment = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
};

const EquipmentDetails = ({ params }: { params: { id: string } }) => {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedEquipment, setRelatedEquipment] = useState<Equipment[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchEquipmentData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const equipmentResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedEquipmentResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=equipment`
        );

        const equipmentData = await equipmentResponse.json();
        const relatedEquipmentData = await relatedEquipmentResponse.json();

        setEquipment({
          ...equipmentData.fields,
          id: equipmentData.sys.id,
        });
        setAssets(relatedEquipmentData.includes.Asset);

        const otherEquipment = relatedEquipmentData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledEquipment = otherEquipment.sort(() => 0.5 - Math.random());

        const selectedRelatedEquipment = shuffledEquipment
          .slice(0, 3)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedEquipment(selectedRelatedEquipment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEquipmentData();
  }, [id]);

  if (!equipment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{equipment.name}</h1>
      <p>Kategorija: {equipment.category}</p>
      <p>Cijena: {equipment.price}€</p>
      {equipment.images.map((image: any) => {
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
      <p>Opis: {equipment.description}</p>;

      <h2>Related Equipment</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedEquipment.map((relatedEquipment) => {
          const relatedImageAsset = relatedEquipment.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedEquipment.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedEquipment.id}>
              {relatedImageAsset && (
                <Link href={`/equipment/${relatedEquipment.id}`}>
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <p>
                <Link href={`/equipment/${relatedEquipment.id}`}>
                  {relatedEquipment.name}
                </Link>
              </p>
              <p>Cijena: {relatedEquipment.price}€</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentDetails;
