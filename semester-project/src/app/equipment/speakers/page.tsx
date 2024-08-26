"use client";
import FetchSpeakers from "./fetchSpeakers";

export default function AllSpeakersPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 mt-12 mx-12 mb-8">
        Speakers
      </h1>
      <section className="mx-20">
        <FetchSpeakers />
      </section>
    </article>
  );
}
