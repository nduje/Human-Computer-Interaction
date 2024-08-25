"use client";

import { FC, useState } from "react";

const LoginForm: FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form is being submitted");
    e.preventDefault();
    console.log("Form is being submitted");
    setError(null); // Reset any previous error messages
    setSuccess(false); // Reset success status

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error(
          "Login failed. Please check your credentials and try again."
        );
      }

      const data = await response.json();

      if (data.token) {
        console.log("Login successful:", data.token);
        // Store the token (e.g., in localStorage or context)
        localStorage.setItem("token", data.token);
        setSuccess(true);
        // Optionally, redirect the user to another page
      } else {
        throw new Error("Login failed. No token received.");
      }
    } catch (error) {
      setError((error as Error).message);
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white p-6 rounded-md shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Login successful!</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password" // Changed to password type for better security
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
