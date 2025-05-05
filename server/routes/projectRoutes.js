const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // assuming this model exists

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProject = new Project({ name, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
