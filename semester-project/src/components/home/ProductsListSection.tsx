"use client";

import { FC, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn, colors } from "../../../lib/utils";

interface Image {
    length: number

    sys: {
        id: string
    }
}

interface Item {
    lenght: number

    fields: {
        name: string,
        price: number,
        category: string
        images: Image[];
    };

    sys: {
        id: string

        contentType: {
            sys: {
                id: string
            }
        }
    };
}

interface Asset {
    sys: {
        id: string
    }

    fields: {
        file: {
            url: string
        }
    }
}

interface ProductsListProps {
    items: Item[],
    assets: Asset[]
}

const ProductsList: FC<ProductsListProps> = ({items, assets}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (indexOfLastItem < items.length) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <section className="flex flex-col justify-center items-center align-middle">
            <ul className="flex flex-col justify-center items-center align-middle mx-0 lg:mx-auto my-6 lg:my-12">
                {currentItems?.map((item) => (
                <Link key={item.sys.id} href={`/${item.sys.contentType.sys.id}/${item.sys.id}`}>
                    <li className="product flex flex-col lg:grid lg:grid-cols-[3fr_1fr] justify-around items-start bg-base-colors-100 rounded-md w-[90vw] lg:w-[1024px] mx-auto my-3 p-2 lg:m-6 lg:p-0">
                        <div className="flex flex-row col-span-2 lg:col-auto w-full lg:w-auto">
                            {item.fields.images.length > 0 && (
                            <>
                                {(() => {
                                const image = item.fields.images[0];
                                const asset = assets.find(
                                    (asset) => asset.sys.id === image.sys.id
                                );
                                if (!asset) return null;

                                const imageUrl = `https:${asset.fields.file.url}`;

                                return (
                                    <Image
                                    key={image.sys.id}
                                    src={imageUrl}
                                    alt={item.fields.name}
                                    width={256}
                                    height={256}
                                    style={{ objectFit: "cover" }}
                                    className="w-[100px] lg:w-[200px] h-[100px] lg:h-[200px] rounded-md m-2 lg:m-4 mr-2 lg:mr-0"
                                    />
                                );
                                })()}
                            </>
                            )}
                            <div className="flex flex-col justify-start text-left font-roboto m-2 lg:m-4 col-span-2 lg:col-auto">
                                <p className="name text-left font-medium text-xs lg:text-xl">
                                    {item.fields.name}
                                </p>
                                <p className="font-bold text-base lg:text-3xl">
                                    {item.fields.price}€
                                </p>
                            </div>
                        </div>
                        <div className="flex lg:inline-flex flex-col max-w-full w-full lg:w-auto my-2 lg:ml-auto lg:mr-4 lg:my-4 justify-center lg:justify-between col-span-4 lg:col-auto">
                            <p
                            className={cn(
                                colors[item.fields.category],
                                "flex h-full items-center justify-center px-4 py-1 font-medium lg:font-normal text-xs lg:text-md rounded-3xl lg:rounded-bl-none lg:rounded-tr-none lg:rounded-tl-3xl lg:rounded-br-3xl"
                            )}
                            >
                            {item.fields.category}
                            </p>
                        </div>
                    </li>
                </Link>
                ))}
            </ul>

            <div
                className={`flex flex-row items-center w-[80vw] lg:w-[50vw] font-roboto font-medium text-base lg:text-xl mx-0 lg:mx-auto mt-1 lg:mt-2 ${
                currentPage > 1 && indexOfLastItem < items.length
                    ? "justify-between"
                    : "justify-center"
                }`}
            >
                {currentPage > 1 && (
                <button
                    onClick={handlePreviousPage}
                    className="inline-block text-base-colors-50 bg-base-colors-200 active:bg-base-colors-300 lg:hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2"
                >
                    Previous Page
                </button>
                )}
                {indexOfLastItem < items.length && (
                <button
                    onClick={handleNextPage}
                    className="inline-block text-base-colors-50 bg-base-colors-200 active:bg-base-colors-300 lg:hover:bg-base-colors-300 rounded-tl-3xl rounded-br-3xl hover:cursor-pointer px-4 py-2"
                >
                    Next Page
                </button>
                )}
            </div>
        </section>
    );
}

export default ProductsList;