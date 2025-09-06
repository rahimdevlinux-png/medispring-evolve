import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Plus, Search, Filter, Edit, Trash2, MapPin, Phone, Mail } from 'lucide-react'

const Clinics = () => {
  const [clinics, setClinics] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    // Mock data - replace with API call
    setClinics([
      {
        id: '1',
        name: 'CityCare Hospital',
        location: 'Mumbai, Maharashtra',
        status: 'active',
        patients: 523,
        revenue: 280000,
        phone: '+91 98765 43210',
        email: 'info@citycare.com',
        address: '123 Healthcare St, Mumbai',
        superAdmin: 'Dr. Rajesh Kumar'
      },
      {
        id: '2',
        name: 'MediPlus Clinic',
        location: 'Delhi, NCR',
        status: 'active',
        patients: 234,
        revenue: 140000,
        phone: '+91 98765 43211',
        email: 'info@mediplus.com',
        address: '456 Medical Ave, Delhi',
        superAdmin: 'Dr. Priya Sharma'
      },
      {
        id: '3',
        name: 'HealthFirst Center',
        location: 'Bangalore, Karnataka',
        status: 'pending',
        patients: 0,
        revenue: 0,
        phone: '+91 98765 43212',
        email: 'info@healthfirst.com',
        address: '789 Wellness Blvd, Bangalore',
        superAdmin: 'Dr. Amit Patel'
      }
    ])
  }, [])

  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    clinic.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout title="Clinics">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search clinics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-80"
              />
            </div>
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Clinic
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Total Clinics</div>
          </div>
          <div className="card p-6">
            <div className="text-2xl font-bold text-gray-900">21</div>
            <div className="text-sm text-gray-600">Active Clinics</div>
          </div>
          <div className="card p-6">
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Pending Approval</div>
          </div>
          <div className="card p-6">
            <div className="text-2xl font-bold text-gray-900">₹12.4L</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>

        {/* Clinics Table */}
        <div className="card">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">All Clinics</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Clinic Name</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Location</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Contact</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Patients</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Revenue</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClinics.map((clinic) => (
                  <tr key={clinic.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{clinic.name}</div>
                        <div className="text-sm text-gray-600">{clinic.superAdmin}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {clinic.location}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          {clinic.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          {clinic.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        clinic.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {clinic.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{clinic.patients}</td>
                    <td className="py-4 px-6 text-gray-900">₹{(clinic.revenue / 1000).toFixed(0)}K</td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Clinics