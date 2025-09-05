const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authValidation } = require('../middleware/validation');
const router = express.Router();

// Mock users for demo (in production, these would be in the database)
const mockUsers = [
  {
    _id: '65f1234567890abcdef12345',
    email: 'ceo@smaart.local',
    name: 'CEO Admin',
    role: 'super_master_admin',
    clinicId: null,
    password: '$2a$10$rZ1jGQzXvZ.Kv8fF0qGzYuO0vY.Kv8fF0qGzYuO0vY.Kv8fF0qGzYu' // Password123!
  },
  {
    _id: '65f1234567890abcdef12346',
    email: 'admin.citycare@smaart.local',
    name: 'CityCare Admin',
    role: 'super_admin',
    clinicId: 'clinic-1',
    password: '$2a$10$rZ1jGQzXvZ.Kv8fF0qGzYuO0vY.Kv8fF0qGzYuO0vY.Kv8fF0qGzYu' // Password123!
  },
  {
    _id: '65f1234567890abcdef12347',
    email: 'dr.ravi@citycare.smaart.local',
    name: 'Dr. Ravi Kumar',
    role: 'doctor',
    clinicId: 'clinic-1',
    password: '$2a$10$rZ1jGQzXvZ.Kv8fF0qGzYuO0vY.Kv8fF0qGzYuO0vY.Kv8fF0qGzYu' // Password123!
  },
  {
    _id: '65f1234567890abcdef12348',
    email: 'nurse.priya@citycare.smaart.local',
    name: 'Nurse Priya',
    role: 'nurse',
    clinicId: 'clinic-1',
    password: '$2a$10$rZ1jGQzXvZ.Kv8fF0qGzYuO0vY.Kv8fF0qGzYuO0vY.Kv8fF0qGzYu' // Password123!
  }
];

// Login endpoint
router.post('/login', authValidation.login, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in mock data (in production, use database)
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role,
        clinicId: user.clinicId 
      },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register endpoint (for new users)
router.post('/register', authValidation.register, async (req, res) => {
  try {
    const { email, password, name, role, clinicId } = req.body;

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // In production, save to database
    const newUser = {
      _id: new Date().getTime().toString(),
      email,
      name,
      role,
      clinicId,
      password: hashedPassword
    };

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id, 
        email: newUser.email, 
        role: newUser.role,
        clinicId: newUser.clinicId 
      },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify token endpoint
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = mockUsers.find(u => u._id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;