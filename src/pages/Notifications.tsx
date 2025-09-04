import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  CreditCard
} from 'lucide-react';

const mockNotifications = [
  {
    id: '1',
    type: 'appointment',
    title: 'New appointment booked',
    message: 'Rahim Ahmed has booked an appointment with Dr. Ravi Kumar for Jan 26, 2024',
    time: '2 minutes ago',
    read: false,
    icon: Calendar,
    priority: 'normal'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment received',
    message: 'Payment of ₹2,500 received for Invoice INV-002',
    time: '1 hour ago',
    read: false,
    icon: CreditCard,
    priority: 'normal'
  },
  {
    id: '3',
    type: 'alert',
    title: 'Low stock alert',
    message: 'Ibuprofen 400mg is running low (25 units remaining)',
    time: '3 hours ago',
    read: true,
    icon: AlertTriangle,
    priority: 'high'
  }
];

export const Notifications = () => {
  return (
    <DashboardLayout title="Notifications">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Notification Center</h2>
            <p className="text-muted-foreground">Stay updated with system alerts and activities</p>
          </div>
          <Button variant="outline">Mark all as read</Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {mockNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card key={notification.id} className={`p-6 ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    notification.priority === 'high' ? 'bg-red-100' : 'bg-primary/10'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      notification.priority === 'high' ? 'text-red-600' : 'text-primary'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{notification.title}</h3>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Badge variant="secondary">New</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{notification.message}</p>
                    {!notification.read && (
                      <Button variant="ghost" size="sm" className="mt-2">
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State for older notifications */}
        <div className="text-center py-8 text-muted-foreground">
          <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>You're all caught up!</p>
        </div>
      </div>
    </DashboardLayout>
  );
};