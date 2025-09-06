const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Store OTPs temporarily (in production, use Redis)
const otpStore = new Map()

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body

    // Check if email is authorized (only super master admin)
    if (email !== 'admin@emr.com') {
      return res.status(401).json({ message: 'Unauthorized email address' })
    }

    // Generate OTP
    const otp = '123456' // In production, generate random 6-digit number
    
    // Store OTP with expiration (5 minutes)
    otpStore.set(email, {
      otp,
      expires: Date.now() + 5 * 60 * 1000
    })

    // In production, send OTP via email
    console.log(`OTP for ${email}: ${otp}`)

    res.json({ message: 'OTP sent successfully' })
  } catch (error) {
    console.error('Send OTP error:', error)
    res.status(500).json({ message: 'Failed to send OTP' })
  }
})

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body

    const storedOTP = otpStore.get(email)
    
    if (!storedOTP) {
      return res.status(400).json({ message: 'OTP not found or expired' })
    }

    if (Date.now() > storedOTP.expires) {
      otpStore.delete(email)
      return res.status(400).json({ message: 'OTP expired' })
    }

    if (storedOTP.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    // Clean up OTP
    otpStore.delete(email)

    // Generate JWT token
    const token = jwt.sign(
      { 
        email,
        role: 'super_master_admin'
      },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' }
    )

    res.json({
      token,
      user: {
        email,
        role: 'super_master_admin'
      }
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    res.status(500).json({ message: 'Failed to verify OTP' })
  }
})

module.exports = router