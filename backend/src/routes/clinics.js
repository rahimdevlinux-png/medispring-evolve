const express = require('express');
const router = express.Router();

// Mock clinic data
const mockClinics = [
  {
    id: 'clinic-1',
    name: 'CityCare Hospital',
    location: 'Mumbai, Maharashtra',
    status: 'active',
    patients: 523,
    revenue: '₹2.8L'
  }
];

router.get('/', (req, res) => {
  res.json({ data: mockClinics });
});

router.post('/', (req, res) => {
  res.json({ message: 'Clinic created', data: req.body });
});

module.exports = router;