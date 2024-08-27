const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { supabase } = require("./db"); // Ensure the path matches the location of your db.js file
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secure-secret"; // It's better to define this in your .env file

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Store the user data in the request object
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Register Endpoint
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Insert the user into the Supabase database
  const { data, error } = await supabase
    .from("users")
    .insert([{ username, password: hashedPassword }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "User registered" });
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Fetch the user from the Supabase database
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!users) {
    return res.status(400).json({ message: "User not found" });
  }

  const user = users;

  // Compare the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create a JWT token
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "User logged in", token });
});

// Create a new blog post
router.post("/blogs", authenticateToken, async (req, res) => {
  const { title, text, image } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from("blogs")
    .insert([{ title, text, image, user_id }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Blog post created"});
});

// Get all blog posts
router.get("/blogs", async (req, res) => {
  const { data, error } = await supabase.from("blogs").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
});

// Get a single blog post by ID
router.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ message: "Blog post not found" });
  }
  
  res.status(200).json(data);
});

// Update a blog post
router.put("/blogs/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, text, image } = req.body;

  // Fetch the blog post to ensure the user is the owner
  const { data: blog, error: fetchError } = await supabase
    .from("blogs")
    .select("user_id")
    .eq("id", id)
    .single();

  if (fetchError) {
    return res.status(500).json({ error: fetchError.message });
  }

  if (blog.user_id !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this post" });
  }

  const { data, error } = await supabase
    .from("blogs")
    .update({ title, text, image })
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Blog post updated", blog: data[0] });
});

// Delete a blog post
router.delete("/blogs/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  // Fetch the blog post to ensure the user is the owner
  const { data: blog, error: fetchError } = await supabase
    .from("blogs")
    .select("user_id")
    .eq("id", id)
    .single();

  if (fetchError) {
    return res.status(500).json({ error: fetchError.message });
  }

  if (!blog) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  if (blog.user_id !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this post" });
  }

  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: "Blog post deleted" });
});

module.exports = router;
