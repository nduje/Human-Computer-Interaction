"use client";

import Link from "next/link";
import { FC } from "react";
import "../styles/products.css"

const ProductsSection: FC = () => {
    return (
      <section id="productsSection" className="bg-primary-white-50 container flex flex-col md:flex-row text-center align-middle justify-center h-auto">
        <div className="productBox flex flex-col flex-grow justify-center items-center align-middle py-8 mx-auto w-full md:w-1/6 bg-[url('../components/images/faded_drums.jpg')] md:bg-[url('../components/images/drums.jpg')] bg-cover bg-center hover:flex-grow-8 hover:bg-[url('../components/images/faded_drums.jpg')] border-y-4 border-primary-brown-900 md:border-y-0">
            <div className="wrapperBox">
                <h1 className="font-pacifico text-3xl md:text-5xl text-primary-brown-300 py-1 md:py-3">
                    Music<br />Instruments
                </h1>
                <h2 className="font-roboto text-xl md:text-2xl font-semibold text-primary-brown-100 py-0 md:py-2">
                    Discover Your Rhythm:<br />Unleash the Beat Within
                </h2>
                <Link href="/music-instruments">
                    <div className="flex justify-center items-center align-middle">
                        <h3 className="bg-primary-brown-900 rounded-full font-roboto text-lg md:text-xl font-semibold text-primary-beige-100 w-auto m-2 px-4 py-2 md:px-8 md:py-4 hover:cursor-pointer hover:bg-primary-brown-800">
                            Shop Drums
                        </h3>
                    </div>
                </Link>
            </div>
        </div>
        <div className="productBox flex flex-col flex-grow justify-evenly items-center align-middle py-8 mx-auto w-full md:w-1/6 bg-[url('../components/images/faded_microphone.jpg')] md:bg-[url('../components/images/microphone.jpg')] bg-cover bg-center hover:flex-grow-8 hover:bg-[url('../components/images/faded_microphone.jpg')]">
            <div className="wrapperBox">
                <h1 className="font-pacifico text-3xl md:text-5xl text-primary-brown-300 py-1 md:py-3">
                    Audio<br />Equipment
                </h1>
                <h2 className="font-roboto text-xl md:text-2xl font-semibold text-primary-brown-100 py-0 md:py-2">
                    Elevate Your Sound:<br />Find Your Perfect Voice
                </h2>
                <Link href="/audio-equipment">
                    <div className="flex justify-center items-center align-middle">
                        <h3 className="bg-primary-brown-900 rounded-full font-roboto text-lg md:text-xl font-semibold text-primary-beige-100 w-auto m-2 px-4 py-2 md:px-8 md:py-4 hover:cursor-pointer hover:bg-primary-brown-800">
                            Shop Microphones
                        </h3>
                    </div>
                </Link>
            </div>
        </div>
        <div className="productBox flex flex-col flex-grow justify-evenly items-center align-middle py-8 mx-auto w-full md:w-1/6 bg-[url('../components/images/faded_vinyls.jpg')] md:bg-[url('../components/images/vinyls.jpg')] bg-cover bg-center hover:flex-grow-8 hover:bg-[url('../components/images/faded_vinyls.jpg')] border-y-4 border-primary-brown-900 md:border-y-0">
            <div className="wrapperBox">
                <h1 className="font-pacifico text-3xl md:text-5xl text-primary-brown-300 py-1 md:py-3">
                    Learning and<br />Resources
                </h1>
                <h2 className="font-roboto text-xl md:text-2xl font-semibold text-primary-brown-100 py-0 md:py-2">
                    Spin the Classics:<br />Vintage Vinyl, Timeless Grooves
                </h2>
                <Link href="/learning-and-resources/sheet-music">
                    <div className="flex justify-center items-center align-middle">
                        <h3 className="bg-primary-brown-900 rounded-full font-roboto text-lg md:text-xl font-semibold text-primary-beige-100 w-auto m-2 px-4 py-2 md:px-8 md:py-4 hover:cursor-pointer hover:bg-primary-brown-800">
                            Shop Vinyl Records
                        </h3>
                    </div>
                </Link>
            </div>
        </div>
      </section>
    );
};
  
  export default ProductsSection;