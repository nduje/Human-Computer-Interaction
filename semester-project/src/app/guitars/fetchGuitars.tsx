"use client";

import { useEffect, useState } from "react";
import "../../components/styles/products.css";
import Sort from "../../components/home/SortSection";
import ProductList from "../../components/home/ProductsListSection";

const FetchGuitars = () => {
  const [guitars, setGuitars] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const SPACE_ID = "kxdn75bdbglk";
        const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=guitars`
        );

        const data = await response.json();

        setGuitars(data.items);
        setAssets(data.includes.Asset);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <section className="flex flex-col justify-center items-center text-center text-base-colors-200 m-0">
      <Sort items={guitars} setItems={setGuitars} setCurrentPage={setCurrentPage} />

      <ProductList items={guitars} assets={assets} />
    </section>
  );
};

export default FetchGuitars;
