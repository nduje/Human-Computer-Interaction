"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import "../styles/blogs.css"
import thompson from "../images/blogs/thompson.jpeg"
import oliver from "../images/blogs/oliver.jpg"
import prljavo_kazaliste from "../images/blogs/prljavo_kazaliste.jpeg"
import solin_summer_festival from "../images/blogs/solin_summer_festival.jpg"

const BlogsSection: FC = () => {
    return (
        <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 m-6 md:m-12">
            <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">
                Blogs
            </h1>
            <section className="grid grid-rows-1 md:grid-cols-3 gap-7 md:gap-14 m-4 md:m-8 mx-10 md:mx-20">
                <section className="flex flex-col justify-center align-middle items-center text-sm md:text-base text-base-colors-200 hover:cursor-pointer hover:text-base-colors-300">
                    <div className="cover-container rounded-t-md w-full h-[150px] md:h-[225px] relative overflow-hidden">
                        <Image
                            style={{width: "100%", height: "100%", objectFit: "cover"}}
                            src={thompson}
                            alt="thompson"
                            className="cover rounded-t-md"
                        />
                    </div>
                    <div className="flex justify-start text-left items-center align-middle rounded-b-md bg-base-colors-100 h-12 md:h-16 w-full p-2 md:p-4 overflow-hidden">
                        <h1 className="font-medium overflow-hidden text-ellipsis break-all md:whitespace-nowrap">
                            Thompson held a concert in front of 40,000 people
                        </h1>
                    </div>
                </section>
                <section className="flex flex-col justify-center align-middle items-center text-sm md:text-base text-base-colors-200 hover:cursor-pointer hover:text-base-colors-300">
                    <div className="cover-container rounded-t-md w-full h-[150px] md:h-[225px] relative overflow-hidden">
                        <Image
                            style={{width: "100%", height: "100%", objectFit: "cover"}}
                            src={oliver}
                            alt="oliver"
                            className="cover rounded-t-md"
                        />
                    </div>
                    <div className="flex justify-start text-left items-center align-middle rounded-b-md bg-base-colors-100 h-12 md:h-16 w-full p-2 md:p-4 overflow-hidden">
                        <h1 className="font-medium overflow-hidden text-ellipsis break-all md:whitespace-nowrap">
                            The sixth anniversary of Oliver&apos;s death was commemorated
                        </h1>
                    </div>
                </section>
                <section className="flex flex-col justify-center align-middle items-center text-sm md:text-base text-base-colors-200 hover:cursor-pointer hover:text-base-colors-300">
                    <div className="cover-container rounded-t-md w-full h-[150px] md:h-[225px] relative overflow-hidden">
                        <Image
                            style={{width: "100%", height: "100%", objectFit: "cover"}}
                            src={solin_summer_festival}
                            alt="solin_summer_festival"
                            className="cover rounded-t-md"
                        />
                    </div>
                    <div className="flex justify-start text-left items-center align-middle rounded-b-md bg-base-colors-100 h-12 md:h-16 w-full p-2 md:p-4 overflow-hidden">
                        <h1 className="font-medium overflow-hidden text-ellipsis break-all md:whitespace-nowrap">
                            29th Solin Summer Festival: Program Announcement
                        </h1>
                    </div>
                </section>
                <section className="flex flex-col justify-center align-middle items-center text-sm md:text-base text-base-colors-200 hover:cursor-pointer hover:text-base-colors-300">
                    <div className="cover-container rounded-t-md w-full h-[150px] md:h-[225px] relative overflow-hidden">
                        <Image
                            style={{width: "100%", height: "100%", objectFit: "cover"}}
                            src={prljavo_kazaliste}
                            alt="prljavo_kazaliste"
                            className="cover rounded-t-md"
                        />
                    </div>
                    <div className="flex justify-start text-left items-center align-middle rounded-b-md bg-base-colors-100 h-12 md:h-16 w-full p-2 md:p-4 overflow-hidden">
                        <h1 className="font-medium overflow-hidden text-ellipsis break-all md:whitespace-nowrap">
                            &quot;Prljavci&quot; announced a concert in Zagreb
                        </h1>
                    </div>
                </section>
            </section>
        </article>
    );
};

export default BlogsSection;