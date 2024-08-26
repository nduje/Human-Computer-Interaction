"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../components/styles/products.css";

type Equipment = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
  images: any[];
};

const EquipmentDetails = ({ params }: { params: { id: string } }) => {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedEquipments, setRelatedEquipment] = useState<Equipment[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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

        const firstImageId = equipmentData.fields.images[0]?.sys.id;
        const firstImageAsset = relatedEquipmentData.includes.Asset.find(
          (asset: any) => asset.sys.id === firstImageId
        );
        setSelectedImage(`https:${firstImageAsset.fields.file.url}`);

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
    <section className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
      <article className="flex flex-col">
        <div className="flex flex-col text-left mx-4 p-4 rounded-t-md text-base-colors-100 bg-base-colors-200">
          <p className="name text-left font-medium text-3xl">{equipment.name}</p>
          <p className="font-bold text-5xl">{equipment.price}€</p>
        </div>
        <div className="flex flex-col">
          <div className="bg-base-colors-100/30 mx-4">
            <Image
              src={selectedImage}
              alt={equipment.name}
              width={500}
              height={500}
              style={{objectFit: "contain"}}
              className="mx-auto"
            />
          </div>
          <div className="flex flex-row justify-center bg-base-colors-200 rounded-b-md mx-4 mb-4 p-1">
            {equipment.images.map((image: any) => {
              const asset = assets.find((asset) => asset.sys.id === image.sys.id);
              if (!asset) return null;

              const imageUrl = `https:${asset.fields.file.url}`;

              return (
                <Image
                  key={image.sys.id}
                  src={imageUrl}
                  alt={image.sys.name}
                  width={100}
                  height={100}
                  style={{objectFit: "cover"}}
                  className="hover:opacity-75 hover:cursor-pointer mx-1 rounded-md"
                  onClick={() => setSelectedImage(imageUrl)}
                />
              );
            })}
          </div>
        </div>
      </article>
      <article className="flex flex-col text-left bg-base-colors-100 m-4 p-4">
        <h2 className="text-2xl font-bold mb-2 underline">Description:</h2>
        <p className="text-lg">{equipment.description}</p>
      </article>
      <article className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
        <h1 className="font-bold text-3xl text-base-colors-200 m-12">
          More Like This
        </h1>
        <div className="flex flex-row justify-evenly text-left items-start my-8">
          {relatedEquipments.map((relatedEquipment) => {
            const relatedImageAsset = relatedEquipment.images[0]
              ? assets.find(
                  (asset) => asset.sys.id === relatedEquipment.images[0].sys.id
                )
              : null;

            return (
              <div
                key={relatedEquipment.id}
                className="flex flex-col bg-base-colors-100 w-1/6 h-full rounded-md"
              >
                {relatedImageAsset && (
                  <Link href={`/equipment/${relatedEquipment.id}`} className="product flex flex-col justify-center items-left text-left align-middle p-2">
                    <Image
                      src={`https:${relatedImageAsset.fields.file.url}`}
                      alt={relatedEquipment.name}
                      width={200}
                      height={200}
                        style={{objectFit: "contain"}}
                      className="m-auto p-0 rounded-t-md"
                    />
                    <h2 className="name font-medium text-lg mx-2 mt-2 h-[55px] overflow-hidden text-ellipsis">
                      {relatedEquipment.name}
                    </h2>
                    <h3 className="font-bold text-3xl mx-2 mb-2 mt-1">
                      {relatedEquipment.price}€
                    </h3>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
};

export default EquipmentDetails;
