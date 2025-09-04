import React, { useState } from 'react';
import { Plus, Building2, MapPin, Users, DollarSign, MoreHorizontal } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

// Mock clinic data
const mockClinics = [
  {
    id: '1',
    name: 'CityCare Hospital',
    location: 'Mumbai, Maharashtra',
    address: '123 Health Street, Andheri West',
    status: 'active',
    superAdmin: 'Dr. Sarah Johnson',
    superAdminEmail: 'admin.citycare@smaart.local',
    patients: 523,
    doctors: 12,
    staff: 28,
    monthlyRevenue: '₹2.8L',
    joinedDate: '2024-01-15',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    name: 'MediPlus Clinic',
    location: 'Delhi, NCR',
    address: '45 Care Avenue, Connaught Place',
    status: 'active',
    superAdmin: 'Dr. Rajesh Kumar',
    superAdminEmail: 'admin.mediplus@smaart.local',
    patients: 234,
    doctors: 8,
    staff: 15,
    monthlyRevenue: '₹1.4L',
    joinedDate: '2024-02-20',
    phone: '+91 98765 43211'
  },
  {
    id: '3',
    name: 'HealthFirst Center',
    location: 'Bangalore, Karnataka',
    address: '78 Wellness Road, Koramangala',
    status: 'pending',
    superAdmin: 'Dr. Priya Sharma',
    superAdminEmail: 'admin.healthfirst@smaart.local',
    patients: 0,
    doctors: 0,
    staff: 0,
    monthlyRevenue: '₹0',
    joinedDate: '2024-03-01',
    phone: '+91 98765 43212'
  }
];

export const Clinics: React.FC = () => {
  const [clinics, setClinics] = useState(mockClinics);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newClinic, setNewClinic] = useState({
    name: '',
    location: '',
    address: '',
    phone: '',
    superAdminName: '',
    superAdminEmail: ''
  });

  const handleAddClinic = () => {
    const clinic = {
      id: String(clinics.length + 1),
      name: newClinic.name,
      location: newClinic.location,
      address: newClinic.address,
      status: 'pending' as const,
      superAdmin: newClinic.superAdminName,
      superAdminEmail: newClinic.superAdminEmail,
      patients: 0,
      doctors: 0,
      staff: 0,
      monthlyRevenue: '₹0',
      joinedDate: new Date().toISOString().split('T')[0],
      phone: newClinic.phone
    };

    setClinics([...clinics, clinic]);
    setIsAddDialogOpen(false);
    setNewClinic({
      name: '',
      location: '',
      address: '',
      phone: '',
      superAdminName: '',
      superAdminEmail: ''
    });
    
    toast({
      title: "Clinic Added Successfully",
      description: `${newClinic.name} has been registered and is pending activation.`,
    });
  };

  const handleStatusChange = (clinicId: string, newStatus: 'active' | 'suspended') => {
    setClinics(clinics.map(clinic => 
      clinic.id === clinicId 
        ? { ...clinic, status: newStatus }
        : clinic
    ));
    
    const statusText = newStatus === 'active' ? 'activated' : 'suspended';
    toast({
      title: `Clinic ${statusText}`,
      description: `The clinic has been ${statusText} successfully.`,
    });
  };

  return (
    <DashboardLayout title="Clinic Management">
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Partner Clinics</h2>
            <p className="text-muted-foreground">Manage your healthcare network</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Clinic
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Clinic</DialogTitle>
                <DialogDescription>
                  Register a new healthcare partner to your network.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-name">Clinic Name</Label>
                  <Input
                    id="clinic-name"
                    placeholder="e.g., WellCare Hospital"
                    value={newClinic.name}
                    onChange={(e) => setNewClinic({ ...newClinic, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={newClinic.location}
                    onChange={(e) => setNewClinic({ ...newClinic, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    placeholder="Complete address"
                    value={newClinic.address}
                    onChange={(e) => setNewClinic({ ...newClinic, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={newClinic.phone}
                    onChange={(e) => setNewClinic({ ...newClinic, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Super Admin Name</Label>
                  <Input
                    id="admin-name"
                    placeholder="e.g., Dr. John Doe"
                    value={newClinic.superAdminName}
                    onChange={(e) => setNewClinic({ ...newClinic, superAdminName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Super Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@clinic.com"
                    value={newClinic.superAdminEmail}
                    onChange={(e) => setNewClinic({ ...newClinic, superAdminEmail: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleAddClinic}
                  className="bg-gradient-primary"
                  disabled={!newClinic.name || !newClinic.superAdminEmail}
                >
                  Add Clinic
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Clinics Grid */}
        <div className="grid gap-6">
          {clinics.map((clinic) => (
            <Card key={clinic.id} className="shadow-medical-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      {clinic.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {clinic.location}
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={clinic.status === 'active' ? 'default' : 
                               clinic.status === 'pending' ? 'secondary' : 'destructive'}
                    >
                      {clinic.status}
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {clinic.status === 'pending' && (
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(clinic.id, 'active')}
                          >
                            Activate Clinic
                          </DropdownMenuItem>
                        )}
                        {clinic.status === 'active' && (
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(clinic.id, 'suspended')}
                            className="text-destructive"
                          >
                            Suspend Clinic
                          </DropdownMenuItem>
                        )}
                        {clinic.status === 'suspended' && (
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(clinic.id, 'active')}
                            className="text-success"
                          >
                            Reactivate Clinic
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">Contact Information</h4>
                    <p className="text-sm text-muted-foreground">{clinic.address}</p>
                    <p className="text-sm text-muted-foreground">{clinic.phone}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">Super Admin</h4>
                    <p className="text-sm text-muted-foreground">{clinic.superAdmin}</p>
                    <p className="text-sm text-muted-foreground">{clinic.superAdminEmail}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-lg">{clinic.patients}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Patients</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-lg">{clinic.doctors}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Doctors</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-lg">{clinic.staff}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Total Staff</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-lg">{clinic.monthlyRevenue}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Monthly Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};