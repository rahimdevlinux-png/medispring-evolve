const express = require('express')
const router = express.Router()

// Mock data
let clinics = [
  {
    id: '1',
    name: 'CityCare Hospital',
    location: 'Mumbai, Maharashtra',
    status: 'active',
    patients: 523,
    revenue: 280000,
    lastActive: '2 hours ago',
    phone: '+91 98765 43210',
    email: 'info@citycare.com',
    address: '123 Healthcare St, Mumbai',
    superAdmin: 'Dr. Rajesh Kumar'
  },
  {
    id: '2',
    name: 'MediPlus Clinic',
    location: 'Delhi, NCR',
    status: 'active',
    patients: 234,
    revenue: 140000,
    lastActive: '5 hours ago',
    phone: '+91 98765 43211',
    email: 'info@mediplus.com',
    address: '456 Medical Ave, Delhi',
    superAdmin: 'Dr. Priya Sharma'
  },
  {
    id: '3',
    name: 'HealthFirst Center',
    location: 'Bangalore, Karnataka',
    status: 'pending',
    patients: 0,
    revenue: 0,
    lastActive: 'Not activated',
    phone: '+91 98765 43212',
    email: 'info@healthfirst.com',
    address: '789 Wellness Blvd, Bangalore',
    superAdmin: 'Dr. Amit Patel'
  }
]

// Get all clinics
router.get('/', (req, res) => {
  res.json(clinics)
})

// Get clinic by ID
router.get('/:id', (req, res) => {
  const clinic = clinics.find(c => c.id === req.params.id)
  if (!clinic) {
    return res.status(404).json({ message: 'Clinic not found' })
  }
  res.json(clinic)
})

// Create new clinic
router.post('/', (req, res) => {
  const newClinic = {
    id: String(clinics.length + 1),
    ...req.body,
    status: 'pending',
    patients: 0,
    revenue: 0,
    lastActive: 'Just created'
  }
  clinics.push(newClinic)
  res.status(201).json(newClinic)
})

// Update clinic
router.put('/:id', (req, res) => {
  const index = clinics.findIndex(c => c.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Clinic not found' })
  }
  
  clinics[index] = { ...clinics[index], ...req.body }
  res.json(clinics[index])
})

// Delete clinic
router.delete('/:id', (req, res) => {
  const index = clinics.findIndex(c => c.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Clinic not found' })
  }
  
  clinics.splice(index, 1)
  res.json({ message: 'Clinic deleted successfully' })
})

module.exports = router