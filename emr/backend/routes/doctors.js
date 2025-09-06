const express = require('express')
const router = express.Router()

// Mock data
let doctors = [
  {
    id: '1',
    name: 'Dr. Darrell Stewart',
    specialty: 'Pediatric Dentistry',
    phone: '808 555-0111',
    email: 'darrell.stewart@gmail.com',
    workingDays: ['M', 'T', 'W', 'T', 'F', 'S'],
    assignedTreatment: 'Dental service, Oral Disease service +2',
    type: 'PART-TIME',
    clinic: 'CityCare Hospital',
    experience: '8 years',
    qualification: 'BDS, MDS',
    status: 'active'
  },
  {
    id: '2',
    name: 'Dr. Ronald Richards',
    specialty: 'Pediatric Dentistry',
    phone: '209 555-0104',
    email: 'teukulwestnu@gmail.com',
    workingDays: ['M', 'T', 'W', 'T', 'F', 'S'],
    assignedTreatment: 'Dental service, Oral Disease service +2',
    type: 'PART-TIME',
    clinic: 'CityCare Hospital',
    experience: '5 years',
    qualification: 'BDS',
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Jerald OHara',
    specialty: 'Pediatric Dentistry',
    phone: '302 555-0107',
    email: 'cjpeng@avicena.com',
    workingDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    assignedTreatment: 'Dental service, Oral Disease service +2',
    type: 'FULL-TIME',
    clinic: 'MediPlus Clinic',
    experience: '12 years',
    qualification: 'BDS, MDS, PhD',
    status: 'active'
  }
]

// Get all doctors
router.get('/', (req, res) => {
  res.json(doctors)
})

// Get doctor by ID
router.get('/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === req.params.id)
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' })
  }
  res.json(doctor)
})

// Create new doctor
router.post('/', (req, res) => {
  const newDoctor = {
    id: String(doctors.length + 1),
    ...req.body,
    status: 'active'
  }
  doctors.push(newDoctor)
  res.status(201).json(newDoctor)
})

// Update doctor
router.put('/:id', (req, res) => {
  const index = doctors.findIndex(d => d.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Doctor not found' })
  }
  
  doctors[index] = { ...doctors[index], ...req.body }
  res.json(doctors[index])
})

// Delete doctor
router.delete('/:id', (req, res) => {
  const index = doctors.findIndex(d => d.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Doctor not found' })
  }
  
  doctors.splice(index, 1)
  res.json({ message: 'Doctor deleted successfully' })
})

module.exports = router