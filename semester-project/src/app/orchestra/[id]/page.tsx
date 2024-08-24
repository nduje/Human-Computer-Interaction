"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Instruments = {
  name: string;
  type: string;
  rating: number;
  price: number;
  description: string;
};

const InstrumentsDetails = ({ params }: { params: { id: string } }) => {
  const [instruments, setInstruments] = useState<Instruments | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [relatedInstruments, setRelatedInstruments] = useState<Instruments[]>(
    []
  );
  const { id } = params;

  useEffect(() => {
    const fetchInstrumentsData = async () => {
      if (!id) return;

      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const instrumentsResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}`
        );
        const relatedInstrumentsResponse = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=orchestra`
        );

        const instrumentsData = await instrumentsResponse.json();
        const relatedInstrumentsData = await relatedInstrumentsResponse.json();

        setInstruments({
          ...instrumentsData.fields,
          id: instrumentsData.sys.id,
        });
        setAssets(relatedInstrumentsData.includes.Asset);

        const otherInstruments = relatedInstrumentsData.items.filter(
          (item: any) => item.sys.id !== id
        );

        const shuffledInstruments = otherInstruments.sort(
          () => 0.5 - Math.random()
        );

        const selectedRelatedInstruments = shuffledInstruments
          .slice(0, 3)
          .map((item: any) => ({
            ...item.fields,
            id: item.sys.id,
          }));

        setRelatedInstruments(selectedRelatedInstruments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInstrumentsData();
  }, [id]);

  if (!instruments) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{instruments.name}</h1>
      <p>Kategorija: {instruments.category}</p>
      <p>Cijena: {instruments.price}€</p>
      {instruments.images.map((image: any) => {
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
      <p>Opis: {instruments.description}</p>;<h2>Related Orchestra</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {relatedInstruments.map((relatedInstrument) => {
          const relatedImageAsset = relatedInstrument.images[0]
            ? assets.find(
                (asset) => asset.sys.id === relatedInstrument.images[0].sys.id
              )
            : null;

          return (
            <div key={relatedInstrument.id}>
              {relatedImageAsset && (
                <Link href={`/orchestra/${relatedInstrument.id}`}>
                  <img
                    src={`https:${relatedImageAsset.fields.file.url}`}
                    width="200"
                    height="200"
                  />
                </Link>
              )}
              <p>
                <Link href={`/orchestra/${relatedInstrument.id}`}>
                  {relatedInstrument.name}
                </Link>
              </p>
              <p>Cijena: {relatedInstrument.price}€</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstrumentsDetails;
