import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {
  HiOutlineMenu,
  HiOutlineSearch,
  HiOutlineEmojiSad,
  HiOutlineX,
  HiOutlineCurrencyRupee,
  HiOutlineDocumentText,
  HiOutlineCreditCard,
  HiOutlineBadgeCheck,
  HiOutlineFilter,
  HiOutlineRefresh,
  HiOutlineDownload,
  HiOutlineCash,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineBan
} from 'react-icons/hi'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PaymentTransactions = () => {
  // Mock data for vendors
  const vendors = [
    { id: 1, name: 'Pizza Corner', commissionRate: 15, balance: 125400 },
    { id: 2, name: 'Spice Garden', commissionRate: 12, balance: 98500 },
    { id: 3, name: 'Burger King', commissionRate: 18, balance: 75600 },
    { id: 4, name: 'Sweet Corner', commissionRate: 10, balance: 63200 },
    { id: 5, name: 'Fresh Juice Bar', commissionRate: 14, balance: 42000 },
    { id: 6, name: 'Sushi House', commissionRate: 16, balance: 58700 }
  ]

  // Mock data for payments
  const initialPayments = [
    {
      id: 'PAY-001',
      date: '2023-06-27 14:30:22',
      amount: 2500,
      vendor: 'Pizza Corner',
      user: 'Raj Sharma',
      status: 'completed',
      method: 'Credit Card',
      commission: 375,
      payout: 2125
    },
    {
      id: 'PAY-002',
      date: '2023-06-27 12:45:11',
      amount: 1800,
      vendor: 'Spice Garden',
      user: 'Priya Patel',
      status: 'completed',
      method: 'UPI',
      commission: 216,
      payout: 1584
    },
    {
      id: 'PAY-003',
      date: '2023-06-26 18:20:15',
      amount: 3200,
      vendor: 'Burger King',
      user: 'Vikram Singh',
      status: 'completed',
      method: 'Credit Card',
      commission: 576,
      payout: 2624
    },
    {
      id: 'PAY-004',
      date: '2023-06-26 15:45:30',
      amount: 1500,
      vendor: 'Sweet Corner',
      user: 'Ananya Gupta',
      status: 'refunded',
      method: 'Wallet',
      commission: 0,
      payout: 0
    },
    {
      id: 'PAY-005',
      date: '2023-06-25 19:30:44',
      amount: 2800,
      vendor: 'Sushi House',
      user: 'Arjun Mehta',
      status: 'completed',
      method: 'Net Banking',
      commission: 448,
      payout: 2352
    },
    {
      id: 'PAY-006',
      date: '2023-06-25 11:15:22',
      amount: 2100,
      vendor: 'Fresh Juice Bar',
      user: 'Neha Reddy',
      status: 'pending',
      method: 'Credit Card',
      commission: 294,
      payout: 1806
    },
    {
      id: 'PAY-007',
      date: '2023-06-24 20:15:33',
      amount: 3400,
      vendor: 'Pizza Corner',
      user: 'Raj Sharma',
      status: 'completed',
      method: 'UPI',
      commission: 510,
      payout: 2890
    },
    {
      id: 'PAY-008',
      date: '2023-06-24 17:45:10',
      amount: 1900,
      vendor: 'Spice Garden',
      user: 'Priya Patel',
      status: 'completed',
      method: 'Wallet',
      commission: 228,
      payout: 1672
    }
  ]

  // State management
  const [payments] = useState(initialPayments)
  const [filter, setFilter] = useState({
    date: '',
    vendor: 'all',
    status: 'all',
    search: ''
  })
  const [commissionRates, setCommissionRates] = useState(
    vendors.reduce((acc, vendor) => {
      acc[vendor.id] = vendor.commissionRate
      return acc
    }, {})
  )
  const [payouts, setPayouts] = useState(
    vendors.map(vendor => ({
      ...vendor,
      payoutAmount: vendor.balance * (1 - vendor.commissionRate / 100),
      lastPayout: '2023-06-20'
    }))
  )
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('transactions')
  const [showNoData, setShowNoData] = useState(false)

  // Calculate revenue stats
  const revenueStats = {
    totalRevenue: payments.reduce(
      (sum, payment) =>
        payment.status === 'completed' ? sum + payment.amount : sum,
      0
    ),
    totalCommission: payments.reduce(
      (sum, payment) =>
        payment.status === 'completed' ? sum + payment.commission : sum,
      0
    ),
    totalPayout: payouts.reduce((sum, payout) => sum + payout.payoutAmount, 0),
    pendingPayout: payments.filter(p => p.status === 'pending').length
  }

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    // Date filter
    const dateMatch = !filter.date || payment.date.startsWith(filter.date)

    // Vendor filter
    const vendorMatch =
      filter.vendor === 'all' || payment.vendor === filter.vendor

    // Status filter
    const statusMatch =
      filter.status === 'all' || payment.status === filter.status

    // Search filter
    const searchMatch =
      !filter.search ||
      payment.id.toLowerCase().includes(filter.search.toLowerCase()) ||
      payment.user.toLowerCase().includes(filter.search.toLowerCase()) ||
      payment.vendor.toLowerCase().includes(filter.search.toLowerCase())

    return dateMatch && vendorMatch && statusMatch && searchMatch
  })

  // Vendor options
  const vendorOptions = [...new Set(payments.map(payment => payment.vendor))]

  // Update commission rate
  const updateCommissionRate = (vendorId, rate) => {
    setCommissionRates({
      ...commissionRates,
      [vendorId]: rate
    })

    // Update payout amount for that vendor
    setPayouts(
      payouts.map(payout =>
        payout.id === vendorId
          ? {
              ...payout,
              commissionRate: rate,
              payoutAmount: payout.balance * (1 - rate / 100)
            }
          : payout
      )
    )
  }

  // Process payout
  const processPayout = vendorId => {
    setPayouts(
      payouts.map(payout =>
        payout.id === vendorId
          ? {
              ...payout,
              payoutAmount: 0,
              balance: 0,
              lastPayout: new Date().toISOString().split('T')[0]
            }
          : payout
      )
    )

    alert(`Payout processed for ${payouts.find(v => v.id === vendorId).name}`)
  }

  // Revenue chart data
  const revenueChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [12500, 14200, 13800, 16700, 21000, 28500, 31200],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1
      },
      {
        label: 'Commission (₹)',
        data: [1875, 2130, 2070, 2505, 3150, 4275, 4680],
        backgroundColor: 'rgba(236, 72, 153, 0.7)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1
      }
    ]
  }

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Weekly Revenue & Commission',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '₹' + value.toLocaleString()
          }
        }
      }
    }
  }

  // Get status color and icon
  const getStatusInfo = status => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <HiOutlineCheckCircle className="h-4 w-4" />
        }
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <HiOutlineClock className="h-4 w-4" />
        }
      case 'refunded':
        return {
          color: 'bg-red-100 text-red-800',
          icon: <HiOutlineBan className="h-4 w-4" />
        }
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <HiOutlineClock className="h-4 w-4" />
        }
    }
  }

  // Format currency
  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilter({
      ...filter,
      [key]: value
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilter({
      date: '',
      vendor: 'all',
      status: 'all',
      search: ''
    })
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6'>
      {/* Mobile Header */}
      <div className='md:hidden flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold text-gray-800'>Payment Dashboard</h1>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='p-2 rounded-lg bg-indigo-600 text-white'
        >
          <HiOutlineMenu className='h-5 w-5' />
        </button>
      </div>

      {/* Mobile Menu (Search Field) */}
      {isMenuOpen && (
        <div className='md:hidden bg-white rounded-xl shadow-lg p-4 mb-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search payments...'
              value={filter.search}
              onChange={e => handleFilterChange('search', e.target.value)}
              className='w-full p-2 pl-9 border border-gray-300 rounded-lg'
            />
            <HiOutlineSearch className='h-5 w-5 text-gray-400 absolute left-3 top-2.5' />
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className='flex border-b border-gray-200 mb-6'>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'transactions' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'payouts' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('payouts')}
        >
          Payouts
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'analytics' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4'>
          <div className='p-3 rounded-lg bg-green-100'>
            <HiOutlineCurrencyRupee className='h-6 w-6 text-green-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Revenue</p>
            <p className='text-lg font-bold text-gray-800'>{formatCurrency(revenueStats.totalRevenue)}</p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4'>
          <div className='p-3 rounded-lg bg-purple-100'>
            <HiOutlineDocumentText className='h-6 w-6 text-purple-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Commission</p>
            <p className='text-lg font-bold text-gray-800'>{formatCurrency(revenueStats.totalCommission)}</p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4'>
          <div className='p-3 rounded-lg bg-blue-100'>
            <HiOutlineCreditCard className='h-6 w-6 text-blue-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Pending Payout</p>
            <p className='text-lg font-bold text-gray-800'>{revenueStats.pendingPayout} Transactions</p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-sm p-5 flex items-center gap-4'>
          <div className='p-3 rounded-lg bg-yellow-100'>
            <HiOutlineBadgeCheck className='h-6 w-6 text-yellow-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Payout</p>
            <p className='text-lg font-bold text-gray-800'>{formatCurrency(revenueStats.totalPayout)}</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='bg-white rounded-xl shadow-sm p-4 mb-6'>
        <div className='flex flex-col md:flex-row md:items-center gap-4'>
          <div className='relative flex-1'>
            <HiOutlineSearch className='h-5 w-5 text-gray-400 absolute left-3 top-2.5' />
            <input
              type='text'
              placeholder='Search by ID, user, or vendor...'
              value={filter.search}
              onChange={e => handleFilterChange('search', e.target.value)}
              className='w-full p-2 pl-10 border border-gray-300 rounded-lg'
            />
          </div>
          
          <div className='grid grid-cols-2 md:flex gap-2'>
            <select
              value={filter.vendor}
              onChange={e => handleFilterChange('vendor', e.target.value)}
              className='p-2 border border-gray-300 rounded-lg text-sm'
            >
              <option value="all">All Frenchies</option>
              {vendorOptions.map(vendor => (
                <option key={vendor} value={vendor}>{vendor}</option>
              ))}
            </select>
            
            <select
              value={filter.status}
              onChange={e => handleFilterChange('status', e.target.value)}
              className='p-2 border border-gray-300 rounded-lg text-sm'
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
            
            <input
              type="date"
              value={filter.date}
              onChange={e => handleFilterChange('date', e.target.value)}
              className='p-2 border border-gray-300 rounded-lg text-sm'
            />
            
            <button
              onClick={resetFilters}
              className='p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm flex items-center gap-1'
            >
              <HiOutlineRefresh className="h-4 w-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      {activeTab === 'transactions' && (
        <div className='bg-white rounded-xl shadow-sm overflow-hidden mb-6'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>ID & Date</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>User & Vendor</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Method</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Commission</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredPayments.map(payment => {
                  const statusInfo = getStatusInfo(payment.status)
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>{payment.id}</div>
                        <div className='text-sm text-gray-500'>{payment.date.split(' ')[0]}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>{payment.user}</div>
                        <div className='text-sm text-gray-500'>{payment.vendor}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>{formatCurrency(payment.amount)}</div>
                        <div className='text-sm text-gray-500'>Payout: {formatCurrency(payment.payout)}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {payment.method}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {formatCurrency(payment.commission)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className='ml-1 capitalize'>{payment.status}</span>
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {filteredPayments.length === 0 && (
            <div className='text-center py-12'>
              <HiOutlineEmojiSad className='h-16 w-16 mx-auto text-gray-400' />
              <h3 className='mt-4 text-lg font-medium text-gray-900'>
                No Transactions Found
              </h3>
              <p className='text-gray-500'>Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      )}

      {/* Payouts Section */}
      {activeTab === 'payouts' && (
        <div className='bg-white rounded-xl shadow-sm overflow-hidden mb-6'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Vendor</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Balance</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Commission Rate</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Payout Amount</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Last Payout</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {payouts.map(vendor => (
                  <tr key={vendor.id} className="hover:bg-gray-50">
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-gray-900'>{vendor.name}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {formatCurrency(vendor.balance)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={commissionRates[vendor.id]}
                        onChange={e => updateCommissionRate(vendor.id, parseInt(e.target.value))}
                        className="w-20 p-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="ml-1 text-sm">%</span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600'>
                      {formatCurrency(vendor.payoutAmount)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {vendor.lastPayout}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                      <button
                        onClick={() => processPayout(vendor.id)}
                        disabled={vendor.payoutAmount <= 0}
                        className={`px-3 py-1 rounded-md ${vendor.payoutAmount > 0 ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                      >
                        Process Payout
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Section */}
      {activeTab === 'analytics' && (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <div className='h-80'>
              <Bar data={revenueChartData} options={revenueChartOptions} />
            </div>
          </div>
          
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Payment Methods</h3>
            <div className='space-y-4'>
              {['Credit Card', 'UPI', 'Wallet', 'Net Banking'].map(method => (
                <div key={method} className='flex items-center justify-between'>
                  <span className='text-sm text-gray-600'>{method}</span>
                  <div className='w-48 bg-gray-200 rounded-full h-2.5'>
                    <div 
                      className='bg-indigo-600 h-2.5 rounded-full' 
                      style={{ width: `${Math.floor(Math.random() * 70) + 30}%` }}
                    ></div>
                  </div>
                  <span className='text-sm font-medium text-gray-900 w-10 text-right'>
                    {Math.floor(Math.random() * 40) + 20}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {/* <div className='flex justify-end gap-3'>
        <button className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'>
          <HiOutlineDownload className='h-5 w-5' />
          Export CSV
        </button>
        <button className='flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-transparent rounded-lg text-white hover:bg-indigo-700'>
          <HiOutlineCash className='h-5 w-5' />
          Process All Payouts
        </button>
      </div> */}
    </div>
  )
}

export default PaymentTransactions