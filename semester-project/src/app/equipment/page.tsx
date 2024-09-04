"use client";

import Link from "next/link";
import Image from "next/image";
import dj_equipment from "../../components/images/products/equipment/dj_equipment.jpg";
import amplifiers from "../../components/images/products/equipment/amplifiers.jpg";
import microphones from "../../components/images/products/equipment/microphones.jpg";
import speakers from "../../components/images/products/equipment/speakers.jpg";
import pedals from "../../components/images/products/equipment/pedals.jpg";

export default function EquipmentPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">
        Equipment
      </h1>
      <section className="grid grid-rows-1 lg:grid-cols-3 gap-x-12 md:gap-x-36 gap-y-4 lg:gap-y-12 m-4 lg:m-8 mx-10 lg:mx-20 text-center align-middle">
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/equipment/dj-equipment/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={dj_equipment}
              alt="dj_equipment"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              DJ Equipment
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/equipment/amplifiers/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={amplifiers}
              alt="amplifiers"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              Amplifiers
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/equipment/microphones/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={microphones}
              alt="microphones"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              Microphones
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/equipment/speakers/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={speakers}
              alt="speakers"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              Speakers
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/equipment/pedals/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={pedals}
              alt="pedals"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              Pedals
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
      </section>
      <Link href="/equipment/all-equipment" className="inline-block justify-center items-center text-center align-middle text-base-colors-50 bg-base-colors-200 active:bg-base-colors-300 md:hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-6 md:mt-12">
        <h3 className="font-roboto font-medium text-base md:text-xl">
          Display all products
        </h3>
      </Link>
    </article>
  );
}