"use client";

import { FC } from "react";
import "../styles/scrollbar.css"

const ReviewSection: FC = () => {
  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 mb-6 md:mb-12">
        In Your Own Words
      </h1>
      <div className="scrollbar flex justify-evenly align-middle text-center overflow-x-auto lg:overflow-x-hidden snap-x snap-mandatory">
        <div className="flex flex-shrink-0 flex-col justify-between align-middle text-center m-4 p-4 md:m-8 md:p-8 rounded-tl-3xl rounded-br-3xl bg-base-colors-100 w-full lg:w-1/4 h-28 lg:h-48 snap-center snap-always">
          <p className="text-xs md:text-base font-normal text-base-colors-200 italic">
            The service is consistently excellent. My order arrived quickly and was well-packaged. Customer support is always responsive and helpful.
          </p>
          <h3 className="text-xs md:text-base font-bold text-base-colors-200">
            5.8.2024.
          </h3>
        </div>
        <div className="flex flex-shrink-0 flex-col justify-between align-middle text-center m-4 p-4 md:m-8 md:p-8 rounded-tl-3xl rounded-br-3xl bg-base-colors-100 w-full lg:w-1/4 h-28 lg:h-48 snap-center snap-always">
          <p className="text-xs md:text-base font-normal text-base-colors-200 italic">
            Great prices and fast shipping. I received my order sooner than expected.
          </p>
          <h3 className="text-xs md:text-base font-bold text-base-colors-200">
            16.12.2023.
          </h3>
        </div>
        <div className="flex flex-shrink-0 flex-col justify-between align-middle text-center m-4 p-4 md:m-8 md:p-8 rounded-tl-3xl rounded-br-3xl bg-base-colors-100 w-full lg:w-1/4 h-28 lg:h-48 snap-center snap-always">
          <p className="text-xs md:text-base font-normal text-base-colors-200 italic">
            Shopping here is always a smooth experience. The website is easy to navigate, and delivery is prompt.
          </p>
          <h3 className="text-xs md:text-base font-bold text-base-colors-200">
            20.11.2023.
          </h3>
        </div>
      </div>
    </article>
  );
};

export default ReviewSection;
