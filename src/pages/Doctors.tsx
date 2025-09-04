import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  UserPlus, 
  Stethoscope, 
  Calendar,
  Users,
  TrendingUp,
  Star,
  MapPin,
  Phone,
  Mail,
  GraduationCap
} from 'lucide-react';

const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Ravi Kumar',
    specialization: 'Orthopedics',
    department: 'Orthopedic Surgery',
    experience: '12 years',
    qualification: 'MBBS, MS Orthopedics',
    phone: '+91 98765 43210',
    email: 'dr.ravi@citycare.local',
    status: 'Active',
    avatar: '👨‍⚕️',
    patientsAssigned: 45,
    appointmentsToday: 8,
    rating: 4.8,
    location: 'Building A, Floor 2'
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    specialization: 'Cardiology',
    department: 'Cardiology',
    experience: '8 years',
    qualification: 'MBBS, MD Cardiology',
    phone: '+91 98765 43211',
    email: 'dr.priya@citycare.local',
    status: 'Active',
    avatar: '👩‍⚕️',
    patientsAssigned: 32,
    appointmentsToday: 6,
    rating: 4.9,
    location: 'Building B, Floor 1'
  }
];

export const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = mockDoctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedDoctor) {
    return (
      <DashboardLayout title="Doctor Profile">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
              ← Back to Doctors
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Doctor Info */}
            <Card className="p-6">
              <div className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    {selectedDoctor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedDoctor.name}</h2>
                  <p className="text-muted-foreground">{selectedDoctor.specialization}</p>
                  <Badge variant="secondary" className="mt-2">
                    {selectedDoctor.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedDoctor.qualification}</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedDoctor.experience} Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedDoctor.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedDoctor.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedDoctor.email}</span>
                </div>
              </div>
            </Card>

            {/* Tabs Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="patients" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="patients">Assigned Patients</TabsTrigger>
                  <TabsTrigger value="appointments">Today's Schedule</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="patients">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Assigned Patients ({selectedDoctor.patientsAssigned})</h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>P{i}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Patient {i}</p>
                              <p className="text-sm text-muted-foreground">Last visit: {i} days ago</p>
                            </div>
                          </div>
                          <Badge variant="outline">Active</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="appointments">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Today's Appointments ({selectedDoctor.appointmentsToday})</h3>
                    <div className="space-y-3">
                      {[
                        { time: '09:00 AM', patient: 'John Doe', type: 'Consultation' },
                        { time: '10:30 AM', patient: 'Jane Smith', type: 'Follow-up' },
                        { time: '02:00 PM', patient: 'Mike Johnson', type: 'Consultation' }
                      ].map((apt, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{apt.time} - {apt.patient}</p>
                              <p className="text-sm text-muted-foreground">{apt.type}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">Scheduled</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="performance">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-6">
                      <div className="flex items-center gap-3">
                        <Star className="h-8 w-8 text-primary" />
                        <div>
                          <p className="text-2xl font-bold">{selectedDoctor.rating}</p>
                          <p className="text-sm text-muted-foreground">Patient Rating</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-6">
                      <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-primary" />
                        <div>
                          <p className="text-2xl font-bold">156</p>
                          <p className="text-sm text-muted-foreground">Total Consultations</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Doctors">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-gradient-primary text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Doctor
          </Button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="p-6 hover:shadow-medical-glow transition-all cursor-pointer"
                  onClick={() => setSelectedDoctor(doctor)}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {doctor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  </div>
                  <Badge variant="secondary">{doctor.status}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary mr-1" />
                      <span className="font-semibold">{doctor.patientsAssigned}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Patients</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary mr-1" />
                      <span className="font-semibold">{doctor.appointmentsToday}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Today</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <Star className="h-4 w-4 text-primary mr-1" />
                      <span className="font-semibold">{doctor.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Rating</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Stethoscope className="h-3 w-3 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};