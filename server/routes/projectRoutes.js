const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Route to create a new project
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = new Project({ name, description });
    await project.save();
    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ error: "Server error while saving project" });
  }
});

// Route to get all projects
router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});


module.exports = router;
