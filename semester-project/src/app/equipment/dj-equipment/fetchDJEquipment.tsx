"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const FetchDJEquipments = () => {
  const [equipments, setEquipments] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=equipment`
        );

        const data = await response.json();

        const djEquipments = data.items.filter(
          (equipment: any) => equipment.fields.category === "DJ Equipment"
        );

        setEquipments(djEquipments);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEquipments = equipments.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < equipments.length) {
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
      <h1>Popis DIS JEY oprema:</h1>
      <ul>
        {currentEquipments?.map((equipment) => (
          <li key={equipment.sys.id}>
            <p>Kategorija: {equipment.fields.category}</p>
            <Link href={`/equipment/${equipment.sys.id}`}>
              <p>{equipment.fields.name}</p>
            </Link>
            {equipment.fields.images.length > 0 && (
              <>
                {(() => {
                  const image = equipment.fields.images[0];
                  const asset = assets.find(
                    (asset) => asset.sys.id === image.sys.id
                  );
                  if (!asset) return null;

                  const imageUrl = `https:${asset.fields.file.url}`;

                  return (
                    <Link
                      key={image.sys.id}
                      href={`/equipment/${equipment.sys.id}`}
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
            <p>Cijena: {equipment.fields.price}€</p>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Prethodna stranica</button>
        )}
        {indexOfLastItem < equipments.length && (
          <button onClick={handleNextPage}>Sljedeća stranica</button>
        )}
      </div>
    </div>
  );
};

export default FetchDJEquipments;
