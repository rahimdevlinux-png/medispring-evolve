const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Billing endpoint', data: [] });
});

module.exports = router;