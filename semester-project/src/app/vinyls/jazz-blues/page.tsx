"use client";
import FetchJazzAndBlues from "./fetchJazzAndBlues";

export default function AllJazzAndBluesVinylsPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 mt-6 md:mt-12 mx-6 md:mx-12 mb-4 md:mb-8">
        Jazz & Blues
      </h1>
      <section className="mx-10 md:mx-20">
        <FetchJazzAndBlues />
      </section>
    </article>
  );
}
