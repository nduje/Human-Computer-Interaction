"use client";

import { FC } from "react";
import Image from "next/image";
import vanImage from "../images/van.png";
import productImage from "../images/product.png";
import euroImage from "../images/euro.png";

const StatsSection: FC = () => {
    return (
      <section className="container relative flex text-center align-middle justify-center mx-auto py-16 bg-primary-brown-300">
        <div className="container absolute left-0 top-4 bg-primary-brown-900 w-48 h-4"></div>
        <article className="container flex text-center align-middle justify-evenly mx-5">
                <Image 
                    src={vanImage}
                    alt={"van"}   
                    width={100}
                    height={100}       
                />
                <h2 className="font-roboto font-bold text-2xl text-primary-brown-900">
                    Dostavljamo<br />na području<br />Europske unije.
                </h2>
            </article>
            <article className="container flex text-center align-middle justify-evenly mx-5">
                <Image 
                    src={productImage}
                    alt={"product"} 
                    width={100}
                    height={100}       
                />
                <h2 className="font-roboto font-bold text-2xl text-primary-brown-900">
                    Isporučujemo više<br />od 500.000 paketa<br />svakodnevno.
                </h2>
            </article>
            <article className="container flex text-center align-middle justify-evenly mx-5">
                <Image 
                    src={euroImage}
                    alt={"euro"} 
                    width={100}
                    height={100}       
                />
                <h2 className="font-roboto font-bold text-2xl text-primary-brown-900">
                    Tečaj konverzije<br />eura u kune<br />iznosi 7,53450.
                </h2>
            </article>
            <div className="container absolute right-0 bottom-4 bg-primary-brown-900 w-48 h-4"></div>
      </section>
    );
};

export default StatsSection;