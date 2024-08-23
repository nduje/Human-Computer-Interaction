"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FetchKeys = () => {
  const [keys, setKeys] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=keys`
        );

        const data = await response.json();

        setKeys(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKeys = keys.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < keys.length) {
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
      <h1>Popis klavijatura:</h1>
      <ul>
        {currentKeys?.map((key) => (
          <li key={key.sys.id}>
            <p>Kategorija: {key.fields.category}</p>
            <Link href={`/keys/${key.sys.id}`}>
              <p>{key.fields.name}</p>
            </Link>
            {key.fields.images.length > 0 && (
              <>
                {(() => {
                  const image = key.fields.images[0];
                  const asset = assets.find(
                    (asset) => asset.sys.id === image.sys.id
                  );
                  if (!asset) return null;

                  const imageUrl = `https:${asset.fields.file.url}`;

                  return (
                    <Link key={image.sys.id} href={`/keys/${key.sys.id}`}>
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
            <p>Cijena: {key.fields.price}€</p>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Prethodna stranica</button>
        )}
        {indexOfLastItem < keys.length && (
          <button onClick={handleNextPage}>Sljedeća stranica</button>
        )}
      </div>
    </div>
  );
};

export default FetchKeys;
