// server/server.js

const express = require("express"); // ✅ FIXED: You forgot this line earlier
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes"); // adjust if path differs

const app = express(); // make sure this comes AFTER the express import

// CORS setup to allow requests from your frontend
app.use(cors({
  origin: "https://zingy-taffy-3a8bbc.netlify.app", // your Netlify frontend URL
  methods: ["GET", "POST"],
  credentials: true,
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// API route for project submissions and retrieval
app.use("/api/projects", projectRoutes);

// Optional base route for Render health check
app.get("/", (req, res) => {
  res.send("🦄 Unicorn Factory Backend is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
