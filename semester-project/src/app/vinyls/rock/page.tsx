"use client";
import FetchRock from "./fetchRock";

export default function AllRockVinylsPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 m-12">All Pop</h1>
      <section className="m-8 mx-20">
        <FetchRock />
      </section>
    </article>
  );
}
