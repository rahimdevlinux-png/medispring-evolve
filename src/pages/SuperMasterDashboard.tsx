import React from 'react';
import { 
  Building2, 
  Users, 
  UserPlus, 
  Calendar, 
  DollarSign, 
  FileText,
  TrendingUp,
  Activity,
  Shield,
  Plus
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const kpiData = [
  {
    title: 'Total Clinics',
    value: '24',
    icon: Building2,
    trend: { value: 8, isPositive: true }
  },
  {
    title: 'Healthcare Professionals',
    value: '156',
    icon: Users,
    trend: { value: 12, isPositive: true }
  },
  {
    title: 'Active Patients',
    value: '2,847',
    icon: UserPlus,
    trend: { value: 23, isPositive: true }
  },
  {
    title: 'Appointments Today',
    value: '89',
    icon: Calendar,
    trend: { value: 5, isPositive: false }
  },
  {
    title: 'Monthly Revenue',
    value: '₹12.4L',
    icon: DollarSign,
    trend: { value: 15, isPositive: true }
  },
  {
    title: 'Insurance Claims',
    value: '47',
    icon: FileText,
    trend: { value: 8, isPositive: true }
  }
];

const recentClinics = [
  {
    id: '1',
    name: 'CityCare Hospital',
    location: 'Mumbai, Maharashtra',
    status: 'active',
    patients: 523,
    revenue: '₹2.8L',
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'MediPlus Clinic',
    location: 'Delhi, NCR',
    status: 'active',
    patients: 234,
    revenue: '₹1.4L',
    lastActive: '5 hours ago'
  },
  {
    id: '3',
    name: 'HealthFirst Center',
    location: 'Bangalore, Karnataka',
    status: 'pending',
    patients: 0,
    revenue: '₹0',
    lastActive: 'Not activated'
  }
];

const recentActivities = [
  {
    id: '1',
    action: 'New clinic registered',
    clinic: 'WellCare Hospital',
    time: '2 hours ago',
    type: 'clinic'
  },
  {
    id: '2',
    action: 'Insurance partner approved',
    clinic: 'HDFC ERGO',
    time: '4 hours ago',
    type: 'insurance'
  },
  {
    id: '3',
    action: 'Clinic suspended',
    clinic: 'QuickMed Clinic',
    time: '1 day ago',
    type: 'warning'
  }
];

export const SuperMasterDashboard: React.FC = () => {
  return (
    <DashboardLayout title="Global EMR Dashboard">
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              trend={kpi.trend}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Manage your healthcare network efficiently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-auto p-6 flex flex-col items-center gap-3 bg-gradient-primary hover:opacity-90">
                <Plus className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Add Clinic</div>
                  <div className="text-xs opacity-90">Register new partner</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3">
                <Users className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <div className="font-medium">Manage Staff</div>
                  <div className="text-xs text-muted-foreground">View all professionals</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <div className="font-medium">Analytics</div>
                  <div className="text-xs text-muted-foreground">View detailed reports</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-3">
                <Activity className="h-6 w-6 text-primary" />
                <div className="text-center">
                  <div className="font-medium">System Health</div>
                  <div className="text-xs text-muted-foreground">Monitor platform</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Clinics */}
          <Card>
            <CardHeader>
              <CardTitle>Clinic Partners</CardTitle>
              <CardDescription>
                Recent clinic activities and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClinics.map((clinic) => (
                  <div key={clinic.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{clinic.name}</h4>
                        <Badge variant={clinic.status === 'active' ? 'default' : 'secondary'}>
                          {clinic.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{clinic.location}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{clinic.patients} patients</span>
                        <span>{clinic.revenue} revenue</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{clinic.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest system events and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'clinic' ? 'bg-primary' :
                      activity.type === 'insurance' ? 'bg-success' : 'bg-warning'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.clinic}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};