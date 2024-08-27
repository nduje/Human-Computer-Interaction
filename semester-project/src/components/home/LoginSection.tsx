"use client";

import { FC, useState } from "react";

const LoginForm: FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true); // Toggle between login and signup

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const url = isLoginMode
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register"; // Switch URL based on mode

    console.log(
      JSON.stringify({
        username: formData.username,
        password: formData.password,
      })
    );
    try {
      const response = await fetch(url, {
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
          isLoginMode
            ? "Login failed. Please check your credentials and try again."
            : "Registration failed. Please try again."
        );
      }

      const data = await response.json();

      if (isLoginMode) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setSuccess(true);
        } else {
          throw new Error("Login failed. No token received.");
        }
      } else {
        setSuccess(true); // Registration was successful
        setFormData({ username: "", password: "" }); // Clear form fields
      }
    } catch (error) {
      setError((error as Error).message);
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isLoginMode ? "Login" : "Sign Up"}
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">
            {isLoginMode
              ? "Login successful!"
              : "Registration successful! Please log in."}
          </p>
        )}
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
            type="password"
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
          {isLoginMode ? "Login" : "Sign Up"}
        </button>
        <p className="text-center mt-4">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-blue-500 cursor-pointer"
          >
            {isLoginMode ? "Sign up" : "Login"}
          </span>
        </p>
      </form>
    </section>
  );
};

export default LoginForm;
