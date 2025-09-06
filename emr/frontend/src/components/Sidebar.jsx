import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  UserPlus, 
  CreditCard, 
  Pill, 
  Calendar, 
  TestTube, 
  FileText, 
  Bell 
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Clinics', path: '/clinics', icon: Building2 },
  { name: 'Doctors', path: '/doctors', icon: Users },
  { name: 'Patients', path: '/patients', icon: UserPlus },
  { name: 'Billing', path: '/billing', icon: CreditCard },
  { name: 'Pharmacy', path: '/pharmacy', icon: Pill },
  { name: 'Appointments', path: '/appointments', icon: Calendar },
  { name: 'Labs', path: '/labs', icon: TestTube },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Notifications', path: '/notifications', icon: Bell },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-gray-900">EMR System</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar