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
  HiOutlineBadgeCheck
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
      payment.user.toLowerCase().includes(filter.search.toLowerCase())

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

  // Get status color
  const getStatusColor = status => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'refunded':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      {/* Mobile Header */}
      <div className='md:hidden flex justify-between items-center mb-4'>
        <h1 className='text-xl font-bold text-gray-800'>Header Title</h1>
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
              placeholder='Search...'
              className='w-full p-2 border border-gray-300 rounded-lg'
            />
            <HiOutlineSearch className='h-5 w-5 text-gray-400 absolute right-3 top-2.5' />
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-lg shadow p-4 flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-green-100'>
            <HiOutlineCurrencyRupee className='h-6 w-6 text-green-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Revenue</p>
            <p className='text-lg font-bold text-gray-800'>₹45,000</p>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-4 flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-purple-100'>
            <HiOutlineDocumentText className='h-6 w-6 text-purple-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Commission</p>
            <p className='text-lg font-bold text-gray-800'>₹5,000</p>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-4 flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-blue-100'>
            <HiOutlineCreditCard className='h-6 w-6 text-blue-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Pending Payout</p>
            <p className='text-lg font-bold text-gray-800'>₹8,000</p>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-4 flex items-center gap-3'>
          <div className='p-2 rounded-lg bg-yellow-100'>
            <HiOutlineBadgeCheck className='h-6 w-6 text-yellow-600' />
          </div>
          <div>
            <p className='text-sm text-gray-500'>Total Payout</p>
            <p className='text-lg font-bold text-gray-800'>₹32,000</p>
          </div>
        </div>
      </div>

      {/* No Data Message */}
      <div className='text-center py-12 bg-white rounded-xl shadow'>
        <HiOutlineEmojiSad className='h-16 w-16 mx-auto text-gray-400' />
        <h3 className='mt-4 text-lg font-medium text-gray-900'>
          No Data Found
        </h3>
        <p className='text-gray-500'>Try adjusting your search or filter</p>
      </div>

      {/* Close Icon Example */}
      <div className='absolute top-4 right-4'>
        <HiOutlineX className='h-6 w-6 text-gray-600 cursor-pointer' />
      </div>
    </div>
  )
}

export default PaymentTransactions
