"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Vinyls = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
};

const VinylsDetails = ({ params }: { params: { id: string } }) => {
  const [vinyls, setVinyls] = useState<Vinyls | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedVinyls, setRelatedVinyls] = useState<Vinyls[]>([]);
  const { id } = params;

  useEffect(() => {
    const fetchVinylsData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const vinylsResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedVinylsResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=vinyls`
        );

        const vinylsData = await vinylsResponse.json();
        const relatedVinylsData = await relatedVinylsResponse.json();

        setVinyls({
          ...vinylsData.fields,
          id: vinylsData.sys.id,
        });
        setAssets(relatedVinylsData.includes.Asset);

        const otherVinyls = relatedVinylsData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledVinyls = otherVinyls.sort(() => 0.5 - Math.random());

        const selectedRelatedVinyls = shuffledVinyls
          .slice(0, 3)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedVinyls(selectedRelatedVinyls);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVinylsData();
  }, [id]);

  if (!vinyls) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{vinyls.name}</h1>
      <p>Kategorija: {vinyls.category}</p>
      <p>Cijena: {vinyls.price}€</p>
      {vinyls.images.map((image: any) => {
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
      <p>Opis: {vinyls.description}</p>;<h2>Related Vinyls</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedVinyls.map((relatedVinyl) => {
          const relatedImageAsset = relatedVinyl.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedVinyl.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedVinyl.id}>
              {relatedImageAsset && (
                <Link href={`/vinyls/${relatedVinyl.id}`}>
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <p>
                <Link href={`/vinyls/${relatedVinyl.id}`}>
                  {relatedVinyl.name}
                </Link>
              </p>
              <p>Cijena: {relatedVinyl.price}€</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VinylsDetails;
