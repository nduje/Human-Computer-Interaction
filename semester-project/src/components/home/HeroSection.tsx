"use client";

import { FC } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "../styles/scrollbar.css"
import guitars from "../images/hero/guitars.png"
import drums from "../images/hero/drums.png"
import dj from "../images/hero/dj.png"
import sheet from "../images/hero/sheet.png"
import vinyls from "../images/hero/vinyls.png"

const HeroSection: FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sectionRef.current) {
            const scrollWidth = sectionRef.current.scrollWidth;
            const clientWidth = sectionRef.current.clientWidth;
            sectionRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
        }
    }, []);

    return (
        <section ref={sectionRef} className="scrollbar flex overflow-x-auto snap-x snap-mandatory scroll-smooth my-6">
            <Image
                style={{width: "800px", height: "400px", objectFit: "cover"}}
                src={guitars}
                alt="guitars"
                className="rounded-md object-cover snap-center snap-always mx-6 cursor-pointer shrink-0"
            />
            <Image
                style={{width: "800px", height: "400px", objectFit: "cover"}}
                src={drums}
                alt="drums"
                className="rounded-md object-cover snap-center snap-always mr-6 cursor-pointer shrink-0"
            />
            <Image
                style={{width: "800px", height: "400px", objectFit: "cover"}}
                src={dj}
                alt="dj"
                className="rounded-md object-cover snap-center snap-always mr-6 cursor-pointer shrink-0"
            />
            <Image
                style={{width: "800px", height: "400px", objectFit: "cover"}}
                src={sheet}
                alt="sheet"
                className="rounded-md object-cover snap-center snap-always mr-6 cursor-pointer shrink-0"
            />
            <Image
                style={{width: "800px", height: "400px", objectFit: "cover"}}
                src={vinyls}
                alt="vinyls"
                className="rounded-md object-cover snap-center snap-always mr-6 cursor-pointer shrink-0"
            />
        </section>
    );
};

export default HeroSection;