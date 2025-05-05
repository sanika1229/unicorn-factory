const express = require('express');
const cors = require('cors'); // ✅ This was missing
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://zingy-taffy-3a8bbc.netlify.app", // ✅ Your Netlify frontend
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("🦄 Unicorn Factory Backend is running!");
});

// TODO: Add this later once you define the route handler
// const projectRoutes = require('./routes/projectRoutes');
// app.use('/api/project', projectRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
