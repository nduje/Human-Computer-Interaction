"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  text: string;
  image: string; // Base64 string
}

const BlogPage = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `http://localhost:5000/api/auth/blogs/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        console.log("Fetched Blog Data:", data); // Debugging line

        // Validate data format before setting state
        if (
          typeof data === "object" &&
          data !== null &&
          "title" in data &&
          "text" in data &&
          "image" in data
        ) {
          setBlog(data);
        } else {
          throw new Error("Invalid blog data format");
        }
      } catch (error) {
        console.error("Fetch Error:", (error as Error).message);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  console.log("Blog Data State:", blog); // Debugging line

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!blog) {
    return <p className="text-red-500">Blog not found</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.image && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
      )}
      <p className="text-lg">{blog.text}</p>
    </div>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  return <BlogPage id={params.id} />;
}
