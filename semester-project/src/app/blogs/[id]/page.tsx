"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  text: string;
  image: string; // Base64 string
  username: string; // Added username field
}

const BlogPage = ({ id }: { id: string }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the blog and current username from local storage
    const fetchBlog = async () => {
      try {
        const username = localStorage.getItem("username");

        // Set current username from local storage
        setCurrentUsername(username || null);

        const response = await fetch(
          `http://localhost:5000/api/auth/blogs/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "title" in data &&
          "text" in data &&
          "image" in data &&
          "username" in data // Check for username
        ) {
          setBlog(data);
          setNewImage(data.image); // Initialize with the current image
        } else {
          throw new Error("Invalid blog data format");
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const updatedBlog = { ...blog, image: newImage } as Blog;

      const response = await fetch(
        `http://localhost:5000/api/auth/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBlog),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      setIsEditing(false);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleDelete = async () => {
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

      // Redirect or handle successful deletion
      window.location.href = "/"; // Redirect to home or another page
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="font-roboto font-bold text-base-colors-300 text-xl">{error}</p>;
  if (!blog) return <p className="font-roboto font-bold text-base-colors-300 text-xl">Blog not found</p>;

  return (
    <div className="md:w-full m-0 p-0 font-roboto text-base-colors-200">
      {isEditing ? (
        // Edit Mode
        <div>
          {newImage && (
            <div className="relative w-full h-96 mb-4">
              <Image
                src={newImage}
                alt={blog.title}
                fill
                style={{ objectFit: "contain" }}
                className="border-b-2 border-base-colors-200 bg-base-colors-200"
              />
            </div>
          )}
          <section className="flex flex-col justify-center items-center align-middle text-center w-screen">
            <input
              type="text"
              value={blog.title}
              onChange={(e) =>
                setBlog((prev) =>
                  prev ? { ...prev, title: e.target.value } : prev
                )
              }
              className="text-2xl md:text-5xl font-bold md:m-4 p-2 md:p-4 w-[90vw] outline-base-colors-200"
            />
            <textarea
              value={blog.text}
              onChange={(e) =>
                setBlog((prev) =>
                  prev ? { ...prev, text: e.target.value } : prev
                )
              }
              className="font-roboto font-normal flex justify-start text-left text-lg bg-base-colors-100 m-2 md:m-4 p-2 md:p-4 w-[90vw] outline-base-colors-200"
            />
          </section>
          <section className="flex flex-row justify-center items-center text-center align-middle m-4 md:m-8">
            <div className="flex justify-center items-center">
              <label
                htmlFor="file-upload" 
                className="cursor-pointer font-medium text-md text-base-colors-100 m-2 md:m-4 py-2 px-4 rounded-tl-3xl rounded-br-3xl bg-base-colors-200 md:hover:bg-base-colors-300 active:bg-base-colors-300"
              >
                Upload File
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <button
              onClick={handleSave}
              className="font-medium text-md text-base-colors-100 m-2 md:m-4 py-2 px-4 rounded-tl-3xl rounded-br-3xl bg-base-colors-200 md:hover:bg-base-colors-300 active:bg-base-colors-300"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              className="font-medium text-md text-base-colors-100 m-2 md:m-4 py-2 px-4 rounded-tl-3xl rounded-br-3xl bg-base-colors-200 md:hover:bg-base-colors-300 active:bg-base-colors-300"
            >
              Delete
            </button>
          </section>
        </div>
      ) : (
        // View Mode
        <div className="font-roboto text-base-colors-200 flex flex-col justify-center items-center align-middle text-center break-words">
          {blog.image && (
            <div className="relative w-full h-96 mb-4">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                style={{ objectFit: "contain"}}
                className="border-b-2 border-base-colors-200 bg-base-colors-200"
              />
            </div>
          )}
          <section className="font-roboto flex flex-col md:flex-row justify-between align-middle items-center text-center w-[90vw]">
            <h1 className="text-2xl md:text-5xl text-left font-bold p-2 md:p-4 w-3/4">{blog.title}</h1>
            <div className="flex flex-col justify-center text-center items-center align-middle mb-2 md:m-4 p-2 md:p-4">
              <p className="m-2 md:m-4 font-normal">Author: <span className="font-bold">{blog.username}</span></p>
              {currentUsername === blog.username && (
                <div className="flex justify-center items-center align-middle text-center gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="font-medium text-md text-base-colors-100 py-2 px-4 rounded-tl-3xl rounded-br-3xl bg-base-colors-200 md:hover:bg-base-colors-300 active:bg-base-colors-300"
                  >
                    Edit Blog
                  </button>
                  <button
                    onClick={handleDelete}
                    className="font-medium text-md text-base-colors-100 py-2 px-4 rounded-tl-3xl rounded-br-3xl bg-base-colors-200 md:hover:bg-base-colors-300 active:bg-base-colors-300"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </section>
          <hr className="mb-2 rounded-full border-base-colors-200 border-[1px] w-[90vw]"></hr>
          <p className="font-roboto font-normal flex justify-start text-left text-lg bg-base-colors-100 m-2 md:m-4 p-2 md:p-4 w-[90vw]">{blog.text}</p>
        </div>
      )}
    </div>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  return <BlogPage id={params.id} />;
}
