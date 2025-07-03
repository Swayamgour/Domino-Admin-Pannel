import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts'
import { HiOutlineSearch, HiOutlineBell } from 'react-icons/hi'
import {
  HiBadgeCheck,
  HiTrendingUp,
  HiClipboardList,
  HiLocationMarker,
  HiCurrencyDollar,
  HiUserGroup,
  HiArrowNarrowRight,
  HiArrowSmUp,
  HiArrowSmDown
} from 'react-icons/hi'


const Dashboard = () => {
  // Mock data for the dashboard
  const [dashboardData] = useState({
    totalOrders: 142,
    orders: {
      pending: 28,
      delivered: 102,
      canceled: 12
    },
    topStores: [
      { name: 'Mumbai Central', orders: 84, revenue: '₹1,42,000', trend: 'up' },
      { name: 'Delhi NCR', orders: 72, revenue: '₹1,28,500', trend: 'up' },
      {
        name: 'Bangalore South',
        orders: 68,
        revenue: '₹1,15,200',
        trend: 'down'
      }
    ],
    totalRevenue: '₹3,85,700',
    activeVendors: 24,
    weeklyOrders: [
      { day: 'Mon', orders: 45 },
      { day: 'Tue', orders: 52 },
      { day: 'Wed', orders: 48 },
      { day: 'Thu', orders: 67 },
      { day: 'Fri', orders: 98 },
      { day: 'Sat', orders: 120 },
      { day: 'Sun', orders: 142 }
    ]
  })

  // Colors for the bar chart
  const barColors = [
    '#4F46E5',
    '#6366F1',
    '#818CF8',
    '#A5B4FC',
    '#C7D2FE',
    '#E0E7FF',
    '#4F46E5'
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6'>
      {/* Header */}
      <header className='mb-6 flex flex-col md:flex-row md:items-center justify-between'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
            Dashboard Overview
          </h1>
          <p className='text-gray-600 mt-1 text-sm'>
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className='mt-3 md:mt-0 flex items-center'>
          {/* Search Box */}
          <div className='relative'>
            <input
              type='text'
              placeholder='Search...'
              className='pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-full md:w-64'
            />
            <HiOutlineSearch className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
          </div>

          {/* Notification Button */}
          <button className='ml-3 bg-white rounded-full p-2 shadow-sm border border-gray-200 hover:bg-gray-50'>
            <HiOutlineBell className='h-5 w-5 text-gray-600' />
          </button>

          {/* User Avatar */}
          <div className='ml-3 flex items-center'>
            <div className='h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold'>
              AK
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards Grid */}
      {/* import { HiBadgeCheck, HiTrendingUp, HiClipboardList, HiLocationMarker, HiCurrencyDollar } from 'react-icons/hi' */}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6'>
        {/* Total Orders Today */}
        <div className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium'>
                Total Orders Today
              </p>
              <p className='text-2xl font-bold text-gray-800 mt-1'>
                {dashboardData.totalOrders}
              </p>
            </div>
            <div className='bg-blue-100 p-3 rounded-lg'>
              <HiBadgeCheck className='h-6 w-6 text-blue-600' />
            </div>
          </div>
          <div className='mt-4 flex items-center'>
            <span className='text-green-600 font-medium text-sm flex items-center'>
              <HiTrendingUp className='h-4 w-4 mr-1' />
              12.5%
            </span>
            <span className='text-gray-500 text-xs ml-2'>vs yesterday</span>
          </div>
        </div>

        {/* Order Status */}
        <div className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md'>
          <div className='flex items-center justify-between'>
            <p className='text-gray-500 text-sm font-medium'>Order Status</p>
            <div className='bg-indigo-100 p-3 rounded-lg'>
              <HiClipboardList className='h-6 w-6 text-indigo-600' />
            </div>
          </div>
          <div className='mt-4 space-y-3'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <div className='w-2.5 h-2.5 bg-yellow-400 rounded-full mr-2'></div>
                <span className='text-gray-700 text-sm'>Pending</span>
              </div>
              <span className='font-bold text-gray-800'>
                {dashboardData.orders.pending}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <div className='w-2.5 h-2.5 bg-green-500 rounded-full mr-2'></div>
                <span className='text-gray-700 text-sm'>Delivered</span>
              </div>
              <span className='font-bold text-gray-800'>
                {dashboardData.orders.delivered}
              </span>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <div className='w-2.5 h-2.5 bg-red-500 rounded-full mr-2'></div>
                <span className='text-gray-700 text-sm'>Canceled</span>
              </div>
              <span className='font-bold text-gray-800'>
                {dashboardData.orders.canceled}
              </span>
            </div>
          </div>
        </div>

        {/* Top Performing Store */}
        <div className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium'>
                Top Performing Store
              </p>
              <p className='text-lg font-bold text-gray-800 mt-1'>
                {dashboardData.topStores[0].name}
              </p>
            </div>
            <div className='bg-purple-100 p-3 rounded-lg'>
              <HiLocationMarker className='h-6 w-6 text-purple-600' />
            </div>
          </div>
          <div className='mt-4'>
            <div className='flex justify-between mb-1 text-sm'>
              <span className='text-gray-600'>Orders:</span>
              <span className='font-bold'>
                {dashboardData.topStores[0].orders}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Revenue:</span>
              <span className='font-bold'>
                {dashboardData.topStores[0].revenue}
              </span>
            </div>
          </div>
          <div className='mt-4 flex items-center'>
            <span className='text-green-600 font-medium text-sm flex items-center'>
              <HiTrendingUp className='h-4 w-4 mr-1' />
              8.2%
            </span>
            <span className='text-gray-500 text-xs ml-2'>from last week</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium'>Total Revenue</p>
              <p className='text-2xl font-bold text-gray-800 mt-1'>
                {dashboardData.totalRevenue}
              </p>
            </div>
            <div className='bg-amber-100 p-3 rounded-lg'>
              <HiCurrencyDollar className='h-6 w-6 text-amber-600' />
            </div>
          </div>
          <div className='mt-4 flex items-center'>
            <span className='text-green-600 font-medium text-sm flex items-center'>
              <HiTrendingUp className='h-4 w-4 mr-1' />
              18.3%
            </span>
            <span className='text-gray-500 text-xs ml-2'>vs last week</span>
          </div>
        </div>
      </div>

      {/* Charts and Secondary Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6'>
        {/* Weekly Order Chart */}
        <div className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 lg:col-span-2 transition-all duration-300 hover:shadow-md'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5'>
            <h2 className='text-lg font-bold text-gray-800'>
              Weekly Order Chart
            </h2>
            <div className='mt-3 sm:mt-0 flex space-x-2'>
              <button className='px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-600'>
                Week
              </button>
              <button className='px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg transition-colors duration-300 hover:bg-gray-200'>
                Month
              </button>
              <button className='px-3 py-1.5 text-xs text-gray-600 bg-gray-100 rounded-lg transition-colors duration-300 hover:bg-gray-200'>
                Quarter
              </button>
            </div>
          </div>
          <div className='h-72'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={dashboardData.weeklyOrders}>
                <CartesianGrid
                  strokeDasharray='3 3'
                  vertical={false}
                  stroke='#E5E7EB'
                />
                <XAxis
                  dataKey='day'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    border: '1px solid #E5E7EB',
                    fontSize: 12
                  }}
                  cursor={{ fill: '#F9FAFB' }}
                />
                <Bar dataKey='orders' radius={[6, 6, 0, 0]} barSize={24}>
                  {dashboardData.weeklyOrders.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Vendors */}
        <div className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-lg font-bold text-gray-800'>Active Vendors</h2>
            <div className='bg-pink-100 p-2.5 rounded-lg'>
              <HiUserGroup className='h-5 w-5 text-pink-600' />
            </div>
          </div>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-3xl font-bold text-gray-800'>
              {dashboardData.activeVendors}
            </p>
            <div className='flex items-center'>
              <span className='text-green-600 font-medium text-sm flex items-center'>
                <HiTrendingUp className='h-4 w-4 mr-1' />
                +3
              </span>
              <span className='text-gray-500 text-xs ml-1'>this week</span>
            </div>
          </div>
          <div className='mt-6'>
            <p className='text-gray-600 text-sm mb-3'>Recently active:</p>
            <div className='flex -space-x-2'>
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className='w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-sm'
                >
                  {i + 1}
                </div>
              ))}
              <div className='w-9 h-9 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-500 font-bold text-xs'>
                +{dashboardData.activeVendors - 7}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stores Table */}
      <div className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5'>
          <h2 className='text-lg font-bold text-gray-800'>
            Top Performing Stores
          </h2>
          <button className='mt-3 sm:mt-0 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300 flex items-center'>
            View All Stores
            <HiArrowNarrowRight className='h-4 w-4 ml-2' />
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='text-left text-gray-500 text-sm'>
                <th className='pb-3 font-medium'>Store</th>
                <th className='pb-3 font-medium'>Orders</th>
                <th className='pb-3 font-medium'>Revenue</th>
                <th className='pb-3 font-medium'>Status</th>
                <th className='pb-3 font-medium'>Trend</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.topStores.map((store, index) => (
                <tr
                  key={index}
                  className='border-t border-gray-100 hover:bg-gray-50'
                >
                  <td className='py-3.5 font-medium text-gray-900'>
                    {store.name}
                  </td>
                  <td className='py-3.5'>{store.orders}</td>
                  <td className='py-3.5'>{store.revenue}</td>
                  <td className='py-3.5'>
                    <span className='px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium'>
                      Active
                    </span>
                  </td>
                  <td className='py-3.5'>
                    {store.trend === 'up' ? (
                      <span className='flex items-center text-green-600'>
                        <HiArrowSmUp className='h-4 w-4 mr-1' />
                        8.2%
                      </span>
                    ) : (
                      <span className='flex items-center text-red-600'>
                        <HiArrowSmDown className='h-4 w-4 mr-1' />
                        3.5%
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className='mt-8 text-center text-gray-500 text-sm'>
        <p>© 2023 Dashboard Analytics. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Dashboard
