import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_master_admin' | 'super_admin' | 'doctor' | 'nurse' | 'billing' | 'pharmacy' | 'patient';
  clinicId?: string;
  clinicName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'ceo@smaart.local',
    name: 'CEO Admin',
    role: 'super_master_admin',
    avatar: '👨‍💼'
  },
  {
    id: '2',
    email: 'admin.citycare@smaart.local',
    name: 'Dr. Sarah Johnson',
    role: 'super_admin',
    clinicId: 'clinic-1',
    clinicName: 'CityCare Hospital',
    avatar: '👩‍⚕️'
  },
  {
    id: '3',
    email: 'dr.ravi@citycare.smaart.local',
    name: 'Dr. Ravi Kumar',
    role: 'doctor',
    clinicId: 'clinic-1',
    clinicName: 'CityCare Hospital',
    avatar: '👨‍⚕️'
  },
  {
    id: '4',
    email: 'nurse.priya@citycare.smaart.local',
    name: 'Nurse Priya',
    role: 'nurse',
    clinicId: 'clinic-1',
    clinicName: 'CityCare Hospital',
    avatar: '👩‍⚕️'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('smaart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers.find(u => u.email === email);
    if (mockUser && password === 'Password123!') {
      setUser(mockUser);
      localStorage.setItem('smaart_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smaart_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};