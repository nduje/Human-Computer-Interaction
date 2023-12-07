"use client";

import Link from "next/link";
import { FC } from "react";
import "../styles/products.css"

const ProductsSection: FC = () => {
    return (
      <section style={{height: "480px"}} className="bg-primary-white-50 container flex text-center align-middle justify-center">
        <div className="productBox flex flex-col flex-grow justify-center items-center align-middle mx-auto w-1/6 bg-[url('../components/images/drums.jpg')] bg-cover bg-center hover:flex-grow-8 hover:bg-[url('../components/images/faded_drums.jpg')]">
            <div className="wrapperBox">
                <h1 className="font-pacifico text-5xl text-primary-brown-300 py-3 z-20">
                    Music<br />Instruments
                </h1>
                <h2 className="font-roboto text-2xl font-semibold text-primary-brown-100 py-2">
                    Discover Your Rhythm:<br />Unleash the Beat Within
                </h2>
                <Link href="/music-instruments">
                    <div className="flex justify-center items-center align-middle">
                        <h3 className="bg-primary-brown-900 rounded-full font-roboto text-xl font-semibold text-primary-beige-100 w-auto m-2 px-8 py-4 hover:cursor-pointer hover:bg-primary-brown-800">
                            Shop Drums
                        </h3>
                    </div>
                </Link>
            </div>
        </div>
        <div className="productBox flex flex-col flex-grow justify-evenly items-center align-middle mx-auto w-1/6 bg-[url('../components/images/microphone.jpg')] bg-cover bg-center hover:flex-grow-8 hover:bg-[url('../components/images/faded_microphone.jpg')]">
            <div className="wrapperBox">
                <h1 className="font-pacifico text-5xl text-primary-brown-300 py-3">
                    Audio<br />Equipment
                </h1>
                <h2 className="font-roboto text-2xl font-semibold text-primary-brown-100 py-2">
                    Elevate Your Sound:<br />Find Your Perfect Voice
                </h2>
                <Link href="/audio-equipment">
                    <div className="flex justify-center items-center align-middle">
                        <h3 className="bg-primary-brown-900 rounded-full font-roboto text-xl font-semibold text-primary-beige-100 w-auto m-2 px-8 py-4 hover:cursor-pointer hover:bg-primary-brown-800">
                            Shop Microphones
                        </h3>
                    </div>
                </Link>
            </div>
        </div>
        <div className="productBox flex flex-col flex-grow justify-evenly items-center align-middle mx-auto w-1/6 bg-[url('../components/images/vinyls.jpg')] bg-cover bg-center hover:flex-grow-8 hover:bg-[url('../components/images/faded_vinyls.jpg')]">
            <div className="wrapperBox">
                <h1 className="font-pacifico text-5xl text-primary-brown-300 py-3">
                    Learning and<br />Resources
                </h1>
                <h2 className="font-roboto text-2xl font-semibold text-primary-brown-100 py-2">
                    Spin the Classics:<br />Vintage Vinyl, Timeless Grooves
                </h2>
                <Link href="/learning-and-resources/sheet-music">
                    <div className="flex justify-center items-center align-middle">
                        <h3 className="bg-primary-brown-900 rounded-full font-roboto text-xl font-semibold text-primary-beige-100 w-auto m-2 px-8 py-4 hover:cursor-pointer hover:bg-primary-brown-800">
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