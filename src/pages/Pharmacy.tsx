import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Pill, 
  Search, 
  Filter,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  User
} from 'lucide-react';

const mockPrescriptions = [
  {
    id: 'RX-001',
    patient: 'R***h A***d', // Masked for privacy
    uhid: 'UHID-0001',
    doctor: 'Dr. Ravi Kumar',
    medicines: [
      { name: 'Paracetamol 500mg', quantity: 20, dosage: '1-0-1 after meals' },
      { name: 'Ibuprofen 400mg', quantity: 10, dosage: '1-1-1 after meals' }
    ],
    status: 'Pending',
    date: '2024-01-25',
    deliveryMode: 'Pickup'
  },
  {
    id: 'RX-002',
    patient: 'P***a S***h',
    uhid: 'UHID-0002',
    doctor: 'Dr. Priya Sharma',
    medicines: [
      { name: 'Atenolol 25mg', quantity: 30, dosage: '1-0-0 before breakfast' },
      { name: 'Aspirin 75mg', quantity: 30, dosage: '0-0-1 after dinner' }
    ],
    status: 'Dispensed',
    date: '2024-01-24',
    deliveryMode: 'Home Delivery'
  }
];

const mockInventory = [
  {
    id: 'MED-001',
    name: 'Paracetamol 500mg',
    manufacturer: 'Cipla',
    batch: 'PC240115',
    expiry: '2025-12-31',
    stock: 500,
    minStock: 100,
    price: 2.50,
    location: 'A-1-15'
  },
  {
    id: 'MED-002',
    name: 'Ibuprofen 400mg',
    manufacturer: 'Sun Pharma',
    batch: 'IB240120',
    expiry: '2025-06-30',
    stock: 25,
    minStock: 50,
    price: 5.00,
    location: 'B-2-08'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Dispensed': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Delivered': return 'bg-blue-100 text-blue-800';
    case 'Low Stock': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  const filteredPrescriptions = mockPrescriptions.filter(rx =>
    rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPrescription) {
    return (
      <DashboardLayout title="Prescription Details">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedPrescription(null)}>
              ← Back to Pharmacy
            </Button>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">Prescription {selectedPrescription.id}</h2>
                  <p className="text-muted-foreground">Date: {selectedPrescription.date}</p>
                </div>
                <Badge className={getStatusColor(selectedPrescription.status)}>
                  {selectedPrescription.status}
                </Badge>
              </div>

              {/* Patient Info (Masked) */}
              <div className="grid grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Patient</p>
                  <p className="font-semibold">{selectedPrescription.patient}</p>
                  <p className="text-sm text-muted-foreground">{selectedPrescription.uhid}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prescribed by</p>
                  <p className="font-semibold">{selectedPrescription.doctor}</p>
                  <p className="text-sm text-muted-foreground">{selectedPrescription.deliveryMode}</p>
                </div>
              </div>

              {/* Medicines */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Prescribed Medicines</h3>
                <div className="space-y-3">
                  {selectedPrescription.medicines.map((medicine: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{medicine.name}</h4>
                        <p className="text-sm text-muted-foreground">Dosage: {medicine.dosage}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">Qty: {medicine.quantity}</p>
                        <div className="flex gap-2 mt-2">
                          {selectedPrescription.status === 'Pending' && (
                            <Button variant="outline" size="sm">
                              <Package className="h-3 w-3 mr-1" />
                              Dispense
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {selectedPrescription.status === 'Pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="bg-gradient-primary text-white">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Dispensed
                  </Button>
                  <Button variant="outline">
                    <Truck className="h-4 w-4 mr-2" />
                    Arrange Delivery
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Pharmacy Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search prescriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="prescriptions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="delivery">Home Delivery</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions">
            <div className="space-y-4">
              {filteredPrescriptions.map((prescription) => (
                <Card key={prescription.id} className="p-6 hover:shadow-medical-glow transition-all cursor-pointer"
                      onClick={() => setSelectedPrescription(prescription)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Pill className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{prescription.id}</h3>
                        <p className="text-sm text-muted-foreground">{prescription.patient} • {prescription.uhid}</p>
                        <p className="text-sm text-muted-foreground">Dr: {prescription.doctor}</p>
                        <p className="text-xs text-muted-foreground">{prescription.medicines.length} medicines</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{prescription.date}</p>
                      <p className="text-xs text-muted-foreground">{prescription.deliveryMode}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="space-y-4">
              {mockInventory.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${item.stock <= item.minStock ? 'bg-red-100' : 'bg-green-100'}`}>
                        <Package className={`h-6 w-6 ${item.stock <= item.minStock ? 'text-red-600' : 'text-green-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.manufacturer}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                          <span>Batch: {item.batch}</span>
                          <span>Location: {item.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold">{item.stock}</span>
                        {item.stock <= item.minStock && (
                          <Badge className={getStatusColor('Low Stock')}>
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Low Stock
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Min: {item.minStock}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>Exp: {item.expiry}</span>
                      </div>
                      <p className="text-sm font-medium">₹{item.price}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="delivery">
            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Truck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">RX-002 - Home Delivery</h3>
                      <p className="text-sm text-muted-foreground">P***a S***h • UHID-0002</p>
                      <p className="text-xs text-muted-foreground">2 medicines • ₹180 total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor('Delivered')}>
                      Delivered
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">Jan 24, 2024</p>
                  </div>
                </div>
              </Card>

              <div className="text-center py-8 text-muted-foreground">
                <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pending deliveries</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};