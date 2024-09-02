"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../components/styles/products.css";
import "../../../components/styles/scrollbar.css";
import error from "../../../components/images/error/error.png"

type Drum = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
  images: any[];
  id: string;
};

const DrumDetails = ({ params }: { params: { id: string } }) => {
  const [drum, setDrum] = useState<Drum | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedDrums, setRelatedDrums] = useState<Drum[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { id } = params;

  useEffect(() => {
    const fetchDrumData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const drumResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedDrumsResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=drums`
        );

        const drumData = await drumResponse.json();
        const relatedDrumsData = await relatedDrumsResponse.json();

        setDrum({
          ...drumData.fields,
          id: drumData.sys.id,
        });
        setAssets(relatedDrumsData.includes.Asset);

        const firstImageId = drumData.fields.images[0]?.sys.id;
        const firstImageAsset = relatedDrumsData.includes.Asset.find(
          (asset: any) => asset.sys.id === firstImageId
        );
        setSelectedImage(`https:${firstImageAsset.fields.file.url}`);

        const otherDrums = relatedDrumsData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledDrums = otherDrums.sort(() => 0.5 - Math.random());

        const selectedRelatedDrums = shuffledDrums
          .slice(0, 3)
          .map((item: any) => ({
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

  const getImageUrl = (imageId: string) => {
    const asset = assets.find((asset: any) => asset.sys.id === imageId);
    return asset ? `https:${asset.fields.file.url}` : null;
  };

  if (!drum) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col font-roboto text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 w-screen h-auto md:w-auto md:m-12 overflow-hidden">
      <article className="flex flex-col">
        <div className="grid-span-4 flex flex-col text-left w-screen md:w-auto m-auto md:mx-4 p-2 md:p-4 md:rounded-t-md text-base-colors-100 bg-base-colors-200">
          <p className="name text-left font-medium text-lg md:text-3xl">{drum.name}</p>
          <p className="font-bold text-xl md:text-5xl">{drum.price}€</p>
        </div>
        <div className="flex flex-col">
          <div className="hidden md:flex bg-base-colors-100/30 mx-4">
            <Image
              src={selectedImage || error}
              alt={drum.name}
              width={500}
              height={500}
              style={{ objectFit: "contain" }}
              className="mx-auto"
            />
          </div>
          <div className="scrollbar flex flex-row justify-start md:justify-center items-start md:items-center align-middle md:bg-base-colors-200 rounded-b-md mx-auto md:mx-4 mb-4 md:p-1 overflow-x-auto snap-x snap-mandatory whitespace-nowrap">
            {drum.images.map((image: any) => {
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
                  style={{ objectFit: "cover" }}
                  className="w-screen h-auto md:w-[100px] md:h-[100px] md:hover:opacity-75 hover:cursor-pointer m-0 mx-0 p-0 md:mx-1 md:rounded-md flex-shrink-0 snap-center snap-always"
                  onClick={() => setSelectedImage(imageUrl)}
                />
              );
            })}
          </div>
        </div>
      </article>
      <article className="flex flex-col w-screen md:w-fit text-left bg-base-colors-100 m-0 md:m-4 p-2 md:p-4">
        <h2 className="w-full max-w-full text-base md:text-2xl font-bold mb-1 md:mb-2 underline">Description:</h2>
        <p className="w-full max-w-full break-words overflow-hidden whitespace-normal text-xs md:text-lg">{drum.description}</p>
      </article>
      <article className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto md:m-12">
        <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 mt-6 md:m-12">More Like This</h1>
        <ul className="scrollbar flex flex-row justify-evenly text-left items-start align-middle p-4 md:p-0 md:my-8 overflow-x-auto snap-x snap-mandatory">
            {relatedDrums.map((item) => (
            <li key={item.id} className="flex flex-col bg-base-colors-100 w-1/2 md:w-1/6 rounded-md flex-shrink-0 snap-center snap-always mx-[25vw] md:mx-2">
                <Link href={`/drums/${item.id}`} className="product flex flex-col justify-center items-left text-left align-middle rounded-md m-auto">
                    {item.images && item.images.length > 0 && (
                      <Image
                          src={getImageUrl(item.images[0].sys.id) || error}
                          alt={item.name}
                          width={512}
                          height={512}
                          style={{objectFit: "contain"}}
                          className="w-full h-full m-0 p-0 border-x-8 border-t-8 rounded-t-md border-base-colors-100"
                      />
                    )}
                    <h2 className="name font-medium text-sm md:text-lg mx-2 mt-1 md:mt-2 h-[60px] md:h-[55px] overflow-hidden text-ellipsis">{item.name}</h2>
                    <h3 className="font-bold text-xl md:text-3xl mx-2 mb-1 md:mb-2 mt-1">{item.price}€</h3>
                </Link>
            </li>
            ))}
        </ul>
      </article>
    </section>
  );
};

export default DrumDetails;
