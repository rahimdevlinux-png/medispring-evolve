const express = require('express')
const router = express.Router()

// Mock data
let patients = [
  {
    id: '1',
    name: 'Willie Jennie',
    phone: '(302) 555-0107',
    email: 'willie.jennings@example.com',
    address: '8309 Barby Hill',
    registered: 'Mar 12, 2021',
    lastVisit: '05 Jun 2021',
    lastTreatment: 'Tooth Scaling + Bleaching',
    status: 'Active Treatment',
    uhid: 'UH001',
    dateOfBirth: '1985-03-15',
    gender: 'Female',
    clinic: 'CityCare Hospital',
    doctor: 'Dr. Darrell Stewart'
  },
  {
    id: '2',
    name: 'Michelle Rivera',
    phone: '(208) 555-0112',
    email: 'michelle.rivera@example.com',
    address: '534 Victoria Trail',
    registered: 'Mar 12, 2021',
    lastVisit: '03 May 2021',
    lastTreatment: 'Tooth Scaling + Veneer',
    status: 'Active Treatment',
    uhid: 'UH002',
    dateOfBirth: '1990-07-22',
    gender: 'Female',
    clinic: 'CityCare Hospital',
    doctor: 'Dr. Ronald Richards'
  },
  {
    id: '3',
    name: 'Tim Jennings',
    phone: '(225) 555-0118',
    email: 'tim.jennings@example.com',
    address: '87 Dahle Way',
    registered: 'Mar 10, 2021',
    lastVisit: '17 Oct 2021',
    lastTreatment: 'Tooth Scaling',
    status: 'Inactive Treatment',
    uhid: 'UH003',
    dateOfBirth: '1978-11-03',
    gender: 'Male',
    clinic: 'MediPlus Clinic',
    doctor: 'Dr. Jerald OHara'
  }
]

// Get all patients
router.get('/', (req, res) => {
  res.json(patients)
})

// Get patient by ID
router.get('/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id)
  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' })
  }
  res.json(patient)
})

// Create new patient
router.post('/', (req, res) => {
  const newPatient = {
    id: String(patients.length + 1),
    uhid: `UH${String(patients.length + 1).padStart(3, '0')}`,
    ...req.body,
    registered: new Date().toLocaleDateString(),
    status: 'Active Treatment'
  }
  patients.push(newPatient)
  res.status(201).json(newPatient)
})

// Update patient
router.put('/:id', (req, res) => {
  const index = patients.findIndex(p => p.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Patient not found' })
  }
  
  patients[index] = { ...patients[index], ...req.body }
  res.json(patients[index])
})

// Delete patient
router.delete('/:id', (req, res) => {
  const index = patients.findIndex(p => p.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Patient not found' })
  }
  
  patients.splice(index, 1)
  res.json({ message: 'Patient deleted successfully' })
})

module.exports = router