"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import string_instruments from "../../components/images/products/orchestra/string_instruments.jpg";
import wind_instruments from "../../components/images/products/orchestra/wind_instruments.jpg";
import percussion from "../../components/images/products/orchestra/percussion.jpg";

export const colors: Record<string, string> = {
  "String Instruments": "bg-green-500",
  "Wind Instruments": "bg-blue-500",
  "Percussion": "bg-yellow-500"
};

export default function OrchestraPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 m-12">
        Orchestra
      </h1>
      <section className="grid grid-cols-3 gap-x-36 gap-y-12 m-8 mx-20 text-center align-middle">
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/orchestra/string-instruments/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={string_instruments}
              alt="string_instruments"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">
              String Instruments
            </h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/orchestra/wind-instruments/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={wind_instruments}
              alt="wind_instruments"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">
              Wind Instruments
            </h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/orchestra/percussion/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={percussion}
              alt="percussion"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">Percussion</h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
      </section>
      <Link href="/orchestra/all-orchestra">
        <div className="inline-block justify-center items-center text-center align-middle  text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-12">
          <h3 className="font-roboto font-medium text-xl">
            Display all products
          </h3>
        </div>
      </Link>
    </article>
  );
}
