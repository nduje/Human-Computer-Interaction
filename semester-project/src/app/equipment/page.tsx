"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import dj_equipment from "../../components/images/products/equipment/dj_equipment.jpg";
import amplifiers from "../../components/images/products/equipment/amplifiers.jpg";
import microphones from "../../components/images/products/equipment/microphones.jpg";
import speakers from "../../components/images/products/equipment/speakers.jpg";
import pedals from "../../components/images/products/equipment/pedals.jpg";

export default function EquipmentPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 m-12">
        Equipment
      </h1>
      <section className="grid grid-cols-3 gap-x-36 gap-y-12 m-8 mx-20 text-center align-middle">
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/equipment/dj-equipment/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={dj_equipment}
              alt="dj_equipment"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">DJ Equipment</h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/equipment/amplifiers/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={amplifiers}
              alt="amplifiers"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">Amplifiers</h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/equipment/microphones/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={microphones}
              alt="microphones"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">Microphones</h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between items-center text-center align-middle">
          <Link
            href="/equipment/speakers/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={speakers}
              alt="speakers"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">Speakers</h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between items-center text-center align-middle">
          <Link
            href="/equipment/pedals/"
            className="flex flex-col justify-between items-center text-center align-middle m-4 px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
              src={pedals}
              alt="pedals"
              className="rounded-md"
            />
            <h1 className="mb-auto mt-6 text-xl font-semibold">Pedals</h1>
          </Link>
          <hr className="border-[1.5px] w-full border-base-colors-100"></hr>
        </div>
      </section>
      <Link href="/equipment/all-equipment">
        <div className="inline-block justify-center items-center text-center align-middle  text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-12">
          <h3 className="font-roboto font-medium text-xl">
            Display all products
          </h3>
        </div>
      </Link>
    </article>
  );
}
