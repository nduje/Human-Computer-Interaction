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
  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p className="text-red-500">Blog not found</p>;

  return (
    <div className="w-full m-0 p-0 font-roboto text-base-colors-200">
      {isEditing ? (
        // Edit Mode
        <div>
          <input
            type="text"
            value={blog.title}
            onChange={(e) =>
              setBlog((prev) =>
                prev ? { ...prev, title: e.target.value } : prev
              )
            }
            className="text-3xl font-bold mb-4 w-full"
          />
          <textarea
            value={blog.text}
            onChange={(e) =>
              setBlog((prev) =>
                prev ? { ...prev, text: e.target.value } : prev
              )
            }
            className="text-lg w-full mb-4"
          />
          {newImage && (
            <div className="relative w-full h-96 mb-4">
              <Image
                src={newImage}
                alt={blog.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-base-colors-50 py-2 px-4 rounded-md"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-base-colors-50 py-2 px-4 rounded-md ml-2"
          >
            Delete
          </button>
        </div>
      ) : (
        // View Mode
        <div>
          {blog.image && (
            <div className="relative w-full h-[30vw] mb-4">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                style={{ objectFit: "cover" }}
                className="rounded border-b-2 border-base-colors-200"
              />
            </div>
          )}
          <section className="flex justify-between align-middle items-center text-center">
            <h1 className="text-5xl font-bold m-4 p-4">{blog.title}</h1>
            <div>
              <p className="mx-4 p-4 font-normal">Author: <span className="font-medium">{blog.username}</span></p>
              {currentUsername === blog.username && (
                <div className="flex justify-center items-center align-middle text-center gap-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-base-colors-50 py-2 px-4 rounded-md"
                  >
                    Edit Blog
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-base-colors-50 py-2 px-4 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </section>
          <p className="text-lg m-4 bg-base-colors-100 p-4">{blog.text}</p>
        </div>
      )}
    </div>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  return <BlogPage id={params.id} />;
}
