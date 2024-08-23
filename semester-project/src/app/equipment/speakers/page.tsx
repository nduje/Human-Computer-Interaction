"use client";
import FetchSpeakers from "./fetchSpeakers";

export default function AllSpeakersPage() {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 h-auto w-auto m-12">
      <h1 className="font-bold text-3xl text-base-colors-200 m-12">
        All Speakers
      </h1>
      <section className="m-8 mx-20">
        <FetchSpeakers />
      </section>
    </article>
  );
}
