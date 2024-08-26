"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../components/styles/products.css";

type Drum = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
  images: any[];
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

  if (!drum) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
      <article className="flex flex-col">
        <div className="flex flex-col text-left mx-4 p-4 rounded-t-md text-base-colors-100 bg-base-colors-200">
          <p className="name text-left font-medium text-3xl">{drum.name}</p>
          <p className="font-bold text-5xl">{drum.price}€</p>
        </div>
        <div className="flex flex-col">
          <div className="bg-base-colors-100/30 mx-4">
            <Image
              src={selectedImage}
              alt={drum.name}
              width={500}
              height={500}
              style={{ objectFit: "contain" }}
              className="mx-auto"
            />
          </div>
          <div className="flex flex-row justify-center bg-base-colors-200 rounded-b-md mx-4 mb-4 p-1">
            {drum.images.map((image: any) => {
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
        <p className="text-lg">{drum.description}</p>
      </article>
      <article className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
        <h1 className="font-bold text-3xl text-base-colors-200 m-12">More Like This</h1>
        <div className="flex flex-row justify-evenly text-left items-start my-8">
          {relatedDrums.map((relatedDrum) => {
            const relatedImageAsset = relatedDrum.images[0]
              ? assets.find((asset) => asset.sys.id === relatedDrum.images[0].sys.id)
              : null;

            return (
              <div
                key={relatedDrum.id}
                className="flex flex-col bg-base-colors-100 w-1/6 h-full rounded-md"
              >
                {relatedImageAsset && (
                  <Link href={`/drums/${relatedDrum.id}`} className="product flex flex-col justify-center items-left text-left align-middle p-2">
                    <Image
                      src={`https:${relatedImageAsset.fields.file.url}`}
                      alt={relatedDrum.name}
                      width={200}
                      height={200}
                      style={{ objectFit: "contain" }}
                      className="m-auto p-0 rounded-t-md"
                    />
                    <h2 className="name font-medium text-lg mx-2 mt-2 h-[55px] overflow-hidden text-ellipsis">
                      {relatedDrum.name}
                    </h2>
                    <h3 className="font-bold text-3xl mx-2 mb-2 mt-1">
                      {relatedDrum.price}€
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

export default DrumDetails;
