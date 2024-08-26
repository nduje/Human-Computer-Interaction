"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../components/styles/products.css";

type Keys = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
  images: any[];
};

const KeysDetails = ({ params }: { params: { id: string } }) => {
  const [keys, setKeys] = useState<Keys | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedKeys, setRelatedKeys] = useState<Keys[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { id } = params;

  useEffect(() => {
    const fetchKeysData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const keysResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedKeysResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=keys`
        );

        const keysData = await keysResponse.json();
        const relatedKeysData = await relatedKeysResponse.json();

        setKeys({
          ...keysData.fields,
          id: keysData.sys.id,
        });
        setAssets(relatedKeysData.includes.Asset);

        const firstImageId = keysData.fields.images[0]?.sys.id;
        const firstImageAsset = relatedKeysData.includes.Asset.find(
          (asset: any) => asset.sys.id === firstImageId
        );
        setSelectedImage(`https:${firstImageAsset.fields.file.url}`);

        const otherKeys = relatedKeysData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledKeys = otherKeys.sort(() => 0.5 - Math.random());

        const selectedRelatedKeys = shuffledKeys
          .slice(0, 3)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedKeys(selectedRelatedKeys);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchKeysData();
  }, [id]);

  if (!keys) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
      <article className="flex flex-col">
        <div className="flex flex-col text-left mx-4 p-4 rounded-t-md text-base-colors-100 bg-base-colors-200">
          <p className="name text-left font-medium text-3xl">{keys.name}</p>
          <p className="font-bold text-5xl">{keys.price}€</p>
        </div>
        <div className="flex flex-col">
          <div className="bg-base-colors-100/30 mx-4">
            <Image
              src={selectedImage}
              alt={keys.name}
              width={500}
              height={500}
              style={{ objectFit: "contain" }}
              className="mx-auto"
            />
          </div>
          <div className="flex flex-row justify-center bg-base-colors-200 rounded-b-md mx-4 mb-4 p-1">
            {keys.images.map((image: any) => {
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
        <p className="text-lg">{keys.description}</p>
      </article>
      <article className="flex font-roboto flex-col text-center align-middle justify-center text-base-colors-200 bg-base-colors-50 h-auto w-auto m-12">
        <h1 className="font-bold text-3xl text-base-colors-200 m-12">More Like This</h1>
        <div className="flex flex-row justify-evenly text-left items-start my-8">
          {relatedKeys.map((relatedKey) => {
            const relatedImageAsset = relatedKey.images[0]
              ? assets.find((asset) => asset.sys.id === relatedKey.images[0].sys.id)
              : null;

            return (
              <div
                key={relatedKey.id}
                className="flex flex-col bg-base-colors-100 w-1/6 h-full rounded-md"
              >
                {relatedImageAsset && (
                  <Link href={`/keys/${relatedKey.id}`} className="product flex flex-col justify-center items-left text-left align-middle p-2">
                    <Image
                      src={`https:${relatedImageAsset.fields.file.url}`}
                      alt={relatedKey.name}
                      width={200}
                      height={200}
                      style={{ objectFit: "contain" }}
                      className="m-auto p-0 border-base-colors-100"
                    />
                    <h2 className="name font-medium text-lg mx-2 mt-2 h-[55px] overflow-hidden text-ellipsis">
                      {relatedKey.name}
                    </h2>
                    <h3 className="font-bold text-3xl mx-2 mb-2 mt-1">
                      {relatedKey.price}€
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

export default KeysDetails;
