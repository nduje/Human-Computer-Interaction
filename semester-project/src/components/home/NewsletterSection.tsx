"use client";

import { FC } from "react";
import Image from "next/image";
import vanImage from "../images/van.png";
import productImage from "../images/product.png";
import euroImage from "../images/euro.png";

const NewsletterSection: FC = () => {
    return (
      <section className="container flex flex-col text-center align-middle justify-center mx-auto py-8 md:py-16 bg-primary-white-50">
        <h1 className="font-pacifico text-2xl md:text-7xl text-primary-brown-900 mb-8 pb-1 md:p-3">Subscribe to Our Newsletter!</h1>
        <form>
            <input type="text" placeholder="Email Address" className="font-roboto text-center text-base md:text-2xl text-primary-grey-500 md:indent-4 w-9/12 md:w-1/2 h-12 md:h-16 outline outline-4 outline-primary-brown-700 focus:outline-primary-brown-900 bg-primary-beige-50 rounded-full"></input>
            <div className="flex justify-center items-center align-middle">
                            <h3 className="bg-primary-brown-900 rounded-full font-roboto text-base md:text-xl font-semibold text-primary-beige-100 w-auto m-4 px-6 md:px-8 py-3 md:py-4 hover:cursor-pointer hover:bg-primary-brown-800">
                                Subscribe Now
                            </h3>
            </div>
        </form>
      </section>
    );
};

export default NewsletterSection;