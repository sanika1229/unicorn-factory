const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.post('/submit', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: 'Project submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit project' });
  }
});

// GET: Fetch all submitted projects
router.get('/all', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});


module.exports = router;
