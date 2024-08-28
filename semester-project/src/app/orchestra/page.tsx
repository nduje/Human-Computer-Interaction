"use client";

import Link from "next/link";
import Image from "next/image";
import string_instruments from "../../components/images/products/orchestra/string_instruments.jpg";
import wind_instruments from "../../components/images/products/orchestra/wind_instruments.jpg";
import percussion from "../../components/images/products/orchestra/percussion.jpg";

export default function OrchestraPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">
        Orchestra
      </h1>
      <section className="grid grid-rows-1 md:grid-cols-3 gap-x-12 md:gap-x-36 gap-y-4 md:gap-y-12 m-4 md:m-8 mx-10 md:mx-20 text-center align-middle">
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/orchestra/string-instruments/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={string_instruments}
              alt="string_instruments"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              String Instruments
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/orchestra/wind-instruments/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={wind_instruments}
              alt="wind_instruments"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">
              Wind Instruments
            </h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
        <div className="flex flex-col justify-between text-center align-middle">
          <Link
            href="/orchestra/percussion/"
            className="flex flex-col justify-between items-center text-center align-middle m-2 md:m-4 px-5 md:px-10 hover:cursor-pointer text-base-colors-200 hover:text-base-colors-300"
          >
            <Image
              style={{ objectFit: "contain" }}
              src={percussion}
              alt="percussion"
              className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <h1 className="mb-auto mt-3 md:mt-6 text-base md:text-xl font-semibold">Percussion</h1>
          </Link>
          <hr className="border-[1px] md:border-[1.5px] m-auto w-3/4 md:w-full border-base-colors-100"></hr>
        </div>
      </section>
      <Link href="/orchestra/all-orchestra" className="inline-block justify-center items-center text-center align-middle text-base-colors-50 bg-base-colors-200 hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2 mx-auto mt-6 md:mt-12">
        <h3 className="font-roboto font-medium text-xs md:text-xl">
          Display all products
        </h3>
      </Link>
    </article>
  );
}