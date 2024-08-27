"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import rock from "../../components/images/products/vinyls/rock.jpg";
import pop from "../../components/images/products/vinyls/pop.jpg";
import heavy_metal from "../../components/images/products/vinyls/heavy_metal.jpg";
import jazz_and_blues from "../../components/images/products/vinyls/jazz_and_blues.jpg";
import hip_hop_and_rap from "../../components/images/products/vinyls/hip_hop_and_rap.jpg";

export const colors: Record<string, string> = {
  "Rock": "bg-green-500",
  "Pop": "bg-blue-500",
  "Heavy Metal": "bg-yellow-500",
  "Jazz & Blues": "bg-red-500",
  "Hip Hop & Rap": "bg-purple-500"
};

export default function VinylsPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">
        Vinyls
      </h1>
      <section className="grid grid-rows-1 md:grid-cols-3 gap-x-12 md:gap-x-36 gap-y-4 md:gap-y-12 m-4 md:m-8 mx-10 md:mx-20 text-center align-middle">
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/vinyls/rock/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={rock}
              alt="rock"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Rock</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/vinyls/pop/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={pop}
              alt="pop"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Pop</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/vinyls/heavy-metal/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={heavy_metal}
              alt="heavy_metal"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Heavy Metal</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/vinyls/jazz-blues/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={jazz_and_blues}
              alt="jazz_and_blues"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Jazz & Blues</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/vinyls/hip-hop/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={hip_hop_and_rap}
              alt="hip_hop_and_rap"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Hip Hop & Rap</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
      </section>
      <Link href="/vinyls/all-vinyls/" className="inline-block justify-center items-center text-center align-middle text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-6 md:mt-12">
        <h3 className="font-roboto font-medium text-xs md:text-xl">
          Display all products
        </h3>
      </Link>
    </article>
  );
}