import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  CreditCard,
  Download,
  FileText
} from 'lucide-react';

export const Reports = () => {
  return (
    <DashboardLayout title="Reports & Analytics">
      <div className="space-y-6">
        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">₹12.5L</p>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-sm text-muted-foreground">Total Patients</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">856</p>
                <p className="text-sm text-muted-foreground">Appointments</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Collection Rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Available Reports */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Patient Registration Report', type: 'CSV/PDF', description: 'Monthly patient registrations' },
              { name: 'Revenue Analysis', type: 'Excel', description: 'Department-wise revenue breakdown' },
              { name: 'Doctor Utilization', type: 'PDF', description: 'Doctor appointment and revenue metrics' },
              { name: 'Insurance Claims Report', type: 'CSV', description: 'Claims status and approval rates' },
              { name: 'Pharmacy Sales', type: 'Excel', description: 'Medicine dispensing and stock reports' },
              { name: 'Lab Test Analytics', type: 'PDF', description: 'Test volumes and turnaround times' }
            ].map((report, index) => (
              <Card key={index} className="p-4 hover:shadow-medical-glow transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <FileText className="h-6 w-6 text-primary" />
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-3 w-3 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};