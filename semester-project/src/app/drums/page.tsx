"use client";

import Link from "next/link";
import Image from "next/image";
import acoustic_drums from "../../components/images/products/drums/acoustic_drums.jpg";
import electronic_drums from "../../components/images/products/drums/electronic_drums.jpg";
import cymbals from "../../components/images/products/drums/cymbals.jpg";
import sticks_and_mallets from "../../components/images/products/drums/sticks_and_mallets.jpg";

export default function DrumsPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">Drums</h1>
      <section className="grid grid-rows-1 lg:grid-cols-3 gap-x-12 md:gap-x-36 gap-y-4 lg:gap-y-12 m-4 lg:m-8 mx-10 lg:mx-20 text-center align-middle">
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/drums/acoustic-drums/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={acoustic_drums}
              alt="acoustic_drums"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              Acoustic Drums
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/drums/electronic-drums/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={electronic_drums}
              alt="electronic_drums"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              Electronic Drums
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/drums/cymbals/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={cymbals}
              alt="cymbals"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Cymbals</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/drums/sticks-and-mallets/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={sticks_and_mallets}
              alt="sticks_and_mallets"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              Sticks and Mallets
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
      </section>
      <Link href="/drums/all-drums" className="inline-block justify-center items-center text-center align-middle text-base-colors-50 bg-base-colors-200 active:bg-base-colors-300 md:hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-6 md:mt-12">
        <h3 className="font-roboto font-medium text-base md:text-xl">
          Display all products
        </h3>
      </Link>
    </article>
  );
}