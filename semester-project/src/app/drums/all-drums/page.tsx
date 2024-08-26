"use client";
import FetchDrums from "../fetchDrums";

export default function AllDrumsPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 mt-12 mx-12 mb-8">
        Drums
      </h1>
      <section className="mx-20">
        <FetchDrums />
      </section>
    </article>
  );
}