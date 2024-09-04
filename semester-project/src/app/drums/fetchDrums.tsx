"use client";

import { useEffect, useState } from "react";
import "../../components/styles/products.css";
import "../../components/home/SortSection"
import Sort from "../../components/home/SortSection";
import ProductsList from "../../components/home/ProductsListSection";

const FetchDrums = () => {
  const [drums, setDrums] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);


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

  return (
    <section className="flex flex-col justify-center items-center align-middle text-center text-base-colors-200 m-0">
      <Sort items={drums} setItems={setDrums} setCurrentPage={setCurrentPage} />

      <ProductsList items={drums} assets={assets} />
    </section>
  );
};

export default FetchDrums;
