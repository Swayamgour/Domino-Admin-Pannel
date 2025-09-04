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
  FaSearch
} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../redux/api'

const OrderDashboard = () => {
  const location = useLocation()
  const itemId = location?.state?.itemId

  const { data, isLoading } = useGetOrderByIdQuery(itemId, {
    skip: !itemId
  })

  const [expandedOrder, setExpandedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Orders')

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  // Dummy order data with more details
  const dummyOrders = [
    {
      _id: '1',
      orderId: 'ORD-1001',
      createdAt: '2023-10-15T14:30:00Z',
      customerName: 'Rajesh Kumar',
      customerId: { phone: '+91 9876543210', email: 'rajesh@example.com' },
      orderStatus: 'Delivered',
      amount: 1999,
      discount: 200,
      totalAmount: 2499,
      orderItems: [
        {
          name: 'Premium Pizza - Large',
          price: 599,
          quantity: 2,
          image: 'https://via.placeholder.com/100x100?text=Pizza'
        },
        {
          name: 'Garlic Bread',
          price: 199,
          quantity: 1,
          image: 'https://via.placeholder.com/100x100?text=Bread'
        },
        {
          name: 'Cold Drink - 1L',
          price: 99,
          quantity: 2,
          image: 'https://via.placeholder.com/100x100?text=Drink'
        }
      ],
      deliveryAddress: '123 Main Street, Kanpur, Uttar Pradesh 208001',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      deliveryInstructions: 'Ring bell twice',
      preparationTime: '25 mins',
      deliveryTime: '15 mins'
    },
    {
      _id: '2',
      orderId: 'ORD-1002',
      createdAt: '2023-10-14T11:20:00Z',
      customerName: 'Priya Sharma',
      customerId: { phone: '+91 8765432109', email: 'priya@example.com' },
      orderStatus: 'Preparing',
      amount: 1299,
      discount: 100,
      totalAmount: 1599,
      orderItems: [
        {
          name: 'Burger Combo',
          price: 399,
          quantity: 3,
          image: 'https://via.placeholder.com/100x100?text=Burger'
        },
        {
          name: 'French Fries',
          price: 149,
          quantity: 2,
          image: 'https://via.placeholder.com/100x100?text=Fries'
        }
      ],
      deliveryAddress: '456 Park Road, Kanpur, Uttar Pradesh 208002',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      specialRequests: 'Extra ketchup packets',
      preparationTime: '20 mins',
      estimatedDelivery: '35 mins'
    },
    {
      _id: '3',
      orderId: 'ORD-1003',
      createdAt: '2023-10-13T16:45:00Z',
      customerName: 'Vikram Singh',
      customerId: { phone: '+91 7654321098', email: 'vikram@example.com' },
      orderStatus: 'Pending',
      amount: 2999,
      discount: 500,
      totalAmount: 3499,
      orderItems: [
        {
          name: 'Family Meal Deal',
          price: 1499,
          quantity: 2,
          image: 'https://via.placeholder.com/100x100?text=Meal'
        },
        {
          name: 'Dessert Platter',
          price: 499,
          quantity: 1,
          image: 'https://via.placeholder.com/100x100?text=Dessert'
        }
      ],
      deliveryAddress: '789 Market Street, Kanpur, Uttar Pradesh 208003',
      paymentMethod: 'Wallet',
      paymentStatus: 'Pending',
      preparationTime: '30 mins'
    },
    {
      _id: '4',
      orderId: 'ORD-1004',
      createdAt: '2023-10-12T09:15:00Z',
      customerName: 'Ananya Patel',
      customerId: { phone: '+91 6543210987', email: 'ananya@example.com' },
      orderStatus: 'Cancelled',
      amount: 899,
      discount: 0,
      totalAmount: 899,
      orderItems: [
        {
          name: 'Breakfast Combo',
          price: 299,
          quantity: 3,
          image: 'https://via.placeholder.com/100x100?text=Breakfast'
        }
      ],
      deliveryAddress: '321 Garden Road, Kanpur, Uttar Pradesh 208004',
      paymentMethod: 'Net Banking',
      paymentStatus: 'Failed',
      cancellationReason: 'Customer requested cancellation'
    },
    {
      _id: '5',
      orderId: 'ORD-1005',
      createdAt: '2023-10-11T18:30:00Z',
      customerName: 'Arjun Mehta',
      customerId: { phone: '+91 5432109876', email: 'arjun@example.com' },
      orderStatus: 'Refunded',
      amount: 1899,
      discount: 400,
      totalAmount: 2299,
      orderItems: [
        {
          name: 'Special Thali',
          price: 499,
          quantity: 3,
          image: 'https://via.placeholder.com/100x100?text=Thali'
        },
        {
          name: 'Sweet Box',
          price: 399,
          quantity: 1,
          image: 'https://via.placeholder.com/100x100?text=Sweet'
        }
      ],
      deliveryAddress: '654 Lake View, Kanpur, Uttar Pradesh 208005',
      paymentMethod: 'Debit Card',
      paymentStatus: 'Refunded',
      refundReason: 'Order not delivered on time',
      refundAmount: 2299
    }
  ]

  const orders = data?.data || dummyOrders

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customerId?.phone && order.customerId.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.customerId?.email && order.customerId.email.toLowerCase().includes(searchTerm.toLowerCase()))
    
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
      case 'Delivered':
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Preparing':
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
      case 'Failed':
        return 'bg-red-100 text-red-800'
      case 'Refunded':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
                <option>Delivered</option>
                <option>Preparing</option>
                <option>Pending</option>
                <option>Cancelled</option>
                <option>Refunded</option>
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
                  <div onClick={() => toggleOrderExpand(order.orderId)} className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4 cursor-pointer'>
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
                        {order.orderStatus === 'Delivered' ? (
                          <FaCheck className='mr-1 text-green-600' />
                        ) : order.orderStatus === 'Cancelled' ? (
                          <FaClock className='mr-1 text-red-600' />
                        ) : (
                          <FaClock className='mr-1 text-amber-600' />
                        )}
                        {order.orderStatus}
                      </span>
                      <button
                        onClick={() => toggleOrderExpand(order.orderId)}
                        className='p-2 text-gray-500 hover:text-indigo-600 transition-colors'
                      >
                        <FaChevronDown
                          className={`transition-transform ${expandedOrder === order.orderId
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
                      <p className='text-gray-500 text-sm mt-1'>
                        {order.customerId?.phone || 'N/A'}
                      </p>
                      <p className='text-gray-500 text-sm'>
                        {order.customerId?.email || 'N/A'}
                      </p>
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                        <FaMapMarkerAlt className='mr-2 text-indigo-600' />{' '}
                        Delivery
                      </h4>
                      <p className='text-gray-800 text-sm'>
                        {order.deliveryAddress}
                      </p>
                      {order.deliveryInstructions && (
                        <p className='text-gray-500 text-xs mt-1'>
                          <strong>Instructions:</strong>{' '}
                          {order.deliveryInstructions}
                        </p>
                      )}
                    </div>

                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                        <FaMoneyBillWave className='mr-2 text-indigo-600' />{' '}
                        Payment
                      </h4>
                      <p className='text-gray-800 font-semibold'>
                        ₹{order.totalAmount}
                      </p>
                      <p className='text-gray-500 text-sm'>
                        Method: {order.paymentMethod}
                      </p>
                      <p
                        className={`text-xs font-medium mt-1 ${order.paymentStatus === 'Paid'
                          ? 'text-green-600'
                          : order.paymentStatus === 'Pending'
                            ? 'text-yellow-600'
                            : 'text-red-600'
                          }`}
                      >
                        Status: {order.paymentStatus}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrder === order.orderId && (
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
                            {order.orderItems.map((item, idx) => (
                              <div
                                key={idx}
                                className='flex justify-between items-center p-2 bg-white rounded border border-gray-100'
                              >
                                <div className='flex items-center gap-3'>
                                  <img
                                    src={item.image || '/image/pizza.jpg'}
                                    alt={item.name}
                                    className='w-12 h-12 rounded object-cover border border-gray-300'
                                  />
                                  <div>
                                    <p className='font-medium text-gray-800'>
                                      {item.name}
                                    </p>
                                    <p className='text-gray-500 text-sm'>
                                      ₹{item.price} × {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <span className='font-medium'>
                                  ₹{item.price * item.quantity}
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
                                <span className='text-gray-700'>
                                  Subtotal:
                                </span>
                                <span>₹{order.amount}</span>
                              </div>
                              <div className='flex justify-between'>
                                <span className='text-gray-700'>
                                  Discount:
                                </span>
                                <span className='text-green-600'>
                                  - ₹{order.discount}
                                </span>
                              </div>
                              <div className='flex justify-between'>
                                <span className='text-gray-700'>
                                  Tax (18%):
                                </span>
                                <span>
                                  ₹{((order.totalAmount - order.discount) * 0.18).toFixed(2)}
                                </span>
                              </div>
                              <div className='flex justify-between border-t border-gray-300 pt-2 mt-2 font-bold'>
                                <span>Total:</span>
                                <span className='text-indigo-700'>
                                  ₹{order.totalAmount}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          {(order.specialRequests || order.cancellationReason || order.refundReason) && (
                            <div className='mt-4 p-3 bg-yellow-50 rounded border border-yellow-100'>
                              <h6 className='text-xs font-medium text-yellow-800 mb-1'>
                                ADDITIONAL INFORMATION
                              </h6>
                              {order.specialRequests && (
                                <p className='text-xs text-yellow-700'>
                                  <strong>Special Requests:</strong> {order.specialRequests}
                                </p>
                              )}
                              {order.cancellationReason && (
                                <p className='text-xs text-red-700'>
                                  <strong>Cancellation Reason:</strong> {order.cancellationReason}
                                </p>
                              )}
                              {order.refundReason && (
                                <p className='text-xs text-blue-700'>
                                  <strong>Refund Reason:</strong> {order.refundReason}
                                </p>
                              )}
                            </div>
                          )}
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