const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Patients endpoint', data: [] });
});

module.exports = router;