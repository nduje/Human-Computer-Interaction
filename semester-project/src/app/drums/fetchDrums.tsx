"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FetchDrums = () => {
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

        setDrums(data.items);
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
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  };

  return (
    <div>
      <h1>Popis bubnjeva:</h1>
      <ul>
        {currentDrums?.map((drum) => (
          <li key={drum.sys.id}>
            <p>ID: {drum.fields.id}</p>
            <p>
              <Link href={`/drums-and-percussion/${drum.sys.id}`}>
                {drum.fields.name}
              </Link>
            </p>
            <p>Tip: {drum.fields.type}</p>
            {drum.fields.images.map((image: any) => {
              const asset = assets.find(
                (asset) => asset.sys.id === image.sys.id
              );
              if (!asset) return null;

              const imageUrl = `https:${asset.fields.file.url}`;

              return (
                <Link
                  key={image.sys.id}
                  href={`/drums-and-percussion/${drum.sys.id}`}
                >
                  <img
                    src={imageUrl}
                    width={asset.fields.file.details.image.width}
                    height={asset.fields.file.details.image.height}
                  />
                </Link>
              );
            })}
            <p>Ocjena: {drum.fields.rating}</p>
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

export default FetchDrums;
