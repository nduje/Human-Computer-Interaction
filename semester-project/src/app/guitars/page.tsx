"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import electric_guitars from "../../components/images/products/guitars/electric_guitars.jpg";
import acoustic_guitars from "../../components/images/products/guitars/acoustic_guitars.jpg";
import basses from "../../components/images/products/guitars/basses.jpg";

export const colors: Record<string, string> = {
  "Electric Guitars": "bg-green-500",
  "Acoustic Guitars": "bg-blue-500",
  "Basses": "bg-yellow-500"
};

export default function GuitarsPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 m-12">Guitars</h1>
      <section className="grid grid-cols-3 gap-x-36 gap-y-12 m-8 mx-20 text-center align-middle">
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/guitars/electric-guitars/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={electric_guitars}
              alt="electric_guitars"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">
              Electric Guitars
            </h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/guitars/acoustic-guitars/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={acoustic_guitars}
              alt="acoustic_guitars"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">
              Acoustic Guitars
            </h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/guitars/basses/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={basses}
              alt="basses"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">Basses</h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
      </section>
      <Link href="/guitars/all-guitars">
        <div className="inline-block justify-center items-center text-center align-middle  text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-12">
          <h3 className="font-roboto font-medium text-xl">
            Display all products
          </h3>
        </div>
      </Link>
    </article>
  );
}
