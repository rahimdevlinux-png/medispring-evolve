import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Activity,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Power
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

const Clinics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Sample clinic data
  const [clinics, setClinics] = useState([
    {
      id: 1,
      name: 'CityCare Hospital',
      address: '123 Main Street, Downtown',
      phone: '+91-9876543210',
      email: 'admin@citycare.com',
      superAdmin: 'Dr. Rajesh Kumar',
      departments: ['Cardiology', 'Orthopedics', 'Neurology'],
      totalDoctors: 12,
      totalPatients: 523,
      status: 'active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'HealthFirst Clinic',
      address: '456 Park Avenue, Central',
      phone: '+91-9876543211',
      email: 'info@healthfirst.com',
      superAdmin: 'Dr. Priya Sharma',
      departments: ['General Medicine', 'Pediatrics'],
      totalDoctors: 8,
      totalPatients: 320,
      status: 'active',
      createdAt: '2024-02-01'
    },
    {
      id: 3,
      name: 'Metro Medical Center',
      address: '789 Hospital Road, Metro',
      phone: '+91-9876543212',
      email: 'contact@metromedical.com',
      superAdmin: 'Dr. Amit Patel',
      departments: ['Emergency', 'Surgery', 'Radiology'],
      totalDoctors: 15,
      totalPatients: 680,
      status: 'suspended',
      createdAt: '2024-01-20'
    }
  ]);

  const [newClinic, setNewClinic] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    superAdmin: ''
  });

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClinic = (e) => {
    e.preventDefault();
    const clinic = {
      id: Date.now(),
      ...newClinic,
      departments: [],
      totalDoctors: 0,
      totalPatients: 0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setClinics([...clinics, clinic]);
    setNewClinic({ name: '', address: '', phone: '', email: '', superAdmin: '' });
    setShowAddForm(false);
  };

  const toggleClinicStatus = (clinicId) => {
    setClinics(clinics.map(clinic => 
      clinic.id === clinicId 
        ? { ...clinic, status: clinic.status === 'active' ? 'suspended' : 'active' }
        : clinic
    ));
  };

  const deleteClinic = (clinicId) => {
    setClinics(clinics.filter(clinic => clinic.id !== clinicId));
  };

  return (
    <DashboardLayout title="Clinic Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search clinics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-primary hover:bg-primary-hover text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Clinic
          </Button>
        </div>

        {/* Add Clinic Form */}
        {showAddForm && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Clinic</h3>
            <form onSubmit={handleAddClinic} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Clinic Name</Label>
                  <Input
                    id="name"
                    value={newClinic.name}
                    onChange={(e) => setNewClinic({...newClinic, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="superAdmin">Super Admin Name</Label>
                  <Input
                    id="superAdmin"
                    value={newClinic.superAdmin}
                    onChange={(e) => setNewClinic({...newClinic, superAdmin: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClinic.email}
                    onChange={(e) => setNewClinic({...newClinic, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newClinic.phone}
                    onChange={(e) => setNewClinic({...newClinic, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={newClinic.address}
                    onChange={(e) => setNewClinic({...newClinic, address: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-primary hover:bg-primary-hover text-white">
                  Create Clinic
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Clinics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClinics.map((clinic) => (
            <Card key={clinic.id} className="hospital-card hover:shadow-hospital-floating transition-shadow duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-medical-teal/10 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-medical-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{clinic.name}</h3>
                      <Badge variant={clinic.status === 'active' ? 'default' : 'destructive'}>
                        {clinic.status}
                      </Badge>
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
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleClinicStatus(clinic.id)}>
                        <Power className="mr-2 h-4 w-4" />
                        {clinic.status === 'active' ? 'Suspend' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => deleteClinic(clinic.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{clinic.email}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{clinic.totalDoctors}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Doctors</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{clinic.totalPatients}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Patients</p>
                    </div>
                  </div>
                </div>

                {/* Super Admin */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">Super Admin</p>
                  <p className="font-medium">{clinic.superAdmin}</p>
                </div>

                {/* Departments */}
                {clinic.departments.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {clinic.departments.slice(0, 2).map((dept, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {dept}
                        </Badge>
                      ))}
                      {clinic.departments.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{clinic.departments.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredClinics.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No clinics found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first clinic'}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-primary hover:bg-primary-hover text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Clinic
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Clinics;