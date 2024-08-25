const express = require("express");
const cors = require("cors");  // Include CORS package
const jwt = require("jsonwebtoken");
const authRoutes = require("./authRoutes");
const { setupDatabase } = require("./db");  // Ensure this path matches the location of your db.js file

const app = express();

// Configure CORS
// This configuration allows all origins by default
// Modify the CORS configuration based on your security policies
app.use(cors({
    origin: '*', // Allows all domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allows cookies and credentials to be sent along with requests
}));

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}` });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

setupDatabase();

app.use(express.json());
app.use("/api/auth", authRoutes); // Set up the authentication routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});