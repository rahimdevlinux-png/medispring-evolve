const express = require('express');
const router = express.Router();

// Get all users (mock data)
router.get('/', (req, res) => {
  res.json({ message: 'Users endpoint', data: [] });
});

// Create user
router.post('/', (req, res) => {
  res.json({ message: 'User created', data: req.body });
});

module.exports = router;