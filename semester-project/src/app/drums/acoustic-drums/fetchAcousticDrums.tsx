"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FetchAcousticDrums = () => {
  const [drums, setDrums] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=drums`
        );

        const data = await response.json();

        // Filtriranje samo akustičnih bubnjeva
        const acousticDrums = data.items.filter(
          (drum: any) => drum.fields.category === "Acoustic Drums"
        );

        setDrums(acousticDrums);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDrums = drums.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < drums.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <h1>Popis akustičnih bubnjeva:</h1>
      <ul>
        {currentDrums?.map((drum) => (
          <li key={drum.sys.id}>
            <p>Kategorija: {drum.fields.category}</p>
            <Link href={`/drums/${drum.sys.id}`}>
              <p>{drum.fields.name}</p>
            </Link>
            {drum.fields.images.length > 0 && (
              <>
                {(() => {
                  const image = drum.fields.images[0];
                  const asset = assets.find(
                    (asset) => asset.sys.id === image.sys.id
                  );
                  if (!asset) return null;

                  const imageUrl = `https:${asset.fields.file.url}`;

                  return (
                    <Link
                      key={image.sys.id}
                      href={`/drums/${drum.sys.id}`}
                    >
                      <img
                        src={imageUrl}
                        width={asset.fields.file.details.image.width}
                        height={asset.fields.file.details.image.height}
                      />
                    </Link>
                  );
                })()}
              </>
            )}
            <p>Cijena: {drum.fields.price}€</p>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Prethodna stranica</button>
        )}
        {indexOfLastItem < drums.length && (
          <button onClick={handleNextPage}>Sljedeća stranica</button>
        )}
      </div>
    </div>
  );
};

export default FetchAcousticDrums;
