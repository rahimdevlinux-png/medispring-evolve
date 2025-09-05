import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserPlus, 
  Calendar, 
  CreditCard, 
  Pill, 
  Flask, 
  ArrowUpDown, 
  BarChart3, 
  Bell,
  Stethoscope,
  Activity
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

const navigationItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse', 'billing', 'pharmacy', 'patient']
  },
  {
    title: 'Clinics',
    icon: Building2,
    href: '/clinics',
    roles: ['super_master_admin', 'super_admin']
  },
  {
    title: 'Doctors',
    icon: Stethoscope,
    href: '/doctors',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse']
  },
  {
    title: 'Patients',
    icon: UserPlus,
    href: '/patients',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse', 'billing']
  },
  {
    title: 'Appointments',
    icon: Calendar,
    href: '/appointments',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse', 'patient']
  },
  {
    title: 'Billing & Insurance',
    icon: CreditCard,
    href: '/billing',
    roles: ['super_master_admin', 'super_admin', 'billing', 'patient']
  },
  {
    title: 'Pharmacy',
    icon: Pill,
    href: '/pharmacy',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'pharmacy', 'patient']
  },
  {
    title: 'Labs & Diagnostics',
    icon: Flask,
    href: '/labs',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse']
  },
  {
    title: 'Reports & Analytics',
    icon: BarChart3,
    href: '/reports',
    roles: ['super_master_admin', 'super_admin']
  },
  {
    title: 'Notifications',
    icon: Bell,
    href: '/notifications',
    roles: ['super_master_admin', 'super_admin', 'doctor', 'nurse', 'billing', 'pharmacy', 'patient']
  }
];

export const Sidebar = () => {
  const { user } = useAuth();

  const filteredNavigation = navigationItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {filteredNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                      isActive 
                        ? "bg-gradient-primary text-white shadow-medical-floating" 
                        : "text-muted-foreground"
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};