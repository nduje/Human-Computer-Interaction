"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import error from "../images/error/error.png";

const BlitzNewsSection = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [assets, setAssets] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const SPACE_ID = "kxdn75bdbglk";
                const ACCESS_TOKEN = "3P9BtHbld8K0ojZWgyeLWTUeDAZQ53ZWRAdwftR4whg";

                const response = await fetch(
                    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=blogs&include=1`
                );

                const data = await response.json();
                
                setBlogs(data.items.slice(0,3));
                setAssets(data.includes.Asset);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const getImageUrl = (imageId: string) => {
        const asset = assets.find((asset: any) => asset.sys.id === imageId);
        return asset ? `https:${asset.fields.file.url}` : null;
    };

    return (
        <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 m-6 md:m-12">
            <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">
                Blitz News
            </h1>
            <section className="grid grid-rows-1 md:grid-cols-3 gap-7 md:gap-14 m-4 md:m-8 mx-10 md:mx-20">
                {blogs.map((blog) => (
                    <section
                        key={blog.sys.id}
                        className="flex flex-col justify-center align-middle items-center text-sm md:text-base text-base-colors-200"
                    >
                        <div className="rounded-t-md w-full h-[150px] md:h-[225px] relative overflow-hidden">
                            <Image
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                src={getImageUrl(blog.fields.images[0].sys.id) || error}
                                alt={blog.fields.name}
                                className="rounded-t-md"
                                width={1024}
                                height={1024}
                            />
                        </div>
                        <div className="flex justify-start text-left items-center align-middle rounded-b-md bg-base-colors-100 h-12 md:h-16 w-full p-2 md:p-4 overflow-hidden">
                            <h1 className="font-medium overflow-hidden text-ellipsis break-words">
                                {blog.fields.name}
                            </h1>
                        </div>
                    </section>
                ))}
            </section>
        </article>
    );
};

export default BlitzNewsSection;
