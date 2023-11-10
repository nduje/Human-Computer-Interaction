"use client";

import { FC } from "react";
import Image from "next/image";
import customer1Image from "../images/emma.jpg";
import customer2Image from "../images/david.jpg";
import customer3Image from "../images/alex.jpg";

const CustomersSection: FC = () => {
    return (
      <section className="container flex-col text-center align-middle justify-center m-auto p-10">
        <h1  className="font-inter font-semibold text-5xl text-secondary-purple-900">Our Customers</h1>
        <div className="flex justify-evenly text-center align-middle mt-24 mb-20">
            <article>
                <Image 
                    src={customer1Image}
                    alt={"emma"} 
                    style={{
                        borderRadius: "100%",
                        borderWidth: 2,
                        borderColor: "#290064"
                    }}   
                    width={225}
                    height={225}       
                />
                <h2 className="font-inter font-bold text-2xl text-secondary-purple-900 mt-2">Emma</h2>
                <h3 className="font-inter font-medium text-xl text-secondary-purple-900">Music Enthusiasts</h3>
            </article>
            <article>
                <Image 
                    src={customer2Image}
                    alt={"david"} 
                    style={{
                        borderRadius: "100%",
                        borderWidth: 2,
                        borderColor: "#290064"
                    }}   
                    width={225}
                    height={225}       
                />
                <h2 className="font-inter font-bold text-2xl text-secondary-purple-900 mt-2">David</h2>
                <h3 className="font-inter font-medium text-xl text-secondary-purple-900">Professional Musician</h3>
            </article>
            <article>
                <Image 
                    src={customer3Image}
                    alt={"alex"} 
                    style={{
                        borderRadius: "100%",
                        borderWidth: 2,
                        borderColor: "#290064"
                    }}   
                    width={225}
                    height={225}       
                />
                <h2 className="font-inter font-bold text-2xl text-secondary-purple-900 mt-2">Alex</h2>
                <h3 className="font-inter font-medium text-xl text-secondary-purple-900">Beginner Musician</h3>
            </article>
        </div>
      </section>
    );
};

export default CustomersSection;