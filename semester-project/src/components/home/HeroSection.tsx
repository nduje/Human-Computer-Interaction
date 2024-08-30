"use client";

import { FC } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "../styles/scrollbar.css"
import guitars from "../images/hero/guitars.png"
import drums from "../images/hero/drums.png"
import dj from "../images/hero/dj.png"
import orchestra from "../images/hero/orchestra.png"
import vinyls from "../images/hero/vinyls.png"

const HeroSection: FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollAmount = 824;
    const fullScrollSize = scrollAmount * 5;

    useEffect(() => {
        const section = sectionRef.current;
        if (section) {
            const scrollWidth = section.scrollWidth;
            const clientWidth = section.clientWidth;
            section.scrollLeft = (scrollWidth - clientWidth) / 2;
    
            const interval = setInterval(() => {
                if (section.scrollLeft + clientWidth >= fullScrollSize) {
                    section.scrollLeft = 0;
                } else {
                    section.scrollLeft += scrollAmount;
                }
            }, 15000);
    
            return () => clearInterval(interval);
        }
    }, [scrollAmount]);
    

    return (
        <section ref={sectionRef} className="scrollbar flex overflow-x-auto snap-x snap-mandatory scroll-smooth md:mt-6 mb-12">
            <Link href={"/guitars/basses"} className="md:rounded-xl w-screen h-[50vw] md:w-[800px] md:h-[400px] object-cover snap-center snap-always md:mx-6 cursor-pointer shrink-0">    
                <Image
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                    src={guitars}
                    alt="guitars"
                    className="md:rounded-xl"
                />
            </Link>
            <Link href={"/drums/acoustic-drums"} className="md:rounded-xl w-screen h-[50vw] md:w-[800px] md:h-[400px] object-cover snap-center snap-always md:mr-6 cursor-pointer shrink-0">
                <Image
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                    src={drums}
                    alt="drums"
                    className="md:rounded-xl"
                />
            </Link>
            <Link href={"/equipment/dj-equipment"} className="md:rounded-xl w-screen h-[50vw] md:w-[800px] md:h-[400px] object-cover snap-center snap-always md:mr-6 cursor-pointer shrink-0">
                <Image
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                    src={dj}
                    alt="dj"
                    className="md:rounded-xl"
                />
            </Link>
            <Link href={"/orchestra"} className="md:rounded-xl w-screen h-[50vw] md:w-[800px] md:h-[400px] object-cover snap-center snap-always md:mr-6 cursor-pointer shrink-0">
                <Image
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                    src={orchestra}
                    alt="orchestra"
                    className="md:rounded-xl"
                />
            </Link>
            <Link href={"/vinyls"} className="md:rounded-xl w-screen h-[50vw] md:w-[800px] md:h-[400px] object-cover snap-center snap-always md:mr-6 cursor-pointer shrink-0">
                <Image
                    style={{width: "100%", height: "100%", objectFit: "cover"}}
                    src={vinyls}
                    alt="vinyls"
                    className="md:rounded-xl"
                />
            </Link>
        </section>
    );
};

export default HeroSection;