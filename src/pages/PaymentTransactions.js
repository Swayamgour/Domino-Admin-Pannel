import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PaymentTransactions = () => {
  // Mock data for vendors
  const vendors = [
    { id: 1, name: "Pizza Corner", commissionRate: 15, balance: 125400 },
    { id: 2, name: "Spice Garden", commissionRate: 12, balance: 98500 },
    { id: 3, name: "Burger King", commissionRate: 18, balance: 75600 },
    { id: 4, name: "Sweet Corner", commissionRate: 10, balance: 63200 },
    { id: 5, name: "Fresh Juice Bar", commissionRate: 14, balance: 42000 },
    { id: 6, name: "Sushi House", commissionRate: 16, balance: 58700 }
  ];

  // Mock data for payments
  const initialPayments = [
    {
      id: "PAY-001",
      date: "2023-06-27 14:30:22",
      amount: 2500,
      vendor: "Pizza Corner",
      user: "Raj Sharma",
      status: "completed",
      method: "Credit Card",
      commission: 375,
      payout: 2125
    },
    {
      id: "PAY-002",
      date: "2023-06-27 12:45:11",
      amount: 1800,
      vendor: "Spice Garden",
      user: "Priya Patel",
      status: "completed",
      method: "UPI",
      commission: 216,
      payout: 1584
    },
    {
      id: "PAY-003",
      date: "2023-06-26 18:20:15",
      amount: 3200,
      vendor: "Burger King",
      user: "Vikram Singh",
      status: "completed",
      method: "Credit Card",
      commission: 576,
      payout: 2624
    },
    {
      id: "PAY-004",
      date: "2023-06-26 15:45:30",
      amount: 1500,
      vendor: "Sweet Corner",
      user: "Ananya Gupta",
      status: "refunded",
      method: "Wallet",
      commission: 0,
      payout: 0
    },
    {
      id: "PAY-005",
      date: "2023-06-25 19:30:44",
      amount: 2800,
      vendor: "Sushi House",
      user: "Arjun Mehta",
      status: "completed",
      method: "Net Banking",
      commission: 448,
      payout: 2352
    },
    {
      id: "PAY-006",
      date: "2023-06-25 11:15:22",
      amount: 2100,
      vendor: "Fresh Juice Bar",
      user: "Neha Reddy",
      status: "pending",
      method: "Credit Card",
      commission: 294,
      payout: 1806
    },
    {
      id: "PAY-007",
      date: "2023-06-24 20:15:33",
      amount: 3400,
      vendor: "Pizza Corner",
      user: "Raj Sharma",
      status: "completed",
      method: "UPI",
      commission: 510,
      payout: 2890
    },
    {
      id: "PAY-008",
      date: "2023-06-24 17:45:10",
      amount: 1900,
      vendor: "Spice Garden",
      user: "Priya Patel",
      status: "completed",
      method: "Wallet",
      commission: 228,
      payout: 1672
    }
  ];

  // State management
  const [payments] = useState(initialPayments);
  const [filter, setFilter] = useState({
    date: "",
    vendor: "all",
    status: "all",
    search: ""
  });
  const [commissionRates, setCommissionRates] = useState(
    vendors.reduce((acc, vendor) => {
      acc[vendor.id] = vendor.commissionRate;
      return acc;
    }, {})
  );
  const [payouts, setPayouts] = useState(
    vendors.map(vendor => ({
      ...vendor,
      payoutAmount: vendor.balance * (1 - vendor.commissionRate / 100),
      lastPayout: "2023-06-20"
    }))
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate revenue stats
  const revenueStats = {
    totalRevenue: payments.reduce((sum, payment) => payment.status === "completed" ? sum + payment.amount : sum, 0),
    totalCommission: payments.reduce((sum, payment) => payment.status === "completed" ? sum + payment.commission : sum, 0),
    totalPayout: payouts.reduce((sum, payout) => sum + payout.payoutAmount, 0),
    pendingPayout: payments.filter(p => p.status === "pending").length
  };

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    // Date filter
    const dateMatch = !filter.date || payment.date.startsWith(filter.date);
    
    // Vendor filter
    const vendorMatch = filter.vendor === "all" || payment.vendor === filter.vendor;
    
    // Status filter
    const statusMatch = filter.status === "all" || payment.status === filter.status;
    
    // Search filter
    const searchMatch = !filter.search || 
      payment.id.toLowerCase().includes(filter.search.toLowerCase()) ||
      payment.user.toLowerCase().includes(filter.search.toLowerCase());
    
    return dateMatch && vendorMatch && statusMatch && searchMatch;
  });

  // Vendor options
  const vendorOptions = [...new Set(payments.map(payment => payment.vendor))];

  // Update commission rate
  const updateCommissionRate = (vendorId, rate) => {
    setCommissionRates({
      ...commissionRates,
      [vendorId]: rate
    });
    
    // Update payout amount for that vendor
    setPayouts(payouts.map(payout => 
      payout.id === vendorId 
        ? { 
            ...payout, 
            commissionRate: rate,
            payoutAmount: payout.balance * (1 - rate / 100)
          } 
        : payout
    ));
  };

  // Process payout
  const processPayout = (vendorId) => {
    setPayouts(payouts.map(payout => 
      payout.id === vendorId 
        ? { 
            ...payout, 
            payoutAmount: 0,
            balance: 0,
            lastPayout: new Date().toISOString().split('T')[0]
          } 
        : payout
    ));
    
    alert(`Payout processed for ${payouts.find(v => v.id === vendorId).name}`);
  };

  // Revenue chart data
  const revenueChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [12500, 14200, 13800, 16700, 21000, 28500, 31200],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
      {
        label: 'Commission (₹)',
        data: [1875, 2130, 2070, 2505, 3150, 4275, 4680],
        backgroundColor: 'rgba(236, 72, 153, 0.7)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1,
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Revenue & Commission',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "refunded": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile header */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Payment Transactions</h1>
            <p className="text-xs text-gray-600 mt-1">Manage financial transactions</p>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg bg-indigo-600 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-xl shadow-lg p-4 mb-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search payments..."
                value={filter.search}
                onChange={(e) => setFilter({...filter, search: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                value={filter.date}
                onChange={(e) => setFilter({...filter, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <select
                value={filter.vendor}
                onChange={(e) => setFilter({...filter, vendor: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Vendors</option>
                {vendorOptions.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <select
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payment & Transactions</h1>
            <p className="text-gray-600 mt-1">Manage all financial transactions and vendor payouts</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Net Revenue</p>
                <p className="text-xl font-bold text-gray-800">
                  ₹{(revenueStats.totalRevenue - revenueStats.totalCommission).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            {
              title: "Total Revenue",
              value: `₹${revenueStats.totalRevenue.toLocaleString()}`,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              bg: "bg-green-100"
            },
            {
              title: "Total Commission",
              value: `₹${revenueStats.totalCommission.toLocaleString()}`,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              ),
              bg: "bg-purple-100"
            },
            {
              title: "Pending Payouts",
              value: revenueStats.pendingPayout,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              bg: "bg-blue-100"
            },
            {
              title: "Total Payout",
              value: `₹${revenueStats.totalPayout.toLocaleString()}`,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              bg: "bg-yellow-100"
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-4">
              <div className="flex items-center">
                <div className={`p-2 md:p-3 rounded-lg ${stat.bg}`}>
                  {stat.icon}
                </div>
                <div className="ml-2 md:ml-3">
                  <p className="text-xs md:text-sm text-gray-500">{stat.title}</p>
                  <p className="text-base md:text-lg font-bold text-gray-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Revenue & Commission Trends</h2>
          <div className="h-64 md:h-80">
            <Bar data={revenueChartData} options={revenueChartOptions} />
          </div>
        </div>

        {/* Filters and Search - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Search Payments</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by ID or user name..."
                  value={filter.search}
                  onChange={(e) => setFilter({...filter, search: e.target.value})}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 md:h-5 md:w-5 absolute right-3 top-2.5 md:top-3.5 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={filter.date}
                onChange={(e) => setFilter({...filter, date: e.target.value})}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Vendor Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Vendor</label>
              <select
                value={filter.vendor}
                onChange={(e) => setFilter({...filter, vendor: e.target.value})}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Vendors</option>
                {vendorOptions.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Status</label>
              <select
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments List - Mobile View */}
        <div className="md:hidden mb-6">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="bg-white rounded-xl shadow mb-4 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-800">{payment.id}</div>
                    <div className="text-sm text-gray-500">{payment.date.split(' ')[0]}</div>
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Vendor</p>
                    <p className="text-sm font-medium">{payment.vendor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">User</p>
                    <p className="text-sm font-medium">{payment.user}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="text-sm font-medium">₹{payment.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Commission</p>
                    <p className="text-sm font-medium">₹{payment.commission.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 mx-auto text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No payments found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Payments Table - Desktop View */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">{payment.id}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.date.split(' ')[0]}</div>
                      <div className="text-sm text-gray-500">{payment.date.split(' ')[1]}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.vendor}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.user}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{payment.commission.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPayments.length === 0 && (
              <div className="text-center py-12">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mx-auto text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No payments found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Commission Management - Mobile View */}
        <div className="md:hidden mb-6">
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Commission Management</h2>
            
            {vendors.map((vendor) => (
              <div key={vendor.id} className="border-b border-gray-200 py-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-gray-900">{vendor.name}</div>
                  <div className="text-sm text-gray-900">{vendor.commissionRate}%</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={commissionRates[vendor.id]}
                    onChange={(e) => updateCommissionRate(vendor.id, parseInt(e.target.value) || 0)}
                    className="flex-grow p-2 border border-gray-300 rounded-lg mr-2"
                  />
                  <button 
                    onClick={() => updateCommissionRate(vendor.id, commissionRates[vendor.id])}
                    className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800">Commission Policy</h3>
              <p className="text-xs text-blue-700 mt-1">
                Commission rates are applied to all transactions. Changes will affect future orders only.
                Rates typically range between 10% and 20% depending on vendor agreement.
              </p>
            </div>
          </div>
          
          {/* Payout Management - Mobile View */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Payout Management</h2>
              <button className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg">
                Process All
              </button>
            </div>
            
            {payouts.map((payout) => (
              <div key={payout.id} className="border-b border-gray-200 py-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-gray-900">{payout.name}</div>
                  <div className="text-sm text-gray-900">₹{payout.payoutAmount.toLocaleString()}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <p className="text-xs text-gray-500">Balance</p>
                    <p className="text-sm font-medium">₹{payout.balance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Commission</p>
                    <p className="text-sm font-medium">{payout.commissionRate}%</p>
                  </div>
                </div>
                <button 
                  onClick={() => processPayout(payout.id)}
                  disabled={payout.payoutAmount === 0}
                  className={`w-full py-2 rounded-lg text-sm ${
                    payout.payoutAmount === 0 
                      ? "bg-gray-100 text-gray-400" 
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  Process Payout
                </button>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-medium text-green-800">Total Payout Due</h3>
                <p className="font-bold text-green-800">
                  ₹{payouts.reduce((sum, payout) => sum + payout.payoutAmount, 0).toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-green-700 mt-1">
                Payouts are processed weekly. Click "Process" to send funds to individual vendors.
              </p>
            </div>
          </div>
        </div>

        {/* Commission & Payout Management - Desktop View */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Commission Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Rate</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vendor.commissionRate}%</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="w-24">
                          <input
                            type="number"
                            min="0"
                            max="30"
                            value={commissionRates[vendor.id]}
                            onChange={(e) => updateCommissionRate(vendor.id, parseInt(e.target.value) || 0)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => updateCommissionRate(vendor.id, commissionRates[vendor.id])}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800">Commission Policy</h3>
              <p className="text-sm text-blue-700 mt-1">
                Commission rates are applied to all transactions. Changes will affect future orders only.
                Rates typically range between 10% and 20% depending on vendor agreement.
              </p>
            </div>
          </div>
          
          {/* Payout Management */}
          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Payout Management</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">
                Process All Payouts
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payout Amount</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payout.name}</div>
                        <div className="text-xs text-gray-500">Last payout: {payout.lastPayout}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{payout.balance.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payout.commissionRate}%
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{payout.payoutAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => processPayout(payout.id)}
                          disabled={payout.payoutAmount === 0}
                          className={`px-3 py-1 rounded-lg ${
                            payout.payoutAmount === 0 
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                        >
                          Process
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-medium text-green-800">Total Payout Due</h3>
                <p className="font-bold text-green-800">
                  ₹{payouts.reduce((sum, payout) => sum + payout.payoutAmount, 0).toLocaleString()}
                </p>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Payouts are processed weekly. Click "Process" to send funds to individual vendors or "Process All Payouts" for bulk processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTransactions;