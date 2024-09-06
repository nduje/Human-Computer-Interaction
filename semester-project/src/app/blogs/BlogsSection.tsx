"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../components/styles/blogs.css";

type Blog = {
  id: number;
  title: string;
  text: string;
  image: string; // Base64 string
};

const BlogsSection: FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newBlog, setNewBlog] = useState({ title: "", text: "", image: "" });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/auth/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = (await response.json() as Blog[]).sort((a, b) => b.id - a.id);
        setBlogs(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

  }, []);

  // Display only the first 3 blogs
  const blogsToShow = blogs.slice(0, 3);

  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">
        Blogs
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <section className="grid grid-rows-1 md:grid-cols-3 gap-7 md:gap-14 m-4 md:m-8 mx-10 md:mx-20">
        {blogsToShow.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`} passHref>
            <div className="flex flex-col justify-center align-middle items-center text-sm md:text-base text-base-colors-200 hover:cursor-pointer md:hover:text-base-colors-300 active:text-base-colors-300">
              <div className="cover-container rounded-t-md w-full h-[150px] md:h-[225px] relative overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  className="cover rounded-t-md"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  width={300}
                  height={200}
                />
              </div>
              <div className="flex justify-start text-left items-center align-middle rounded-b-md bg-base-colors-100 h-12 md:h-16 w-full p-2 md:p-4 overflow-hidden">
                <h1 className="font-medium overflow-hidden text-ellipsis break-all md:whitespace-nowrap">
                  {blog.title}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Button to view all blogs */}
      <Link href="/blogs/all-blogs">
        <button className="font-roboto font-medium bg-base-colors-200 md:hover:bg-base-colors-300 active:bg-base-colors-300 text-base-colors-100 py-2 px-4 rounded-tl-3xl rounded-br-3xl mt-4">
          Show All Blogs
        </button>
      </Link>
    </article>
  );
};

export default BlogsSection;
