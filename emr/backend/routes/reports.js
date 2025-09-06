const express = require('express')
const router = express.Router()

// Get dashboard metrics
router.get('/dashboard', (req, res) => {
  const dashboardData = {
    totalClinics: 24,
    totalDoctors: 120,
    totalPatients: 2847,
    todayAppointments: 89,
    monthlyRevenue: 1240000,
    insuranceClaims: 47,
    trends: {
      clinics: { value: 8, isPositive: true },
      doctors: { value: 12, isPositive: true },
      patients: { value: 23, isPositive: true },
      appointments: { value: 5, isPositive: false },
      revenue: { value: 15, isPositive: true },
      claims: { value: 8, isPositive: true }
    }
  }
  
  res.json(dashboardData)
})

// Get financial reports
router.get('/financial', (req, res) => {
  const financialData = {
    totalRevenue: 1240000,
    totalExpenses: 890000,
    netProfit: 350000,
    revenueByClinic: [
      { clinic: 'CityCare Hospital', revenue: 280000 },
      { clinic: 'MediPlus Clinic', revenue: 140000 },
      { clinic: 'HealthFirst Center', revenue: 0 }
    ],
    monthlyTrends: [
      { month: 'Jan', revenue: 100000, expenses: 75000 },
      { month: 'Feb', revenue: 120000, expenses: 80000 },
      { month: 'Mar', revenue: 110000, expenses: 85000 },
      { month: 'Apr', revenue: 130000, expenses: 78000 },
      { month: 'May', revenue: 140000, expenses: 82000 },
      { month: 'Jun', revenue: 125000, expenses: 79000 }
    ]
  }
  
  res.json(financialData)
})

// Get patient analytics
router.get('/patients', (req, res) => {
  const patientData = {
    totalPatients: 2847,
    newPatients: 142,
    activePatients: 2340,
    patientsByAge: [
      { ageGroup: '0-18', count: 450 },
      { ageGroup: '19-35', count: 890 },
      { ageGroup: '36-50', count: 720 },
      { ageGroup: '51-65', count: 520 },
      { ageGroup: '65+', count: 267 }
    ],
    patientsByClinic: [
      { clinic: 'CityCare Hospital', patients: 1200 },
      { clinic: 'MediPlus Clinic', patients: 800 },
      { clinic: 'HealthFirst Center', patients: 400 },
      { clinic: 'Others', patients: 447 }
    ]
  }
  
  res.json(patientData)
})

// Get doctor performance
router.get('/doctors', (req, res) => {
  const doctorData = {
    totalDoctors: 120,
    activeDoctors: 108,
    averagePatients: 24,
    topPerformers: [
      { name: 'Dr. Darrell Stewart', patients: 89, revenue: 450000 },
      { name: 'Dr. Ronald Richards', patients: 76, revenue: 380000 },
      { name: 'Dr. Jerald OHara', patients: 65, revenue: 320000 }
    ],
    specialtyDistribution: [
      { specialty: 'General Medicine', count: 35 },
      { specialty: 'Pediatrics', count: 25 },
      { specialty: 'Cardiology', count: 20 },
      { specialty: 'Orthopedics', count: 18 },
      { specialty: 'Dentistry', count: 15 },
      { specialty: 'Others', count: 7 }
    ]
  }
  
  res.json(doctorData)
})

module.exports = router