"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../styles/blogs.css";

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

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch("http://localhost:5000/api/auth/blogs", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch(
        `http://localhost:5000/api/auth/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch("http://localhost:5000/api/auth/blogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const createdBlog = await response.json();
      setBlogs([...blogs, createdBlog]);
      setIsCreating(false);
      setNewBlog({ title: "", text: "", image: "" });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBlog({ ...newBlog, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <article className="flex font-roboto flex-col text-center align-middle justify-center bg-base-colors-50 m-6 md:m-12">
      <h1 className="font-bold text-xl md:text-3xl text-base-colors-200 m-6 md:m-12">
        Blogs
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => setIsCreating(!isCreating)}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
      >
        {isCreating ? "Cancel" : "Create New Blog"}
      </button>

      {isCreating && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
          className="bg-white p-6 rounded-md shadow-md w-full mb-4"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-gray-700">
              Text
            </label>
            <textarea
              id="text"
              name="text"
              value={newBlog.text}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Create Blog
          </button>
        </form>
      )}

      <section className="grid grid-rows-1 md:grid-cols-3 gap-7 md:gap-14 m-4 md:m-8 mx-10 md:mx-20">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.id}`} passHref>
            <div className="flex flex-col justify-center align-middle items-center text-sm md:text-base text-base-colors-200 hover:cursor-pointer hover:text-base-colors-300">
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
    </article>
  );
};

export default BlogsSection;
