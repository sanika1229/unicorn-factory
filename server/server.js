const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express(); // <- Moved above usage!

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Routes
app.use('/api/projects', require('./routes/projectRoutes'));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

app.get("/", (req, res) => {
  res.send("Unicorn Factory Backend is Live 🚀");
});

