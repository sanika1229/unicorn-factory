const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

const app = express(); // 👈 MUST come before any app.use()

// Middleware
app.use(cors({
  origin: "https://zingy-taffy-3a8bbc.netlify.app",
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
app.use('/api/projects', projectRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
