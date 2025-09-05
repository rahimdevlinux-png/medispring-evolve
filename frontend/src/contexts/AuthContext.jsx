import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Mock users for demo
  const mockUsers = [
    {
      id: '1',
      email: 'ceo@smaart.local',
      name: 'CEO Admin',
      role: 'super_master_admin',
      clinicId: null
    },
    {
      id: '2',
      email: 'admin.citycare@smaart.local',
      name: 'CityCare Admin',
      role: 'super_admin',
      clinicId: 'clinic-1'
    },
    {
      id: '3',
      email: 'dr.ravi@citycare.smaart.local',
      name: 'Dr. Ravi Kumar',
      role: 'doctor',
      clinicId: 'clinic-1'
    },
    {
      id: '4',
      email: 'nurse.priya@citycare.smaart.local',
      name: 'Nurse Priya',
      role: 'nurse',
      clinicId: 'clinic-1'
    }
  ];

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsInitialized(true);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Mock authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser && password === 'Password123!') {
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          setIsLoading(false);
          resolve(foundUser);
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isInitialized
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};