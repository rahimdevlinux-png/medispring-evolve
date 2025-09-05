import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const demoCredentials = [
    { role: 'Super Master Admin', email: 'ceo@smaart.local', password: 'Password123!' },
    { role: 'Clinic Admin', email: 'admin.citycare@smaart.local', password: 'Password123!' },
    { role: 'Doctor', email: 'dr.ravi@citycare.smaart.local', password: 'Password123!' },
    { role: 'Nurse', email: 'nurse.priya@citycare.smaart.local', password: 'Password123!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medical-floating">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SMAART Healthcare</h1>
              <p className="text-white/80">Electronic Medical Records Platform</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Providing Advanced Healthcare Powered with AI
            </h2>
            <p className="text-white/80 leading-relaxed">
              Our Multispecialty Physical Clinics: Transforming physical care with the power of 
              digital innovation. From global EMR oversight to clinic-specific operations.
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="shadow-medical-floating bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Login to SMAART
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the EMR platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-sm mb-3 text-foreground">Demo Credentials:</h4>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword(cred.password);
                    }}
                    className="text-left p-2 hover:bg-background rounded border transition-colors"
                  >
                    <div className="font-medium text-foreground">{cred.role}</div>
                    <div className="text-muted-foreground">{cred.email}</div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};