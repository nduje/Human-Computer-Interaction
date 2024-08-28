"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../components/styles/products.css";
import "../../../components/styles/scrollbar.css";
import error from "../../../components/images/error/error.png"

type Equipment = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
  images: any[];
  id: string;
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
    <section className="flex flex-col font-roboto text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 w-screen h-auto md:w-auto md:m-12 overflow-hidden">
      <article className="flex flex-col">
        <div className="grid-span-4 flex flex-col text-left w-screen md:w-auto m-auto md:mx-4 p-2 md:p-4 md:rounded-t-md text-base-colors-100 bg-base-colors-200">
          <p className="name text-left font-medium text-lg md:text-3xl">{equipment.name}</p>
          <p className="font-bold text-xl md:text-5xl">{equipment.price}€</p>
        </div>
        <div className="flex flex-col">
          <div className="hidden md:flex bg-base-colors-100/30 mx-4">
            <Image
              src={selectedImage || error}
              alt={equipment.name}
              width={500}
              height={500}
              style={{objectFit: "contain"}}
              className="mx-auto"
            />
          </div>
          <div className="scrollbar flex flex-row justify-start md:justify-center items-start md:items-center align-middle md:bg-base-colors-200 rounded-b-md mx-auto md:mx-4 mb-4 md:p-1 overflow-x-auto snap-x snap-mandatory whitespace-nowrap">
            {equipment.images.map((image: any) => {
              const asset = assets.find((asset) => asset.sys.id === image.sys.id);
              if (!asset) return null;

              const imageUrl = `https:${asset.fields.file.url}`;

              return (
                <Image
                  key={image.sys.id}
                  src={imageUrl}
                  alt={image.sys.name}
                  width={512}
                  height={512}
                  style={{objectFit: "cover"}}
                  className="w-screen h-auto md:w-[100px] md:h-[100px] md:hover:opacity-75 hover:cursor-pointer m-0 mx-0 p-0 md:mx-1 md:rounded-md flex-shrink-0 snap-center snap-always"
                  onClick={() => setSelectedImage(imageUrl)}
                />
              );
            })}
          </div>
        </div>
      </article>
      <article className="flex flex-col text-left w-screen bg-base-colors-100 m-0 md:m-4 p-2 md:p-4">
      <h2 className="text-base md:text-2xl font-bold mb-1 md:mb-2 underline">Description:</h2>
        <p className="text-xs md:text-lg">{equipment.description}</p>
      </article>
      <article className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto md:m-12">
        <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 mt-6 md:m-12">More Like This</h1>
        <div className="scrollbar flex flex-row justify-evenly text-left items-start align-middle md:my-8 p-4 md:p-0 overflow-x-auto snap-x snap-mandatory">
          {relatedEquipments.map((relatedEquipment) => {
            const relatedImageAsset = relatedEquipment.images[0]
              ? assets.find(
                  (asset) => asset.sys.id === relatedEquipment.images[0].sys.id
                )
              : null;

            return (
              <div
                key={relatedEquipment.id}
                className="flex flex-col bg-base-colors-100 w-1/2 md:w-1/6 rounded-md flex-shrink-0 snap-center snap-always mx-[25vw] md:mx-2"
              >
                {relatedImageAsset && (
                  <Link href={`/equipment/${relatedEquipment.id}`} className="product flex flex-col justify-center items-left text-left rounded-md align-middle m-auto">
                    <Image
                      src={`https:${relatedImageAsset.fields.file.url}`}
                      alt={relatedEquipment.name}
                      width={200}
                      height={200}
                        style={{objectFit: "contain"}}
                      className="w-full md:w-[200px] h-full md:h-[200px] m-0 md:mt-2 md:mx-auto p-0 border-x-8 border-t-8 md:border-0 rounded-t-md border-base-colors-100"
                    />
                    <h2 className="name font-medium text-sm md:text-lg mx-2 mt-1 md:mt-2 h-[60px] md:h-[55px] overflow-hidden text-ellipsis">
                      {relatedEquipment.name}
                    </h2>
                    <h3 className="font-bold text-lg md:text-3xl mx-2 mb-1 md:mb-2 mt-1">
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
