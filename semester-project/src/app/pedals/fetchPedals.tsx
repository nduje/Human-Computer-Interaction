"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FetchPedals = () => {
  const [pedals, setPedals] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=pedal`
        );

        const data = await response.json();

        setPedals(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPedals = pedals.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < pedals.length) {
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
      <h1>Popis pedala:</h1>
      <ul>
        {currentPedals?.map((pedal) => (
          <li key={pedal.sys.id}>
            <p>ID: {pedal.fields.id}</p>
            <p>
              <Link href={`/pedals/${pedal.sys.id}`}>{pedal.fields.name}</Link>
            </p>
            {pedal.fields.images.map((image: any) => {
              const asset = assets.find(
                (asset) => asset.sys.id === image.sys.id
              );
              if (!asset) return null;

              const imageUrl = `https:${asset.fields.file.url}`;

              return (
                <Link key={image.sys.id} href={`/pedals/${pedal.sys.id}`}>
                  <img
                    src={imageUrl}
                    width={asset.fields.file.details.image.width}
                    height={asset.fields.file.details.image.height}
                  />
                </Link>
              );
            })}
            <p>Ocjena: {pedal.fields.rating}</p>
            <p>Cijena: {pedal.fields.price}€</p>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Prethodna stranica</button>
        )}
        {indexOfLastItem < pedals.length && (
          <button onClick={handleNextPage}>Sljedeća stranica</button>
        )}
      </div>
    </div>
  );
};

export default FetchPedals;
