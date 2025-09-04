import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Microscope, 
  Search, 
  Filter,
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Image,
  Plus
} from 'lucide-react';

const mockLabOrders = [
  {
    id: 'LAB-001',
    patient: 'Rahim Ahmed',
    uhid: 'UHID-0001',
    doctor: 'Dr. Ravi Kumar',
    tests: ['Blood Sugar', 'HbA1c', 'Lipid Profile'],
    status: 'Sample Collected',
    orderDate: '2024-01-25',
    sampleDate: '2024-01-25',
    resultDate: null,
    priority: 'Normal',
    lab: 'In-house Lab'
  },
  {
    id: 'LAB-002',
    patient: 'Priya Singh',
    uhid: 'UHID-0002',
    doctor: 'Dr. Priya Sharma',
    tests: ['ECG', 'Chest X-Ray'],
    status: 'Completed',
    orderDate: '2024-01-24',
    sampleDate: '2024-01-24',
    resultDate: '2024-01-24',
    priority: 'Urgent',
    lab: 'Radiology Dept'
  },
  {
    id: 'LAB-003',
    patient: 'John Doe',
    uhid: 'UHID-0003',
    doctor: 'Dr. Ravi Kumar',
    tests: ['MRI Knee', 'X-Ray Knee AP/Lateral'],
    status: 'Pending',
    orderDate: '2024-01-25',
    sampleDate: null,
    resultDate: null,
    priority: 'Normal',
    lab: 'External - Metro Imaging'
  }
];

const mockResults = [
  {
    id: 'LAB-002',
    patient: 'Priya Singh',
    uhid: 'UHID-0002',
    test: 'ECG',
    result: 'Normal Sinus Rhythm',
    abnormalFlag: false,
    resultDate: '2024-01-24',
    filePath: '/reports/ecg-002.pdf',
    fileType: 'PDF'
  },
  {
    id: 'LAB-002-2',
    patient: 'Priya Singh',
    uhid: 'UHID-0002',
    test: 'Chest X-Ray',
    result: 'Mild cardiomegaly noted',
    abnormalFlag: true,
    resultDate: '2024-01-24',
    filePath: '/reports/xray-002.jpg',
    fileType: 'Image'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Sample Collected': return 'bg-blue-100 text-blue-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Urgent': return 'bg-red-100 text-red-800';
    case 'Normal': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const Labs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = mockLabOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedOrder) {
    const orderResults = mockResults.filter(r => r.id.startsWith(selectedOrder.id));
    
    return (
      <DashboardLayout title="Lab Order Details">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              ← Back to Lab Orders
            </Button>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">Lab Order {selectedOrder.id}</h2>
                  <p className="text-muted-foreground">Ordered: {selectedOrder.orderDate}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(selectedOrder.priority)}>
                    {selectedOrder.priority}
                  </Badge>
                  <Badge className={getStatusColor(selectedOrder.status)}>
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>

              {/* Patient & Doctor Info */}
              <div className="grid grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Patient</p>
                  <p className="font-semibold">{selectedOrder.patient}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.uhid}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ordered by</p>
                  <p className="font-semibold">{selectedOrder.doctor}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.lab}</p>
                </div>
              </div>

              {/* Tests Ordered */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Tests Ordered</h3>
                <div className="space-y-2">
                  {selectedOrder.tests.map((test: string, index: number) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-medium">{test}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              {orderResults.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Test Results</h3>
                  <div className="space-y-4">
                    {orderResults.map((result) => (
                      <div key={result.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold flex items-center gap-2">
                              {result.test}
                              {result.abnormalFlag && (
                                <Badge className="bg-red-100 text-red-800">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Abnormal
                                </Badge>
                              )}
                            </h4>
                            <p className="text-sm text-muted-foreground">{result.resultDate}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <p className="text-sm mb-3">{result.result}</p>
                        <div className="flex items-center gap-2">
                          {result.fileType === 'PDF' ? (
                            <FileText className="h-4 w-4 text-red-600" />
                          ) : (
                            <Image className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="text-sm text-muted-foreground">{result.fileType} Report Available</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedOrder.status === 'Pending' && (
                  <Button variant="outline">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Collect Sample
                  </Button>
                )}
                {selectedOrder.status === 'Sample Collected' && (
                  <Button className="bg-gradient-primary text-white">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Results
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Labs & Diagnostics">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search lab orders..."
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
            <Plus className="h-4 w-4 mr-2" />
            New Lab Order
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Lab Orders</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="external">External Labs</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="p-6 hover:shadow-medical-glow transition-all cursor-pointer"
                      onClick={() => setSelectedOrder(order)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Microscope className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.patient} • {order.uhid}</p>
                        <p className="text-sm text-muted-foreground">Dr: {order.doctor}</p>
                        <p className="text-xs text-muted-foreground">{order.tests.length} tests • {order.lab}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-2 mb-2">
                        <Badge className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Ordered: {order.orderDate}</p>
                      {order.sampleDate && (
                        <p className="text-xs text-muted-foreground">Sample: {order.sampleDate}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="space-y-4">
              {mockResults.map((result) => (
                <Card key={`${result.id}-${result.test}`} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${result.abnormalFlag ? 'bg-red-100' : 'bg-green-100'}`}>
                        {result.fileType === 'PDF' ? (
                          <FileText className={`h-6 w-6 ${result.abnormalFlag ? 'text-red-600' : 'text-green-600'}`} />
                        ) : (
                          <Image className={`h-6 w-6 ${result.abnormalFlag ? 'text-red-600' : 'text-green-600'}`} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{result.test}</h3>
                          {result.abnormalFlag && (
                            <Badge className="bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Abnormal
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{result.patient} • {result.uhid}</p>
                        <p className="text-sm">{result.result}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">{result.resultDate}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="external">
            <div className="text-center py-12 text-muted-foreground">
              <Microscope className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>External lab integrations will be configured here</p>
              <Button variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add External Lab
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};