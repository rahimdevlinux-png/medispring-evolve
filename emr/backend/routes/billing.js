const express = require('express')
const router = express.Router()

// Mock data
let billings = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    patientName: 'Willie Jennie',
    doctorName: 'Dr. Darrell Stewart',
    service: 'Tooth Scaling + Bleaching',
    amount: 15000,
    status: 'paid',
    date: '2023-12-01',
    dueDate: '2023-12-15',
    clinic: 'CityCare Hospital'
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    patientName: 'Michelle Rivera',
    doctorName: 'Dr. Ronald Richards',
    service: 'Tooth Scaling + Veneer',
    amount: 25000,
    status: 'pending',
    date: '2023-12-03',
    dueDate: '2023-12-17',
    clinic: 'CityCare Hospital'
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    patientName: 'Tim Jennings',
    doctorName: 'Dr. Jerald OHara',
    service: 'Tooth Scaling',
    amount: 8000,
    status: 'overdue',
    date: '2023-11-15',
    dueDate: '2023-11-30',
    clinic: 'MediPlus Clinic'
  }
]

// Get all billings
router.get('/', (req, res) => {
  res.json(billings)
})

// Get billing by ID
router.get('/:id', (req, res) => {
  const billing = billings.find(b => b.id === req.params.id)
  if (!billing) {
    return res.status(404).json({ message: 'Billing record not found' })
  }
  res.json(billing)
})

// Create new billing
router.post('/', (req, res) => {
  const newBilling = {
    id: String(billings.length + 1),
    invoiceNumber: `INV-${String(billings.length + 1).padStart(3, '0')}`,
    ...req.body,
    status: 'pending',
    date: new Date().toISOString().split('T')[0]
  }
  billings.push(newBilling)
  res.status(201).json(newBilling)
})

// Update billing
router.put('/:id', (req, res) => {
  const index = billings.findIndex(b => b.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Billing record not found' })
  }
  
  billings[index] = { ...billings[index], ...req.body }
  res.json(billings[index])
})

// Delete billing
router.delete('/:id', (req, res) => {
  const index = billings.findIndex(b => b.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Billing record not found' })
  }
  
  billings.splice(index, 1)
  res.json({ message: 'Billing record deleted successfully' })
})

module.exports = router