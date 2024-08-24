"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FetchHeavyMetal = () => {
  const [vinyls, setVinyls] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=vinyls`
        );

        const data = await response.json();

        const heavyMetalVinyls = data.items.filter(
          (vinyl: any) => vinyl.fields.category === "Heavy Metal"
        );

        setVinyls(heavyMetalVinyls);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVinyls = vinyls.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < vinyls.length) {
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
      <h1>Popis Heavy Metala:</h1>
      <ul>
        {currentVinyls?.map((vinyl) => (
          <li key={vinyl.sys.id}>
            <p>Kategorija: {vinyl.fields.category}</p>
            <Link href={`/vinyls/${vinyl.sys.id}`}>
              <p>{vinyl.fields.name}</p>
            </Link>
            {vinyl.fields.images.length > 0 && (
              <>
                {(() => {
                  const image = vinyl.fields.images[0];
                  const asset = assets.find(
                    (asset) => asset.sys.id === image.sys.id
                  );
                  if (!asset) return null;

                  const imageUrl = `https:${asset.fields.file.url}`;

                  return (
                    <Link key={image.sys.id} href={`/vinyls/${vinyl.sys.id}`}>
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
            <p>Cijena: {vinyl.fields.price}€</p>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Prethodna stranica</button>
        )}
        {indexOfLastItem < vinyls.length && (
          <button onClick={handleNextPage}>Sljedeća stranica</button>
        )}
      </div>
    </div>
  );
};

export default FetchHeavyMetal;
