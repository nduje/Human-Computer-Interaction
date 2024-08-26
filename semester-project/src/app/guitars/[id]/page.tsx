"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../components/styles/products.css";

type Guitar = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
  images: any[];
};

const GuitarDetails = ({ params }: { params: { id: string } }) => {
  const [guitar, setGuitar] = useState<Guitar | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedGuitars, setRelatedGuitars] = useState<Guitar[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=guitars`
        );

        const guitarData = await guitarResponse.json();
        const relatedGuitarsData = await relatedGuitarsResponse.json();

        setGuitar({
          ...guitarData.fields,
          id: guitarData.sys.id,
        });
        setAssets(relatedGuitarsData.includes.Asset);

        const firstImageId = guitarData.fields.images[0]?.sys.id;
        const firstImageAsset = relatedGuitarsData.includes.Asset.find(
          (asset: any) => asset.sys.id === firstImageId
        );
        setSelectedImage(`https:${firstImageAsset.fields.file.url}`);

        const otherGuitars = relatedGuitarsData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledGuitars = otherGuitars.sort(() => 0.5 - Math.random());

        const selectedRelatedGuitars = shuffledGuitars
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
    <section className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
      <article className="flex flex-col">
        <div className="flex flex-col text-left mx-4 p-4 rounded-t-md text-base-colors-100 bg-base-colors-200">
          <p className="name text-left font-medium text-3xl">{guitar.name}</p>
          <p className="font-bold text-5xl">{guitar.price}€</p>
        </div>
        <div className="flex flex-col">
          <div className="bg-base-colors-100/30 mx-4">
            <Image
              src={selectedImage}
              alt={guitar.name}
              width={500}
              height={500}
              style={{ objectFit: "contain" }}
              className="mx-auto"
            />
          </div>
          <div className="flex flex-row justify-center bg-base-colors-200 rounded-b-md mx-4 mb-4 p-1">
            {guitar.images.map((image: any) => {
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
                  style={{ objectFit: "cover" }}
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
        <p className="text-lg">{guitar.description}</p>
      </article>
      <article className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
        <h1 className="font-bold text-3xl text-base-colors-200 m-12">More Like This</h1>
        <div className="flex flex-row justify-evenly text-left items-start my-8">
          {relatedGuitars.map((relatedGuitar) => {
            const relatedImageAsset = relatedGuitar.images[0]
              ? assets.find((asset) => asset.sys.id === relatedGuitar.images[0].sys.id)
              : null;

            return (
              <div
                key={relatedGuitar.id}
                className="flex flex-col bg-base-colors-100 w-1/6 h-full rounded-md"
              >
                {relatedImageAsset && (
                  <Link href={`/guitars/${relatedGuitar.id}`} className="product flex flex-col justify-center items-left text-left align-middle p-2">
                    <Image
                      src={`https:${relatedImageAsset.fields.file.url}`}
                      alt={relatedGuitar.name}
                      width={200}
                      height={200}
                      style={{ objectFit: "contain" }}
                      className="m-auto p-0 border-base-colors-100"
                    />
                    <h2 className="name font-medium text-lg mx-2 mt-2 h-[55px] overflow-hidden text-ellipsis">
                      {relatedGuitar.name}
                    </h2>
                    <h3 className="font-bold text-3xl mx-2 mb-2 mt-1">
                      {relatedGuitar.price}€
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

export default GuitarDetails;
