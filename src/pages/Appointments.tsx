import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  User,
  Stethoscope,
  MapPin,
  Phone,
  Video
} from 'lucide-react';

const mockAppointments = [
  {
    id: '1',
    patient: 'Rahim Ahmed',
    doctor: 'Dr. Ravi Kumar',
    date: '2024-01-25',
    time: '09:00 AM',
    type: 'Consultation',
    status: 'Scheduled',
    mode: 'In-Person',
    department: 'Orthopedics',
    notes: 'Follow-up for knee pain'
  },
  {
    id: '2',
    patient: 'Priya Singh',
    doctor: 'Dr. Priya Sharma',
    date: '2024-01-25',
    time: '10:30 AM',
    type: 'Follow-up',
    status: 'Confirmed',
    mode: 'Telehealth',
    department: 'Cardiology',
    notes: 'Blood pressure check'
  },
  {
    id: '3',
    patient: 'John Doe',
    doctor: 'Dr. Ravi Kumar',
    date: '2024-01-24',
    time: '02:00 PM',
    type: 'Consultation',
    status: 'Completed',
    mode: 'In-Person',
    department: 'Orthopedics',
    notes: 'X-ray review'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Scheduled': return 'bg-blue-100 text-blue-800';
    case 'Confirmed': return 'bg-green-100 text-green-800';
    case 'Completed': return 'bg-gray-100 text-gray-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const Appointments = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-01-25');

  const filteredAppointments = mockAppointments.filter(apt =>
    apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayAppointments = filteredAppointments.filter(apt => apt.date === selectedDate);

  return (
    <DashboardLayout title="Appointments">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button className="bg-gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Mini Calendar */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Calendar</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
                  <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({length: 35}, (_, i) => {
                    const day = i - 6;
                    const isToday = day === 25;
                    const hasAppointments = day === 24 || day === 25 || day === 26;
                    return (
                      <button
                        key={i}
                        className={`aspect-square text-xs rounded-md transition-colors ${
                          day < 1 ? 'text-muted-foreground' :
                          isToday ? 'bg-primary text-primary-foreground' :
                          hasAppointments ? 'bg-green-100 text-green-800' :
                          'hover:bg-muted'
                        }`}
                        onClick={() => day > 0 && setSelectedDate(`2024-01-${day.toString().padStart(2, '0')}`)}
                      >
                        {day > 0 ? day : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Day Schedule */}
            <div className="lg:col-span-3">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">
                    Schedule for {new Date(selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <Badge variant="secondary">{todayAppointments.length} appointments</Badge>
                </div>

                <div className="space-y-4">
                  {todayAppointments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No appointments scheduled for this date</p>
                    </div>
                  ) : (
                    todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="flex flex-col items-center min-w-[60px]">
                          <Clock className="h-4 w-4 text-muted-foreground mb-1" />
                          <span className="text-sm font-medium">{appointment.time}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{appointment.patient}</h4>
                            <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                            {appointment.mode === 'Telehealth' && (
                              <Badge variant="outline" className="text-xs">
                                <Video className="h-3 w-3 mr-1" />
                                Telehealth
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Stethoscope className="h-3 w-3" />
                              {appointment.doctor}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {appointment.department}
                            </span>
                            <span>{appointment.type}</span>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground mt-1">{appointment.notes}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Cancel</Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {/* Filter Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All Appointments</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center min-w-[80px]">
                          <div className="text-sm font-medium">{appointment.date}</div>
                          <div className="text-lg font-bold">{appointment.time}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{appointment.patient}</h3>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            {appointment.mode === 'Telehealth' && (
                              <Badge variant="outline">
                                <Video className="h-3 w-3 mr-1" />
                                Telehealth
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                              <Stethoscope className="h-4 w-4" />
                              {appointment.doctor}
                            </span>
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {appointment.department}
                            </span>
                            <span>{appointment.type}</span>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm text-muted-foreground mt-2">{appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Patient
                        </Button>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Cancel</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};