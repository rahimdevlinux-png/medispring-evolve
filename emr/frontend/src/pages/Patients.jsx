import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Plus, Search, Filter, Eye, Edit, Phone, Mail, MapPin } from 'lucide-react'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [activeTab, setActiveTab] = useState('active')
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    // Mock data
    setPatients([
      {
        id: '1',
        name: 'Willie Jennie',
        phone: '(302) 555-0107',
        email: 'willie.jennings@example.com',
        address: '8309 Barby Hill',
        registered: 'Mar 12, 2021',
        lastVisit: '05 Jun 2021',
        lastTreatment: 'Tooth Scaling + Bleaching',
        status: 'active'
      },
      {
        id: '2',
        name: 'Michelle Rivera',
        phone: '(208) 555-0112',
        email: 'michelle.rivera@example.com',
        address: '534 Victoria Trail',
        registered: 'Mar 12, 2021',
        lastVisit: '03 May 2021',
        lastTreatment: 'Tooth Scaling + Veneer',
        status: 'active'
      },
      {
        id: '3',
        name: 'Tim Jennings',
        phone: '(225) 555-0118',
        email: 'tim.jennings@example.com',
        address: '87 Dahle Way',
        registered: 'Mar 10, 2021',
        lastVisit: '17 Oct 2021',
        lastTreatment: 'Tooth Scaling',
        status: 'inactive'
      }
    ])
  }, [])

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'active' ? patient.status === 'active' : patient.status === 'inactive'
    return matchesSearch && matchesTab
  })

  return (
    <Layout title="Patient">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button 
              onClick={() => setActiveTab('active')}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === 'active' 
                  ? 'border-b-2 border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Active Treatment
            </button>
            <button 
              onClick={() => setActiveTab('inactive')}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === 'inactive' 
                  ? 'border-b-2 border-primary-600 text-primary-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Inactive Treatment
            </button>
          </nav>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-2xl font-bold text-gray-900">72</span>
              <span className="text-sm">total patients</span>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search for anything here..."
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
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>

        {/* Patients Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">PATIENT NAME</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">PHONE</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">EMAIL</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">ADDRESS</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">REGISTERED</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">LAST VISIT</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">LAST TREATMENT</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                             style={{ backgroundColor: `hsl(${patient.id * 60}, 70%, 60%)` }}>
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {patient.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {patient.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-600">{patient.address}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-600">{patient.registered}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-600">{patient.lastVisit}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-600">{patient.lastTreatment}</div>
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

export default Patients