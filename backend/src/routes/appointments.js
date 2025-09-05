const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Appointments endpoint', data: [] });
});

module.exports = router;