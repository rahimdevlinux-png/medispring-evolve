import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  UserPlus, 
  Calendar, 
  CreditCard, 
  Pill, 
  Microscope, 
  ArrowRightLeft, 
  BarChart3, 
  Bell,
  Stethoscope,
  ClipboardList,
  Heart,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: string[];
}

const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse', 'billing', 'pharmacy']
  },
  {
    label: 'Clinics',
    icon: <Building2 className="h-5 w-5" />,
    href: '/clinics',
    roles: ['super_master_admin']
  },
  {
    label: 'Doctors',
    icon: <Stethoscope className="h-5 w-5" />,
    href: '/doctors',
    roles: ['super_master_admin', 'super_admin']
  },
  {
    label: 'Patients',
    icon: <Users className="h-5 w-5" />,
    href: '/patients',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse']
  },
  {
    label: 'Appointments',
    icon: <Calendar className="h-5 w-5" />,
    href: '/appointments',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse']
  },
  {
    label: 'My Schedule',
    icon: <ClipboardList className="h-5 w-5" />,
    href: '/schedule',
    roles: ['doctor', 'nurse']
  },
  {
    label: 'Billing & Insurance',
    icon: <CreditCard className="h-5 w-5" />,
    href: '/billing',
    roles: ['super_master_admin', 'super_admin', 'billing']
  },
  {
    label: 'Pharmacy',
    icon: <Pill className="h-5 w-5" />,
    href: '/pharmacy',
    roles: ['super_master_admin', 'super_admin', 'pharmacy']
  },
  {
    label: 'Labs & Diagnostics',
    icon: <Microscope className="h-5 w-5" />,
    href: '/labs',
    roles: ['super_master_admin', 'super_admin', 'doctor']
  },
  {
    label: 'Referrals',
    icon: <ArrowRightLeft className="h-5 w-5" />,
    href: '/referrals',
    roles: ['super_master_admin', 'super_admin', 'doctor']
  },
  {
    label: 'Reports & Analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    href: '/reports',
    roles: ['super_master_admin', 'super_admin']
  },
  {
    label: 'Notifications',
    icon: <Bell className="h-5 w-5" />,
    href: '/notifications',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse', 'billing', 'pharmacy']
  }
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const filteredItems = navigationItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border shadow-medical-card">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">SMAART</h2>
            <p className="text-xs text-sidebar-foreground/70">Healthcare EMR</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground transition-all duration-200',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isActive && 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
              )
            }
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Role Badge */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-sidebar-accent rounded-lg p-3 text-center">
          <Shield className="h-5 w-5 mx-auto mb-1 text-sidebar-accent-foreground" />
          <p className="text-xs font-medium text-sidebar-accent-foreground capitalize">
            {user?.role?.replace('_', ' ')}
          </p>
        </div>
      </div>
    </aside>
  );
};