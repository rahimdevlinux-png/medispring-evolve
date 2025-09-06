import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ role: 'super_master_admin' })
    }
    setIsInitialized(true)
  }, [])

  const sendOTP = async (email) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/auth/send-otp', { email })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send OTP' }
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async (email, otp) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/auth/verify-otp', { email, otp })
      const { token, user: userData } = response.data
      
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)
      
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to verify OTP' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    isInitialized,
    sendOTP,
    verifyOTP,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}