const express = require('express')
const router = express.Router()

// Mock data for pharmacy
let medicines = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    category: 'Analgesic',
    stock: 150,
    batchNumber: 'B001',
    expiryDate: '2024-12-31',
    price: 25,
    supplier: 'PharmaCorp Ltd',
    status: 'available'
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotic',
    stock: 5,
    batchNumber: 'B002',
    expiryDate: '2024-08-15',
    price: 120,
    supplier: 'MediSupply Inc',
    status: 'low_stock'
  },
  {
    id: '3',
    name: 'Ibuprofen 400mg',
    category: 'Anti-inflammatory',
    stock: 0,
    batchNumber: 'B003',
    expiryDate: '2024-10-20',
    price: 45,
    supplier: 'HealthMeds Co',
    status: 'out_of_stock'
  }
]

let prescriptions = [
  {
    id: '1',
    patientName: 'Willie Jennie',
    doctorName: 'Dr. Darrell Stewart',
    medicines: [
      { name: 'Paracetamol 500mg', quantity: 10, dosage: '1 tablet twice daily' }
    ],
    date: '2023-12-01',
    status: 'dispensed',
    clinic: 'CityCare Hospital'
  },
  {
    id: '2',
    patientName: 'Michelle Rivera',
    doctorName: 'Dr. Ronald Richards',
    medicines: [
      { name: 'Amoxicillin 250mg', quantity: 21, dosage: '1 capsule thrice daily' },
      { name: 'Paracetamol 500mg', quantity: 6, dosage: '1 tablet when needed' }
    ],
    date: '2023-12-03',
    status: 'pending',
    clinic: 'CityCare Hospital'
  }
]

// Get all medicines
router.get('/medicines', (req, res) => {
  res.json(medicines)
})

// Get all prescriptions
router.get('/prescriptions', (req, res) => {
  res.json(prescriptions)
})

// Get medicine by ID
router.get('/medicines/:id', (req, res) => {
  const medicine = medicines.find(m => m.id === req.params.id)
  if (!medicine) {
    return res.status(404).json({ message: 'Medicine not found' })
  }
  res.json(medicine)
})

// Create new medicine
router.post('/medicines', (req, res) => {
  const newMedicine = {
    id: String(medicines.length + 1),
    ...req.body,
    status: req.body.stock > 10 ? 'available' : req.body.stock > 0 ? 'low_stock' : 'out_of_stock'
  }
  medicines.push(newMedicine)
  res.status(201).json(newMedicine)
})

// Create new prescription
router.post('/prescriptions', (req, res) => {
  const newPrescription = {
    id: String(prescriptions.length + 1),
    ...req.body,
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  }
  prescriptions.push(newPrescription)
  res.status(201).json(newPrescription)
})

// Update medicine stock
router.put('/medicines/:id', (req, res) => {
  const index = medicines.findIndex(m => m.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Medicine not found' })
  }
  
  medicines[index] = { ...medicines[index], ...req.body }
  res.json(medicines[index])
})

// Dispense prescription
router.put('/prescriptions/:id/dispense', (req, res) => {
  const index = prescriptions.findIndex(p => p.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Prescription not found' })
  }
  
  prescriptions[index].status = 'dispensed'
  res.json(prescriptions[index])
})

module.exports = router