"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Keys = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
};

const KeysDetails = ({ params }: { params: { id: string } }) => {
  const [keys, setKeys] = useState<Keys | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedKeys, setRelatedKeys] = useState<Keys[]>([]);
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
    <div>
      <h1>{keys.name}</h1>
      <p>Kategorija: {keys.category}</p>
      <p>Cijena: {keys.price}€</p>
      {keys.images.map((image: any) => {
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
      <p>Opis: {keys.description}</p>;<h2>Related Keys</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedKeys.map((relatedKey) => {
          const relatedImageAsset = relatedKey.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedKey.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedKey.id}>
              {relatedImageAsset && (
                <Link href={`/keys/${relatedKey.id}`}>
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <p>
                <Link href={`/keys/${relatedKey.id}`}>{relatedKey.name}</Link>
              </p>
              <p>Cijena: {relatedKey.price}€</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeysDetails;
