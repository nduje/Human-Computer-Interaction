"use client";
import FetchGuitars from "../fetchGuitars";

export default function AllGuitarsPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 m-12">
        All Guitars
      </h1>
      <section className="m-8 mx-20">
        <FetchGuitars />
      </section>
    </article>
  );
}
