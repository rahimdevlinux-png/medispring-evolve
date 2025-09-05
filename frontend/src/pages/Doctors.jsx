import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  UserCheck, 
  Calendar, 
  Clock, 
  Star, 
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Sample doctor data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiology',
      qualification: 'MBBS, MD Cardiology',
      experience: '12 years',
      phone: '+91-9876543210',
      email: 'rajesh@citycare.com',
      clinicName: 'CityCare Hospital',
      department: 'Cardiology',
      todayAppointments: 8,
      totalPatients: 1250,
      rating: 4.8,
      status: 'active',
      availability: 'Available',
      consultationFee: '₹500',
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      qualification: 'MBBS, MD Pediatrics',
      experience: '8 years',
      phone: '+91-9876543211',
      email: 'priya@healthfirst.com',
      clinicName: 'HealthFirst Clinic',
      department: 'Pediatrics',
      todayAppointments: 12,
      totalPatients: 890,
      rating: 4.9,
      status: 'active',
      availability: 'Busy',
      consultationFee: '₹450',
      image: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialty: 'Orthopedics',
      qualification: 'MBBS, MS Orthopedics',
      experience: '15 years',
      phone: '+91-9876543212',
      email: 'amit@metromedical.com',
      clinicName: 'Metro Medical Center',
      department: 'Orthopedics',
      todayAppointments: 6,
      totalPatients: 2100,
      rating: 4.7,
      status: 'active',
      availability: 'Available',
      consultationFee: '₹600',
      image: '/api/placeholder/100/100'
    }
  ];

  const specialties = ['all', 'Cardiology', 'Pediatrics', 'Orthopedics', 'Neurology', 'General Medicine'];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.clinicName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'Offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Doctor Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>
                  {specialty === 'all' ? 'All Specialties' : specialty}
                </option>
              ))}
            </select>
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-medical-teal/10 rounded-lg flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-medical-teal" />
              </div>
              <div>
                <p className="text-2xl font-semibold">24</p>
                <p className="text-sm text-muted-foreground">Total Doctors</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">18</p>
                <p className="text-sm text-muted-foreground">Available Today</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">156</p>
                <p className="text-sm text-muted-foreground">Appointments Today</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">4.8</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hospital-card hover:shadow-hospital-floating transition-shadow duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-medical-teal/10 rounded-full flex items-center justify-center">
                      <UserCheck className="h-8 w-8 text-medical-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <Badge className={getAvailabilityColor(doctor.availability)}>
                    {doctor.availability}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Experience</p>
                      <p className="font-medium">{doctor.experience}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Consultation Fee</p>
                      <p className="font-medium">{doctor.consultationFee}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">Qualification</p>
                    <p className="font-medium text-sm">{doctor.qualification}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.clinicName}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{doctor.todayAppointments}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <UserCheck className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{doctor.totalPatients}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Total Patients</p>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span className="text-xs">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="text-xs">{doctor.email}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <UserCheck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No doctors found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedSpecialty !== 'all' 
                ? 'Try adjusting your search criteria' 
                : 'Get started by adding doctors to your clinic'}
            </p>
            <Button className="bg-primary hover:bg-primary-hover text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Doctor
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Doctors;