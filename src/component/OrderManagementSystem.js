import React, { useEffect, useState } from 'react'
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaStore,
  FaCalendar,
  FaFileInvoice,
  FaTag,
  FaBox,
  FaShoppingBag,
  FaMoneyBillWave,
  FaChartLine,
  FaStar,
  FaTruck,
  FaCheck,
  FaClock,
  FaChevronDown,
  FaCog,
  FaBell,
  FaCreditCard,
  FaReceipt,
  FaMoneyCheck,
  FaQrcode,
  FaWallet,
  FaUniversity,
  FaShieldAlt,
  FaInfoCircle
} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../redux/api'

  const FranchiseOrderSystem = () => {
  const location = useLocation()
  const itemId = location?.state?.itemId
  const selectedFranchise = location?.state?.freDetail

  const { data, isLoading } = useGetOrderByIdQuery(itemId, {
    skip: !itemId
  })

  const [activeTab, setActiveTab] = useState('orders')
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  // Dummy payment data
  const dummyPayments = [
    {
      id: 'PAY-001',
      orderId: 'ORD-1001',
      date: '2023-10-15T14:30:00Z',
      amount: 2499,
      method: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN-789456123',
      commission: 374.85,
      payout: 2124.15,
      fees: 49.98
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-1002',
      date: '2023-10-14T11:20:00Z',
      amount: 1599,
      method: 'UPI',
      status: 'Completed',
      transactionId: 'TXN-321654987',
      commission: 239.85,
      payout: 1359.15,
      fees: 31.98
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-1003',
      date: '2023-10-13T16:45:00Z',
      amount: 3499,
      method: 'Wallet',
      status: 'Pending',
      transactionId: 'TXN-987654321',
      commission: 524.85,
      payout: 2974.15,
      fees: 69.98
    },
    {
      id: 'PAY-004',
      orderId: 'ORD-1004',
      date: '2023-10-12T09:15:00Z',
      amount: 899,
      method: 'Net Banking',
      status: 'Failed',
      transactionId: 'TXN-456123789',
      commission: 0,
      payout: 0,
      fees: 0
    },
    {
      id: 'PAY-005',
      orderId: 'ORD-1005',
      date: '2023-10-11T18:30:00Z',
      amount: 2299,
      method: 'Debit Card',
      status: 'Refunded',
      transactionId: 'TXN-159753486',
      commission: 0,
      payout: 0,
      fees: 45.98,
      refundAmount: 2299
    }
  ]

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
  const payments = dummyPayments

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return <FaCreditCard className="text-blue-500" />
      case 'Debit Card':
        return <FaCreditCard className="text-purple-500" />
      case 'UPI':
        return <FaQrcode className="text-green-500" />
      case 'Wallet':
        return <FaWallet className="text-orange-500" />
      case 'Net Banking':
        return <FaUniversity className="text-indigo-500" />
      default:
        return <FaMoneyBillWave className="text-gray-500" />
    }
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
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6'>
      {/* Floating Action Buttons */}
      <div className='fixed bottom-6 right-6 z-10 flex flex-col space-y-3'>
        <button className='bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-105'>
          <FaCog className='text-xl' />
        </button>
        <button className='bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-105'>
          <FaBell className='text-xl' />
        </button>
      </div>

      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Franchise Header Card */}
        <div className='bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50 relative overflow-hidden'>
          <div className='absolute -top-20 -right-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl'></div>

          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10'>
            <div>
              <div className='flex items-center mb-2'>
                <div className='bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg mr-3'>
                  <FaStore className='text-yellow-300' />
                </div>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
                  {selectedFranchise?.frenchieName}
                </h1>
              </div>
              <div className='flex flex-wrap items-center gap-2 mt-3'>
                <span className='bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium flex items-center'>
                  <FaTag className='mr-2' /> ID:{' '}
                  {selectedFranchise?.frenchiesID}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${selectedFranchise?.status === 'Approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {selectedFranchise?.status}
                </span>
                <span className='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center'>
                  <FaStar className='mr-2 text-yellow-400' /> Premium Franchise
                </span>
              </div>
            </div>

            <div className='flex space-x-2'>
              <button className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg flex items-center transition transform hover:-translate-y-0.5 shadow-md'>
                <FaChartLine className='mr-2' /> Analytics
              </button>
              <button className='bg-white border border-indigo-200 hover:border-indigo-300 text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-lg flex items-center transition transform hover:-translate-y-0.5 shadow-sm'>
                <FaFileInvoice className='mr-2' /> Export Report
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10'>
            <StatBox
              title='Total Sales'
              value={`₹${selectedFranchise?.salesCount || '12,499'}`}
              icon={<FaMoneyBillWave />}
              trend='+12.5%'
              color='from-indigo-500 to-blue-500'
            />
            <StatBox
              title='Orders'
              value={orders.length}
              icon={<FaShoppingBag />}
              trend='+8.2%'
              color='from-green-500 to-teal-500'
            />
            <StatBox
              title='Payments'
              value={payments.length}
              icon={<FaCreditCard />}
              trend='+15.3%'
              color='from-purple-500 to-fuchsia-500'
            />
            <StatBox
              title='Commission'
              value='₹1,189'
              trend='+9.7%'
              icon={<FaChartLine />}
              color='from-amber-500 to-orange-500'
            />
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className='bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-4'>
          <div className='flex space-x-4'>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'orders'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              <FaShoppingBag className="inline mr-2" />
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'payments'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              <FaCreditCard className="inline mr-2" />
              Payments ({payments.length})
            </button>
          </div>
        </div>

        {/* Orders Section */}
        {activeTab === 'orders' && (
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
                      {orders.length} orders
                    </span>
                  </h2>
                  <p className='text-gray-500 text-sm mt-2'>
                    Complete order history and details
                  </p>
                </div>
                <div className='flex space-x-2 mt-4 md:mt-0'>
                  <button className='text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center bg-indigo-50 px-3 py-2 rounded-lg transition transform hover:-translate-y-0.5'>
                    <FaFileInvoice className='mr-2' /> Export Orders
                  </button>
                  <div className='relative'>
                    <select className='bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 pr-8 appearance-none'>
                      <option>All Orders</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </select>
                    <FaChevronDown className='absolute right-3 top-3 text-gray-400 text-xs pointer-events-none' />
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div className='flex justify-center py-10'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
                </div>
              ) : (
                <div className='space-y-4'>
                  {orders.map((order, index) => (
                    <div
                      key={order._id || index}
                      className='bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200'
                    >
                      {/* Header */}
                      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4'>
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
                                        src={'/image/pizza.jpg'}
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
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payments Section */}
        {activeTab === 'payments' && (
          <div className='bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden'>
            <div className='p-6'>
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                <div>
                  <h2 className='text-xl font-bold text-gray-800 flex items-center'>
                    <div className='bg-indigo-100 p-2 rounded-lg mr-3'>
                      <FaCreditCard className='text-indigo-600' />
                    </div>
                    Payment History
                    <span className='bg-indigo-100 text-indigo-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded-full'>
                      {payments.length} transactions
                    </span>
                  </h2>
                  <p className='text-gray-500 text-sm mt-2'>
                    Complete payment records and transaction details
                  </p>
                </div>
                <div className='flex space-x-2 mt-4 md:mt-0'>
                  <button className='text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center bg-indigo-50 px-3 py-2 rounded-lg transition transform hover:-translate-y-0.5'>
                    <FaFileInvoice className='mr-2' /> Export Payments
                  </button>
                  <div className='relative'>
                    <select className='bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 pr-8 appearance-none'>
                      <option>All Payments</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Failed</option>
                    </select>
                    <FaChevronDown className='absolute right-3 top-3 text-gray-400 text-xs pointer-events-none' />
                  </div>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Transaction
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Amount
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Method
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Commission
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Payout
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {payments.map((payment, index) => (
                      <tr key={payment.id} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='bg-indigo-100 p-2 rounded-lg mr-3'>
                              {getPaymentIcon(payment.method)}
                            </div>
                            <div>
                              <div className='text-sm font-medium text-gray-900'>
                                {payment.id}
                              </div>
                              <div className='text-sm text-gray-500'>
                                Order: {payment.orderId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>
                            ₹{payment.amount}
                          </div>
                          <div className='text-sm text-gray-500'>
                            Fees: ₹{payment.fees}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'>
                            {payment.method}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>
                            ₹{payment.commission}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-green-900'>
                            ₹{payment.payout}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                              payment.status
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {new Date(payment.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Payment Summary */}
              <div className='mt-8 grid grid-cols-1 md:grid-cols-4 gap-4'>
                <div className='bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100'>
                  <h4 className='text-sm font-medium text-green-800 mb-2'>
                    Total Revenue
                  </h4>
                  <p className='text-2xl font-bold text-green-900'>
                    ₹{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                  </p>
                </div>
                <div className='bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100'>
                  <h4 className='text-sm font-medium text-blue-800 mb-2'>
                    Total Commission
                  </h4>
                  <p className='text-2xl font-bold text-blue-900'>
                    ₹{payments.reduce((sum, p) => sum + p.commission, 0).toLocaleString()}
                  </p>
                </div>
                <div className='bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100'>
                  <h4 className='text-sm font-medium text-purple-800 mb-2'>
                    Total Payout
                  </h4>
                  <p className='text-2xl font-bold text-purple-900'>
                    ₹{payments.reduce((sum, p) => sum + p.payout, 0).toLocaleString()}
                  </p>
                </div>
                <div className='bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100'>
                  <h4 className='text-sm font-medium text-amber-800 mb-2'>
                    Success Rate
                  </h4>
                  <p className='text-2xl font-bold text-amber-900'>
                    {((payments.filter(p => p.status === 'Completed').length / payments.length) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <div className='flex items-start gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition'>
    <div className='bg-indigo-100 p-3 rounded-lg text-indigo-600 flex-shrink-0'>
      {icon}
    </div>
    <div>
      <p className='text-gray-500 text-xs uppercase tracking-wider'>{label}</p>
      <p className='text-gray-800 font-medium'>{value}</p>
    </div>
  </div>
)

const StatBox = ({ title, value, icon, trend, color }) => (
  <div
    className={`bg-gradient-to-r ${color} p-4 rounded-xl text-white flex items-center shadow-md`}
  >
    <div className='bg-white/20 p-3 rounded-lg mr-3 backdrop-blur-sm'>
      {icon}
    </div>
    <div>
      <p className='text-xs opacity-90'>{title}</p>
      <p className='text-lg font-bold'>{value}</p>
      {trend && (
        <p className='text-xs opacity-80 mt-1 flex items-center'>
          <span className='bg-white/30 px-1.5 py-0.5 rounded mr-1'>↑</span>
          {trend} from last month
        </p>
      )}
    </div>
  </div>
)

export default FranchiseOrderSystem;