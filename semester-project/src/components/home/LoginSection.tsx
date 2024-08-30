"use client";

import { FC, useState, useEffect } from "react";

const LoginForm: FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true); // Toggle between login and signup
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in by checking for token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

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
          // Save token and username in localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          setIsLoggedIn(true);
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

  const handleLogout = () => {
    // Clear token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);

    // Clear form fields and status messages
    setFormData({ username: "", password: "" });
    setError(null);
    setSuccess(false);
  };

  const getUsername = () => {
    // Retrieve the username from localStorage
    const username = localStorage.getItem("username");

    // Return the username, or null if it doesn't exist
    return username ? username : null;
  };

  useEffect(() => {
    // Clear error and success messages when form data changes
    setError(null);
    setSuccess(false);
  }, [formData]);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Clear form fields and status messages when switching modes
    setFormData({ username: "", password: "" });
    setError(null);
    setSuccess(false);
  };

  return (
    <section className="flex justify-center items-center h-screen text-base-colors-200 font-roboto">
      <form
        onSubmit={handleSubmit}
        className="bg-base-colors-50 p-6 rounded-md shadow-md w-80 flex flex-col"
      >
        {!isLoggedIn ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              {isLoginMode ? "Login" : "Sign Up"}
            </h1>
            {error && <p className="text-base-colors-300 mb-4">{error}</p>}
            {success && (
              <p className="text-base-colors-400 mb-4">
                {isLoginMode
                  ? "Login successful!"
                  : "Registration successful! Please log in."}
              </p>
            )}
            <div className="mb-4">
              <label htmlFor="username" className="block">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-base-colors-100 rounded-md mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-base-colors-100 rounded-md mt-1"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center align-middle text-enter text-lg font-medium text-base-colors-50 m-auto w-36 px-1 py-2 border-0 rounded-tl-3xl rounded-br-3xl bg-base-colors-200 hover:bg-base-colors-300"
            >
              {isLoginMode ? "Login" : "Sign Up"}
            </button>
            <p className="text-center mt-4">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={toggleMode}
                className="text-base-colors-300 cursor-pointer"
              >
                {isLoginMode ? "Sign up" : "Login"}
              </span>
            </p>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center text-center align-middle">
            <h1 className="font-medium text-xl">You Are Logged In As:</h1>
            <span className="font-extrabold text-2xl text-base-colors-300">{getUsername()}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="flex justify-center items-center align-middle text-enter text-lg font-medium text-base-colors-50 m-auto w-36 mt-4 px-1 py-2 border-0 rounded-tl-3xl rounded-br-3xl bg-base-colors-200 hover:bg-base-colors-300"
            >
              Logout
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default LoginForm;
