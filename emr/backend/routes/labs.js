const express = require('express')
const router = express.Router()

// Mock data
let labOrders = [
  {
    id: '1',
    patientName: 'Willie Jennie',
    doctorName: 'Dr. Darrell Stewart',
    testName: 'Complete Blood Count',
    orderedDate: '2023-12-01',
    status: 'completed',
    results: 'Normal values',
    clinic: 'CityCare Hospital',
    labName: 'CityLab Diagnostics',
    urgency: 'routine'
  },
  {
    id: '2',
    patientName: 'Michelle Rivera',
    doctorName: 'Dr. Ronald Richards',
    testName: 'X-Ray Chest',
    orderedDate: '2023-12-03',
    status: 'in_progress',
    results: null,
    clinic: 'CityCare Hospital',
    labName: 'RadiCare Imaging',
    urgency: 'urgent'
  },
  {
    id: '3',
    patientName: 'Tim Jennings',
    doctorName: 'Dr. Jerald OHara',
    testName: 'Blood Sugar Test',
    orderedDate: '2023-12-04',
    status: 'pending',
    results: null,
    clinic: 'MediPlus Clinic',
    labName: 'QuickTest Labs',
    urgency: 'routine'
  }
]

// Get all lab orders
router.get('/', (req, res) => {
  res.json(labOrders)
})

// Get lab order by ID
router.get('/:id', (req, res) => {
  const labOrder = labOrders.find(l => l.id === req.params.id)
  if (!labOrder) {
    return res.status(404).json({ message: 'Lab order not found' })
  }
  res.json(labOrder)
})

// Create new lab order
router.post('/', (req, res) => {
  const newLabOrder = {
    id: String(labOrders.length + 1),
    ...req.body,
    orderedDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    results: null
  }
  labOrders.push(newLabOrder)
  res.status(201).json(newLabOrder)
})

// Update lab order
router.put('/:id', (req, res) => {
  const index = labOrders.findIndex(l => l.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Lab order not found' })
  }
  
  labOrders[index] = { ...labOrders[index], ...req.body }
  res.json(labOrders[index])
})

// Upload lab results
router.post('/:id/results', (req, res) => {
  const index = labOrders.findIndex(l => l.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Lab order not found' })
  }
  
  labOrders[index] = {
    ...labOrders[index],
    results: req.body.results,
    status: 'completed',
    completedDate: new Date().toISOString().split('T')[0]
  }
  
  res.json(labOrders[index])
})

module.exports = router