import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [step, setStep] = useState('email') // 'email' or 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  
  const { user, sendOTP, verifyOTP, isLoading } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      await sendOTP(email)
      setStep('otp')
    } catch (error) {
      setError(error.message || 'Failed to send OTP')
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      await verifyOTP(email, otp)
    } catch (error) {
      setError(error.message || 'Failed to verify OTP')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Super Master Admin Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 'email' ? 'Enter your email to receive OTP' : 'Enter the OTP sent to your email'}
          </p>
        </div>
        
        <div className="card p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          {step === 'email' ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 input-field"
                  placeholder="admin@emr.com"
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="mt-1 input-field text-center text-xl tracking-widest"
                  placeholder="123456"
                  maxLength="6"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep('email')
                    setOtp('')
                    setError('')
                  }}
                  className="flex-1 btn-secondary py-3"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 btn-primary py-3"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Demo Email: admin@emr.com | Demo OTP: 123456
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login