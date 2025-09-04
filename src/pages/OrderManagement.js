import React, { useEffect, useState } from 'react'
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendar,
  FaFileInvoice,
  FaTag,
  FaShoppingBag,
  FaMoneyBillWave,
  FaCheck,
  FaClock,
  FaChevronDown,
  FaInfoCircle,
  FaSearch,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../redux/api'

const OrderDashboard = () => {
  const location = useLocation()
  const itemId = location?.state?.itemId

  const { data, isLoading } = useGetOrderByIdQuery()

  const [expandedOrder, setExpandedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Orders')

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  // Static addresses (as requested)
  const staticAddresses = [
    "123 Main Street, Kanpur, Uttar Pradesh 208001",
    "456 Park Road, Kanpur, Uttar Pradesh 208002",
    "789 Market Street, Kanpur, Uttar Pradesh 208003",
    "321 Garden Road, Kanpur, Uttar Pradesh 208004",
    "654 Lake View, Kanpur, Uttar Pradesh 208005"
  ]

  // Static customer data
  const staticCustomers = [
    { name: "Rajesh Kumar", phone: "+91 9876543210", email: "rajesh@example.com" },
    { name: "Priya Sharma", phone: "+91 8765432109", email: "priya@example.com" },
    { name: "Vikram Singh", phone: "+91 7654321098", email: "vikram@example.com" },
    { name: "Ananya Patel", phone: "+91 6543210987", email: "ananya@example.com" },
    { name: "Arjun Mehta", phone: "+91 5432109876", email: "arjun@example.com" }
  ]

  // Get orders from API or use dummy data
  const orders = data || []

  // Enhance orders with static data
  const enhancedOrders = orders.map((order, index) => {
    const customerIndex = index % staticCustomers.length
    const addressIndex = index % staticAddresses.length
    
    return {
      ...order,
      customerName: staticCustomers[customerIndex].name,
      customerPhone: staticCustomers[customerIndex].phone,
      customerEmail: staticCustomers[customerIndex].email,
      deliveryAddress: staticAddresses[addressIndex],
      orderId: `ORD-${1000 + index}`,
      orderStatus: order.status || 'PENDING',
      paymentStatus: order.paymentMode === 'COD' ? 'Pending' : 'Paid'
    }
  })

  // Filter orders based on search term and status filter
  const filteredOrders = enhancedOrders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customerName && order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customerPhone && order.customerPhone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customerEmail && order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = 
      statusFilter === 'All Orders' || 
      order.orderStatus.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesStatus
  })

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED':
      case 'COMPLETED':
        return 'bg-green-100 text-green-800'
      case 'PREPARING':
      case 'PREPARATION':
        return 'bg-yellow-100 text-yellow-800'
      case 'PENDING':
        return 'bg-blue-100 text-blue-800'
      case 'CANCELLED':
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      case 'REFUNDED':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  return (
    <div className='bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden'>
      <div className='p-6'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
          <div>
            <h2 className='text-xl font-bold text-gray-800 flex items-center'>
              <div className='bg-indigo-100 p-2 rounded-lg mr-3'>
                <FaShoppingBag className='text-indigo-600' />
              </div>
              All Orders
              <span className='bg-indigo-100 text-indigo-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded-full'>
                {filteredOrders.length} orders
              </span>
            </h2>
            <p className='text-gray-500 text-sm mt-2'>
              Complete order history and details
            </p>
          </div>
          <div className='flex flex-col md:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto'>
            {/* Search Input */}
            <div className='relative w-full md:w-64'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaSearch className='text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search orders...'
                className='bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Status Filter Dropdown */}
            <div className='relative w-full md:w-48'>
              <select 
                className='bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 pr-8 appearance-none'
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Orders</option>
                <option>PENDING</option>
                <option>PREPARING</option>
                <option>DELIVERED</option>
                <option>CANCELLED</option>
                <option>REFUNDED</option>
              </select>
              <FaChevronDown className='absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none' />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className='flex justify-center py-10'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <div
                  key={order._id || index}
                  className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200'
                >
                  {/* Header */}
                  <div onClick={() => toggleOrderExpand(order._id)} className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4 cursor-pointer'>
                    <div>
                      <h3 className='font-bold text-gray-800 flex items-center'>
                        <div className='bg-indigo-100 p-2 rounded-lg mr-3'>
                          <FaTag className='text-indigo-600' />
                        </div>
                        Order #{order.orderId}
                      </h3>
                      <p className='text-sm text-gray-500 flex items-center mt-1 ml-10'>
                        <FaCalendar className='mr-2' />
                        {new Date(order.createdAt).toLocaleDateString(
                          'en-IN',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }
                        )}
                      </p>
                    </div>
                    <div className='flex items-center gap-2 mt-2 md:mt-0'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus === 'DELIVERED' ? (
                          <FaCheck className='mr-1 text-green-600' />
                        ) : order.orderStatus === 'CANCELLED' ? (
                          <FaClock className='mr-1 text-red-600' />
                        ) : (
                          <FaClock className='mr-1 text-amber-600' />
                        )}
                        {formatStatus(order.orderStatus)}
                      </span>
                      <button
                        onClick={() => toggleOrderExpand(order._id)}
                        className='p-2 text-gray-500 hover:text-indigo-600 transition-colors'
                      >
                        <FaChevronDown
                          className={`transition-transform ${expandedOrder === order._id
                            ? 'rotate-180'
                            : ''
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                        <FaUser className='mr-2 text-indigo-600' /> Customer
                      </h4>
                      <p className='text-gray-800 font-semibold'>
                        {order.customerName}
                      </p>
                      <p className='text-gray-500 text-sm mt-1 flex items-center'>
                        <FaPhone className='mr-1' />
                        {order.customerPhone}
                      </p>
                      <p className='text-gray-500 text-sm flex items-center'>
                        <FaEnvelope className='mr-1' />
                        {order.customerEmail}
                      </p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                        <FaMapMarkerAlt className='mr-2 text-indigo-600' /> Delivery
                      </h4>
                      <p className='text-gray-800 text-sm'>
                        {order.deliveryAddress}
                      </p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                        <FaMoneyBillWave className='mr-2 text-indigo-600' /> Payment
                      </h4>
                      <p className='text-gray-800 font-semibold'>
                        ₹{order.grandTotal}
                      </p>
                      <p className='text-gray-500 text-sm'>
                        Method: {order.paymentMode}
                      </p>
                      <p
                        className={`text-xs font-medium mt-1 ${order.paymentStatus === 'Paid'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                          }`}
                      >
                        Status: {order.paymentStatus}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === order._id && (
                    <div className='mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                      <h4 className='text-sm font-medium text-gray-700 mb-3 flex items-center'>
                        <FaInfoCircle className='mr-2 text-indigo-600' />
                        Order Details
                      </h4>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Order Items */}
                        <div>
                          <h5 className='text-xs font-medium text-gray-500 mb-2'>
                            ORDER ITEMS
                          </h5>
                          <div className='space-y-3'>
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className='flex justify-between items-center p-2 bg-white rounded border border-gray-100'
                              >
                                <div className='flex items-center gap-3'>
                                  <div className='w-12 h-12 rounded bg-gray-200 flex items-center justify-center border border-gray-300'>
                                    <span className='text-gray-500 text-sm'>🍕</span>
                                  </div>
                                  <div>
                                    <p className='font-medium text-gray-800'>
                                      {item.name}
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                      ₹{item.unitPrice} × {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <span className='font-medium'>
                                  ₹{item.unitPrice * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Payment Breakdown */}
                        <div>
                          <h5 className='text-xs font-medium text-gray-500 mb-2'>
                            PAYMENT BREAKDOWN
                          </h5>
                          <div className='bg-white p-4 rounded border border-gray-100'>
                            <div className='space-y-2'>
                              <div className='flex justify-between'>
                                <span className='text-gray-700'>Subtotal:</span>
                                <span>₹{order.subTotal}</span>
                              </div>
                              <div className='flex justify-between'>
                                <span className='text-gray-700'>Tax:</span>
                                <span>₹{order.tax}</span>
                              </div>
                              <div className='flex justify-between'>
                                <span className='text-gray-700'>Delivery Fee:</span>
                                <span>₹{order.deliveryFee}</span>
                              </div>
                              {order.discount > 0 && (
                                <div className='flex justify-between'>
                                  <span className='text-gray-700'>Discount:</span>
                                  <span className='text-green-600'>- ₹{order.discount}</span>
                                </div>
                              )}
                              <div className='flex justify-between border-t border-gray-300 pt-2 mt-2 font-bold'>
                                <span>Grand Total:</span>
                                <span className='text-indigo-700'>₹{order.grandTotal}</span>
                              </div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className='mt-4 p-3 bg-blue-50 rounded border border-blue-100'>
                            <h6 className='text-xs font-medium text-blue-800 mb-1'>
                              ORDER INFORMATION
                            </h6>
                            <p className='text-xs text-blue-700'>
                              <strong>Order ID:</strong> {order._id}
                            </p>
                            <p className='text-xs text-blue-700'>
                              <strong>Customer ID:</strong> {order.customerId}
                            </p>
                            <p className='text-xs text-blue-700'>
                              <strong>Franchise ID:</strong> {order.franchiseId}
                            </p>
                            <p className='text-xs text-blue-700'>
                              <strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}
                            </p>
                            {order.updatedAt !== order.createdAt && (
                              <p className='text-xs text-blue-700'>
                                <strong>Updated:</strong> {new Date(order.updatedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='text-center py-10'>
                <div className='bg-gray-100 p-6 rounded-lg inline-block'>
                  <FaSearch className='text-gray-400 text-4xl mx-auto mb-4' />
                  <h3 className='text-lg font-medium text-gray-700 mb-2'>No orders found</h3>
                  <p className='text-gray-500'>
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDashboard