const express = require('express')
const router = express.Router()

// Mock data
let appointments = [
  {
    id: '1',
    patientName: 'Willie Jennie',
    doctorName: 'Dr. Darrell Stewart',
    date: '2023-12-07',
    time: '10:00',
    status: 'confirmed',
    type: 'consultation',
    clinic: 'CityCare Hospital',
    notes: 'Regular checkup'
  },
  {
    id: '2',
    patientName: 'Michelle Rivera',
    doctorName: 'Dr. Ronald Richards',
    date: '2023-12-07',
    time: '14:30',
    status: 'pending',
    type: 'treatment',
    clinic: 'CityCare Hospital',
    notes: 'Tooth scaling'
  },
  {
    id: '3',
    patientName: 'Tim Jennings',
    doctorName: 'Dr. Jerald OHara',
    date: '2023-12-08',
    time: '09:15',
    status: 'completed',
    type: 'followup',
    clinic: 'MediPlus Clinic',
    notes: 'Post-treatment checkup'
  }
]

// Get all appointments
router.get('/', (req, res) => {
  res.json(appointments)
})

// Get appointment by ID
router.get('/:id', (req, res) => {
  const appointment = appointments.find(a => a.id === req.params.id)
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' })
  }
  res.json(appointment)
})

// Create new appointment
router.post('/', (req, res) => {
  const newAppointment = {
    id: String(appointments.length + 1),
    ...req.body,
    status: 'pending'
  }
  appointments.push(newAppointment)
  res.status(201).json(newAppointment)
})

// Update appointment
router.put('/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Appointment not found' })
  }
  
  appointments[index] = { ...appointments[index], ...req.body }
  res.json(appointments[index])
})

// Delete appointment
router.delete('/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Appointment not found' })
  }
  
  appointments.splice(index, 1)
  res.json({ message: 'Appointment deleted successfully' })
})

module.exports = router