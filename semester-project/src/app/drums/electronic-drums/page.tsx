"use client";
import FetchElectronicDrums from "./fetchElectronicDrums";

export default function AllDrumsPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 m-12">All Electronic Drums</h1>
      <section className="m-8 mx-20">
        <FetchElectronicDrums />
      </section>
    </article>
  );
}
