import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SuperMasterDashboard } from './SuperMasterDashboard';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { KPICard } from '../components/dashboard/KPICard';
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Pill, 
  CreditCard,
  Heart,
  Activity,
  Clock
} from 'lucide-react';

// Role-specific dashboards
const ClinicAdminDashboard = () => (
  <DashboardLayout title="Clinic Dashboard">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard title="Active Patients" value="523" icon={Users} trend={{ value: 12, isPositive: true }} />
      <KPICard title="Today's Appointments" value="24" icon={Calendar} trend={{ value: 8, isPositive: true }} />
      <KPICard title="Active Staff" value="18" icon={Activity} trend={{ value: 2, isPositive: true }} />
      <KPICard title="Monthly Revenue" value="₹2.8L" icon={CreditCard} trend={{ value: 15, isPositive: true }} />
    </div>
  </DashboardLayout>
);

const DoctorDashboard = () => (
  <DashboardLayout title="Doctor Dashboard">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard title="Today's Patients" value="12" icon={Users} />
      <KPICard title="Pending Appointments" value="8" icon={Clock} />
      <KPICard title="Completed Consults" value="156" icon={ClipboardList} trend={{ value: 8, isPositive: true }} />
      <KPICard title="Prescriptions" value="89" icon={Pill} trend={{ value: 12, isPositive: true }} />
    </div>
  </DashboardLayout>
);

const NurseDashboard = () => (
  <DashboardLayout title="Nursing Dashboard">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard title="Assigned Patients" value="18" icon={Users} />
      <KPICard title="Vitals Recorded" value="24" icon={Heart} />
      <KPICard title="Treatment Updates" value="12" icon={Activity} />
      <KPICard title="Home Visits" value="6" icon={ClipboardList} />
    </div>
  </DashboardLayout>
);

const BillingDashboard = () => (
  <DashboardLayout title="Billing Dashboard">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard title="Pending Invoices" value="23" icon={CreditCard} />
      <KPICard title="Collections Today" value="₹45K" icon={CreditCard} trend={{ value: 18, isPositive: true }} />
      <KPICard title="Insurance Claims" value="12" icon={ClipboardList} />
      <KPICard title="Outstanding" value="₹1.2L" icon={Activity} />
    </div>
  </DashboardLayout>
);

const PharmacyDashboard = () => (
  <DashboardLayout title="Pharmacy Dashboard">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard title="Prescriptions" value="34" icon={Pill} />
      <KPICard title="Dispensed Today" value="28" icon={Activity} />
      <KPICard title="Stock Alerts" value="6" icon={ClipboardList} />
      <KPICard title="Home Deliveries" value="12" icon={Users} />
    </div>
  </DashboardLayout>
);

const PatientDashboard = () => (
  <DashboardLayout title="My Health Dashboard">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard title="Upcoming Visits" value="2" icon={Calendar} />
      <KPICard title="Active Prescriptions" value="3" icon={Pill} />
      <KPICard title="Test Reports" value="8" icon={ClipboardList} />
      <KPICard title="Family Members" value="4" icon={Users} />
    </div>
  </DashboardLayout>
);

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // This shouldn't happen due to ProtectedRoute, but just in case
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'super_master_admin':
      return <SuperMasterDashboard />;
    case 'super_admin':
      return <ClinicAdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'nurse':
      return <NurseDashboard />;
    case 'billing':
      return <BillingDashboard />;
    case 'pharmacy':
      return <PharmacyDashboard />;
    case 'patient':
      return <PatientDashboard />;
    default:
      return (
        <DashboardLayout title="Dashboard">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to SMAART Healthcare</h2>
            <p className="text-muted-foreground">Your dashboard is being prepared...</p>
          </div>
        </DashboardLayout>
      );
  }
};

export default Index;