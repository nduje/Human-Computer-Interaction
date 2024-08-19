"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FetchKeyboards = () => {
  const [keyboards, setKeyboards] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=keyboard`
        );

        const data = await response.json();

        setKeyboards(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentKeyboards = keyboards.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < keyboards.length) {
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
      <h1>Popis klavijatura:</h1>
      <ul>
        {currentKeyboards?.map((keyboard) => (
          <li key={keyboard.sys.id}>
            <p>ID: {keyboard.fields.id}</p>
            <p>
              <Link href={`/keyboards-and-piano/${keyboard.sys.id}`}>
                {keyboard.fields.name}
              </Link>
            </p>
            <p>Tip: {keyboard.fields.type}</p>
            {keyboard.fields.images.map((image: any) => {
              const asset = assets.find(
                (asset) => asset.sys.id === image.sys.id
              );
              if (!asset) return null;

              const imageUrl = `https:${asset.fields.file.url}`;

              return (
                <Link
                  key={image.sys.id}
                  href={`/keyboards-and-piano/${keyboard.sys.id}`}
                >
                  <img
                    key={image.sys.id}
                    src={imageUrl}
                    width={asset.fields.file.details.image.width}
                    height={asset.fields.file.details.image.height}
                  />
                </Link>
              );
            })}
            <p>Ocjena: {keyboard.fields.rating}</p>
            <p>Cijena: {keyboard.fields.price}€</p>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Prethodna stranica</button>
        )}
        {indexOfLastItem < keyboards.length && (
          <button onClick={handleNextPage}>Sljedeća stranica</button>
        )}
      </div>
    </div>
  );
};

export default FetchKeyboards;
