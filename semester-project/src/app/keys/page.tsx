"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import keyboards from "../../components/images/products/keys/keyboards.jpg";
import synthesizers from "../../components/images/products/keys/synthesizers.jpg";
import accordions from "../../components/images/products/keys/accordions.jpg";
import pianos from "../../components/images/products/keys/pianos.jpg";

export const colors: Record<string, string> = {
  "Keyboards": "bg-green-500",
  "Synthesizers": "bg-blue-500",
  "Accordions": "bg-yellow-500",
  "Pianos": "bg-red-500"
};

export default function KeysPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">Keys</h1>
      <section className="grid grid-rows-1 md:grid-cols-3 gap-x-12 md:gap-x-36 gap-y-4 md:gap-y-12 m-4 md:m-8 mx-10 md:mx-20 text-center align-middle">
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/keys/keyboards/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={keyboards}
              alt="keyboards"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Keyboards</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/keys/synthesizers/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={synthesizers}
              alt="synthesizers"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Synthesizers</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/keys/accordions/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={accordions}
              alt="accordions"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Accordions</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/keys/pianos/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={pianos}
              alt="pianos"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Pianos</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
      </section>
      <Link href="/keys/all-keys" className="inline-block justify-center items-center text-center align-middle text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-6 md:mt-12">
        <h3 className="font-roboto font-medium text-xs md:text-xl">
          Display all products
        </h3>
      </Link>
    </article>
  );
}