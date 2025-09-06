import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Plus, Search, Filter, Edit, Trash2, Phone, Mail, Clock } from 'lucide-react'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    // Mock data - replace with API call
    setDoctors([
      {
        id: '1',
        name: 'Dr. Darrell Stewart',
        specialty: 'Pediatric Dentistry',
        phone: '808 555-0111',
        email: 'darrell.stewart@gmail.com',
        workingDays: ['M', 'T', 'W', 'T', 'F', 'S'],
        assignedTreatment: 'Dental service, Oral Disease service +2',
        type: 'PART-TIME',
        clinic: 'CityCare Hospital',
        experience: '8 years',
        qualification: 'BDS, MDS',
        status: 'active'
      },
      {
        id: '2',
        name: 'Dr. Ronald Richards',
        specialty: 'Pediatric Dentistry',
        phone: '209 555-0104',
        email: 'teukulwestnu@gmail.com',
        workingDays: ['M', 'T', 'W', 'T', 'F', 'S'],
        assignedTreatment: 'Dental service, Oral Disease service +2',
        type: 'PART-TIME',
        clinic: 'CityCare Hospital',
        experience: '5 years',
        qualification: 'BDS',
        status: 'active'
      },
      {
        id: '3',
        name: 'Dr. Jerald OHara',
        specialty: 'Pediatric Dentistry',
        phone: '302 555-0107',
        email: 'cjpeng@avicena.com',
        workingDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        assignedTreatment: 'Dental service, Oral Disease service +2',
        type: 'FULL-TIME',
        clinic: 'MediPlus Clinic',
        experience: '12 years',
        qualification: 'BDS, MDS, PhD',
        status: 'active'
      }
    ])
  }, [])

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout title="Staff List">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
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
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Doctor
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button className="border-b-2 border-primary-600 text-primary-600 py-2 px-1 text-sm font-medium">
              Doctor Staff
            </button>
            <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 text-sm font-medium">
              General Staff
            </button>
          </nav>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-2xl font-bold text-gray-900">120</span>
          <span className="text-sm">Doctor</span>
        </div>

        {/* Doctors Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">NAME</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">CONTACT</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">WORKING DAYS</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">ASSIGNED TREATMENT</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">TYPE</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.specialty}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          {doctor.phone}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          {doctor.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-1">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                          <div
                            key={index}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              doctor.workingDays.includes(day)
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">{doctor.assignedTreatment}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doctor.type === 'FULL-TIME' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doctor.type}
                      </span>
                    </td>
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

export default Doctors