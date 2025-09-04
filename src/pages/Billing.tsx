import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Receipt,
  Send
} from 'lucide-react';

const mockInvoices = [
  {
    id: 'INV-001',
    patient: 'Rahim Ahmed',
    uhid: 'UHID-0001',
    doctor: 'Dr. Ravi Kumar',
    service: 'Orthopedic Consultation',
    amount: 1500,
    status: 'Paid',
    date: '2024-01-15',
    paymentMethod: 'Cash',
    insuranceClaim: null
  },
  {
    id: 'INV-002',
    patient: 'Priya Singh',
    uhid: 'UHID-0002',
    doctor: 'Dr. Priya Sharma',
    service: 'Cardiology Consultation + ECG',
    amount: 2500,
    status: 'Pending',
    date: '2024-01-18',
    paymentMethod: null,
    insuranceClaim: 'CLAIM-001'
  },
  {
    id: 'INV-003',
    patient: 'John Doe',
    uhid: 'UHID-0003',
    doctor: 'Dr. Ravi Kumar',
    service: 'X-Ray + Consultation',
    amount: 3200,
    status: 'Overdue',
    date: '2024-01-10',
    paymentMethod: null,
    insuranceClaim: null
  }
];

const mockClaims = [
  {
    id: 'CLAIM-001',
    patient: 'Priya Singh',
    uhid: 'UHID-0002',
    insurance: 'Star Health',
    policyNumber: 'SH123456',
    claimAmount: 2500,
    approvedAmount: 2000,
    status: 'Approved',
    submittedDate: '2024-01-18',
    approvedDate: '2024-01-20'
  },
  {
    id: 'CLAIM-002',
    patient: 'Mike Johnson',
    uhid: 'UHID-0004',
    insurance: 'HDFC Health',
    policyNumber: 'HDFC789',
    claimAmount: 5000,
    approvedAmount: 0,
    status: 'Pending',
    submittedDate: '2024-01-19',
    approvedDate: null
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid': case 'Approved': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Overdue': case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const Billing = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = mockInvoices.filter(invoice =>
    invoice.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = mockInvoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = mockInvoices.filter(inv => inv.status === 'Pending').reduce((sum, inv) => sum + inv.amount, 0);

  if (selectedInvoice) {
    return (
      <DashboardLayout title="Invoice Details">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
              ← Back to Billing
            </Button>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">Invoice {selectedInvoice.id}</h2>
                  <p className="text-muted-foreground">Date: {selectedInvoice.date}</p>
                </div>
                <Badge className={getStatusColor(selectedInvoice.status)}>
                  {selectedInvoice.status}
                </Badge>
              </div>

              {/* Patient & Service Details */}
              <div className="grid grid-cols-2 gap-8 pt-6 border-t">
                <div>
                  <h3 className="font-semibold mb-3">Patient Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedInvoice.patient}</p>
                    <p><span className="font-medium">UHID:</span> {selectedInvoice.uhid}</p>
                    <p><span className="font-medium">Doctor:</span> {selectedInvoice.doctor}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Service Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Service:</span> {selectedInvoice.service}</p>
                    <p><span className="font-medium">Amount:</span> ₹{selectedInvoice.amount.toLocaleString()}</p>
                    {selectedInvoice.paymentMethod && (
                      <p><span className="font-medium">Payment Method:</span> {selectedInvoice.paymentMethod}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-6">
                <div className="flex justify-end">
                  <div className="text-right">
                    <p className="text-2xl font-bold">Total: ₹{selectedInvoice.amount.toLocaleString()}</p>
                    {selectedInvoice.insuranceClaim && (
                      <p className="text-sm text-muted-foreground">Insurance Claim: {selectedInvoice.insuranceClaim}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t">
                <Button className="bg-gradient-primary text-white">
                  <Receipt className="h-4 w-4 mr-2" />
                  Print Invoice
                </Button>
                {selectedInvoice.status === 'Pending' && (
                  <>
                    <Button variant="outline">Record Payment</Button>
                    <Button variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminder
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Billing & Insurance">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">₹{paidAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Collected</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Claims Pending</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search invoices..."
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
            Create Invoice
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="claims">Insurance Claims</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices">
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="p-6 hover:shadow-medical-glow transition-all cursor-pointer"
                      onClick={() => setSelectedInvoice(invoice)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{invoice.id}</h3>
                        <p className="text-sm text-muted-foreground">{invoice.patient} • {invoice.uhid}</p>
                        <p className="text-sm text-muted-foreground">{invoice.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">₹{invoice.amount.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{invoice.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="claims">
            <div className="space-y-4">
              {mockClaims.map((claim) => (
                <Card key={claim.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{claim.id}</h3>
                        <p className="text-sm text-muted-foreground">{claim.patient} • {claim.uhid}</p>
                        <p className="text-sm text-muted-foreground">{claim.insurance} - {claim.policyNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{claim.claimAmount.toLocaleString()}</p>
                      {claim.approvedAmount > 0 && (
                        <p className="text-sm text-green-600">Approved: ₹{claim.approvedAmount.toLocaleString()}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(claim.status)}>
                          {claim.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{claim.submittedDate}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="refunds">
            <div className="text-center py-12 text-muted-foreground">
              <XCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No refunds processed yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};