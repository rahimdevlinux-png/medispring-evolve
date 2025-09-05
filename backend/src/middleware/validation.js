const Joi = require('joi');

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details[0].message
      });
    }
    
    next();
  };
};

// Auth validation schemas
const authValidation = {
  login: validate(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })),
  
  register: validate(Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(100).required(),
    role: Joi.string().valid(
      'super_master_admin', 
      'super_admin', 
      'doctor', 
      'nurse', 
      'billing', 
      'pharmacy', 
      'patient'
    ).required(),
    clinicId: Joi.string().allow(null)
  }))
};

// User validation schemas
const userValidation = {
  create: validate(Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(100).required(),
    role: Joi.string().valid(
      'super_master_admin', 
      'super_admin', 
      'doctor', 
      'nurse', 
      'billing', 
      'pharmacy', 
      'patient'
    ).required(),
    clinicId: Joi.string().allow(null),
    phone: Joi.string().pattern(/^[+]?[0-9]{10,15}$/),
    specialization: Joi.string().when('role', {
      is: 'doctor',
      then: Joi.required(),
      otherwise: Joi.optional()
    })
  })),
  
  update: validate(Joi.object({
    name: Joi.string().min(2).max(100),
    phone: Joi.string().pattern(/^[+]?[0-9]{10,15}$/),
    specialization: Joi.string(),
    status: Joi.string().valid('active', 'inactive', 'suspended')
  }))
};

// Clinic validation schemas
const clinicValidation = {
  create: validate(Joi.object({
    name: Joi.string().min(2).max(200).required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().default('India')
    }).required(),
    contact: Joi.object({
      phone: Joi.string().pattern(/^[+]?[0-9]{10,15}$/).required(),
      email: Joi.string().email().required()
    }).required(),
    superAdminEmail: Joi.string().email().required(),
    superAdminName: Joi.string().min(2).max(100).required()
  }))
};

// Patient validation schemas
const patientValidation = {
  create: validate(Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[+]?[0-9]{10,15}$/).required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required()
    }),
    emergencyContact: Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().pattern(/^[+]?[0-9]{10,15}$/).required(),
      relationship: Joi.string().required()
    })
  }))
};

module.exports = {
  validate,
  authValidation,
  userValidation,
  clinicValidation,
  patientValidation
};