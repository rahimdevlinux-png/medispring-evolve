const express = require('express')
const router = express.Router()

// Mock data
let notifications = [
  {
    id: '1',
    title: 'New Clinic Registration',
    message: 'WellCare Hospital has submitted registration request',
    type: 'clinic',
    priority: 'medium',
    read: false,
    createdAt: '2023-12-06T10:30:00Z',
    actionRequired: true
  },
  {
    id: '2',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM',
    type: 'system',
    priority: 'high',
    read: false,
    createdAt: '2023-12-06T09:15:00Z',
    actionRequired: false
  },
  {
    id: '3',
    title: 'Insurance Claim Approved',
    message: 'HDFC ERGO has approved claim #CLM-001 for CityCare Hospital',
    type: 'billing',
    priority: 'low',
    read: true,
    createdAt: '2023-12-06T08:45:00Z',
    actionRequired: false
  },
  {
    id: '4',
    title: 'Low Stock Alert',
    message: 'Amoxicillin 250mg is running low in MediPlus Clinic pharmacy',
    type: 'pharmacy',
    priority: 'medium',
    read: false,
    createdAt: '2023-12-06T07:20:00Z',
    actionRequired: true
  },
  {
    id: '5',
    title: 'New Doctor Added',
    message: 'Dr. Sarah Wilson has been added to CityCare Hospital staff',
    type: 'staff',
    priority: 'low',
    read: true,
    createdAt: '2023-12-05T16:30:00Z',
    actionRequired: false
  }
]

// Get all notifications
router.get('/', (req, res) => {
  const { unread, type, priority } = req.query
  let filtered = notifications
  
  if (unread === 'true') {
    filtered = filtered.filter(n => !n.read)
  }
  
  if (type) {
    filtered = filtered.filter(n => n.type === type)
  }
  
  if (priority) {
    filtered = filtered.filter(n => n.priority === priority)
  }
  
  res.json(filtered)
})

// Get notification by ID
router.get('/:id', (req, res) => {
  const notification = notifications.find(n => n.id === req.params.id)
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' })
  }
  res.json(notification)
})

// Mark notification as read
router.put('/:id/read', (req, res) => {
  const index = notifications.findIndex(n => n.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Notification not found' })
  }
  
  notifications[index].read = true
  res.json(notifications[index])
})

// Mark all notifications as read
router.put('/mark-all-read', (req, res) => {
  notifications = notifications.map(n => ({ ...n, read: true }))
  res.json({ message: 'All notifications marked as read' })
})

// Create new notification
router.post('/', (req, res) => {
  const newNotification = {
    id: String(notifications.length + 1),
    ...req.body,
    read: false,
    createdAt: new Date().toISOString()
  }
  notifications.unshift(newNotification)
  res.status(201).json(newNotification)
})

// Delete notification
router.delete('/:id', (req, res) => {
  const index = notifications.findIndex(n => n.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ message: 'Notification not found' })
  }
  
  notifications.splice(index, 1)
  res.json({ message: 'Notification deleted successfully' })
})

module.exports = router