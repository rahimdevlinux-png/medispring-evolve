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
  Calendar,
  FileText,
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Activity
} from 'lucide-react';

const mockPatients = [
  {
    id: '1',
    name: 'Rahim Ahmed',
    uhid: 'UHID-0001',
    age: 34,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'rahim@email.com',
    address: '123 Main St, Mumbai',
    status: 'Active',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-01-25',
    doctor: 'Dr. Ravi Kumar',
    insurance: 'HDFC Health',
    avatar: '👨',
    medicalHistory: [
      { date: '2024-01-15', type: 'Consultation', doctor: 'Dr. Ravi Kumar', diagnosis: 'Hypertension' },
      { date: '2024-01-10', type: 'Lab Test', doctor: 'Dr. Priya Sharma', diagnosis: 'Blood Sugar Check' }
    ]
  },
  {
    id: '2',
    name: 'Priya Singh',
    uhid: 'UHID-0002',
    age: 28,
    gender: 'Female',
    phone: '+91 98765 43211',
    email: 'priya@email.com',
    address: '456 Park Ave, Delhi',
    status: 'Active',
    lastVisit: '2024-01-18',
    nextAppointment: '2024-01-28',
    doctor: 'Dr. Priya Sharma',
    insurance: 'Star Health',
    avatar: '👩',
    medicalHistory: [
      { date: '2024-01-18', type: 'Consultation', doctor: 'Dr. Priya Sharma', diagnosis: 'Regular Checkup' }
    ]
  }
];

export const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.uhid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPatient) {
    return (
      <DashboardLayout title="Patient Profile">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedPatient(null)}>
              ← Back to Patients
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Info */}
            <Card className="p-6">
              <div className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    {selectedPatient.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedPatient.name}</h2>
                  <p className="text-muted-foreground">UHID: {selectedPatient.uhid}</p>
                  <Badge variant="secondary" className="mt-2">
                    {selectedPatient.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedPatient.age} years, {selectedPatient.gender}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedPatient.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedPatient.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedPatient.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedPatient.insurance}</span>
                </div>
              </div>
            </Card>

            {/* Tabs Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="history" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="history">Medical History</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance</TabsTrigger>
                </TabsList>

                <TabsContent value="history">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Medical Timeline</h3>
                    <div className="space-y-4">
                      {selectedPatient.medicalHistory.map((record: any, i: number) => (
                        <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            {i < selectedPatient.medicalHistory.length - 1 && <div className="w-0.5 h-16 bg-muted mt-2"></div>}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{record.type}</h4>
                              <span className="text-sm text-muted-foreground">{record.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">Doctor: {record.doctor}</p>
                            <p className="text-sm">{record.diagnosis}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Blood Test Report', date: '2024-01-15', type: 'PDF' },
                        { name: 'X-Ray Chest', date: '2024-01-10', type: 'Image' }
                      ].map((doc, i) => (
                        <div key={i} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="appointments">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Upcoming & Past Appointments</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-800">Next Appointment</p>
                            <p className="text-sm text-green-600">{selectedPatient.nextAppointment} with {selectedPatient.doctor}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Upcoming</Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Last Visit</p>
                            <p className="text-sm text-muted-foreground">{selectedPatient.lastVisit} - Consultation completed</p>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="insurance">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Insurance Coverage</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Shield className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-medium">{selectedPatient.insurance}</p>
                            <p className="text-sm text-muted-foreground">Policy Active</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Coverage Limit</p>
                            <p className="font-medium">₹5,00,000</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Used Amount</p>
                            <p className="font-medium">₹45,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Patients">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patients..."
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
            Add Patient
          </Button>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="p-6 hover:shadow-medical-glow transition-all cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {patient.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                    <p className="text-sm text-muted-foreground">{patient.uhid}</p>
                  </div>
                  <Badge variant="secondary">{patient.status}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="h-3 w-3 text-muted-foreground" />
                    <span>{patient.age} years, {patient.gender}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="h-3 w-3 text-muted-foreground" />
                    <span>Dr: {patient.doctor}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t">
                  <div className="flex-1 text-center">
                    <p className="text-xs text-muted-foreground">Last Visit</p>
                    <p className="text-xs font-medium">{patient.lastVisit}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-muted-foreground">Next Appointment</p>
                    <p className="text-xs font-medium">{patient.nextAppointment}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};