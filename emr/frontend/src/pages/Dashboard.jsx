import React from 'react'
import Layout from '../components/Layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, Users, DollarSign, Building2, Calendar } from 'lucide-react'

const Dashboard = () => {
  // Mock data similar to the reference screenshot
  const cashflowData = [
    { month: 'JAN', value: 2000 },
    { month: 'FEB', value: 3000 },
    { month: 'MAR', value: 4000 },
    { month: 'APR', value: 3500 },
    { month: 'MAY', value: 5000 },
    { month: 'JUN', value: 10897 },
    { month: 'JUL', value: 8000 },
    { month: 'AUG', value: 6000 },
    { month: 'SEP', value: 7000 },
    { month: 'OCT', value: 8500 },
    { month: 'NOV', value: 9000 },
    { month: 'DEC', value: 10000 }
  ]

  const expensesData = [
    { name: 'Rental Cost', value: 30, color: '#3b82f6' },
    { name: 'Wages', value: 22, color: '#10b981' },
    { name: 'Medical Equipment', value: 20, color: '#f59e0b' },
    { name: 'Supplies', value: 18, color: '#ef4444' },
    { name: 'Promotion Costs', value: 8, color: '#8b5cf6' },
    { name: 'Other', value: 2, color: '#6b7280' }
  ]

  const incomeExpenseData = [
    { month: 'JAN', income: 1200, expenses: 800 },
    { month: 'FEB', income: 1800, expenses: 1200 },
    { month: 'MAR', income: 2200, expenses: 1500 },
    { month: 'APR', income: 1900, expenses: 1300 },
    { month: 'MAY', income: 2500, expenses: 1800 },
    { month: 'JUN', income: 1412, expenses: 612 }
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280']

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Good morning, Admin!</h2>
          <p className="text-gray-600">Wednesday, December 6, 2023</p>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clinics</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">8.5%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">142</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12.3%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$130,232</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">4.51%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Appointments</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-500 font-medium">2.1%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cashflow Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Cashflow</h3>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                <option>Last 12 months</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-600">TOTAL CASH</div>
              <div className="text-3xl font-bold text-gray-900">$130,232</div>
              <div className="flex items-center text-sm mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">4.51%</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashflowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expenses Pie Chart */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Expenses</h3>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                <option>Last 6 months</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expensesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {expensesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 ml-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600">Total Expenses</div>
                  <div className="text-2xl font-bold text-gray-900">$80,832</div>
                </div>
                <div className="space-y-2">
                  {expensesData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index] }}></div>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income & Expense Chart */}
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Income & Expense</h3>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                <option>Last 6 months</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">TOTAL INCOME</span>
                </div>
                <div className="text-xl font-bold text-gray-900">$1,412</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">4.51%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">TOTAL EXPENSES</span>
                </div>
                <div className="text-xl font-bold text-gray-900">$612.34</div>
                <div className="flex items-center text-sm">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-red-500">2.41%</span>
                </div>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="income" fill="#10b981" />
                  <Bar dataKey="expenses" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stock Availability */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Stock Availability</h3>
            <div className="text-center mb-6">
              <div className="text-sm text-gray-600">TOTAL ASSET</div>
              <div className="text-2xl font-bold text-gray-900">$53,000</div>
              <div className="text-sm text-gray-600 mt-1">TOTAL PRODUCT</div>
              <div className="text-lg font-semibold text-gray-900">442</div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Available</span>
                <span className="text-sm font-medium text-green-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Low Stock</span>
                <span className="text-sm font-medium text-yellow-600">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Out of Stock</span>
                <span className="text-sm font-medium text-red-600">7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>LOW STOCK</span>
                <button className="text-primary-600 hover:text-primary-700">View all</button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-900">Dental Brush</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Qty: 3</span>
                    <button className="text-xs bg-primary-600 text-white px-2 py-1 rounded">Order</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-900">Charmflex Regular</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Qty: 2</span>
                    <button className="text-xs bg-primary-600 text-white px-2 py-1 rounded">Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard