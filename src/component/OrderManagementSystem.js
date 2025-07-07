import React, { useEffect } from 'react'
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
//   FaSearch,
  FaCog,
  FaBell,
//   FaUserCircle
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

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const orders = data?.data || null

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

      {/* Top Navigation */}
      {/* <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <FaStore className="text-indigo-600 text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Franchise Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 w-64"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button className="bg-white p-2 rounded-full hover:bg-gray-100">
              <FaUserCircle className="text-indigo-600 text-2xl" />
            </button>
          </div>
        </div>
      </div> */}

      <div className='max-w-6xl mx-auto space-y-6'>
        {/* Franchise Header Card - Glassmorphism Design */}
        <div className='bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/50 relative overflow-hidden'>
          {/* Decorative gradient elements */}
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
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                    selectedFranchise?.status === 'Approved'
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

          {/* Stats Grid - Modern Design */}
          <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10'>
            <StatBox
              title='Total Sales'
              value={`₹${selectedFranchise?.salesCount || '0'}`}
              icon={<FaMoneyBillWave />}
              trend='+12.5%'
              color='from-indigo-500 to-blue-500'
            />
            <StatBox
              title='Orders'
              value={selectedFranchise?.orders?.length || '0'}
              icon={<FaShoppingBag />}
              trend='+8.2%'
              color='from-green-500 to-teal-500'
            />
            <StatBox
              title='Status'
              value={selectedFranchise?.isActivated ? 'Active' : 'Inactive'}
              icon={<FaStar />}
              color='from-purple-500 to-fuchsia-500'
            />
            <StatBox
              title='Avg Order'
              value='₹720'
              trend='+5.3%'
              icon={<FaChartLine />}
              color='from-amber-500 to-orange-500'
            />
          </div>
        </div>

        {/* Franchise Details Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Franchise Information Card */}
          <div className='bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6 lg:col-span-1'>
            <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center'>
              <div className='bg-indigo-100 p-2 rounded-lg mr-3'>
                <FaUser className='text-indigo-600' />
              </div>
              Franchise Details
            </h2>

            <div className='space-y-5'>
              <InfoItem
                icon={<FaUser className='text-indigo-600' />}
                label='Owner'
                value={selectedFranchise?.ownerName}
              />
              <InfoItem
                icon={<FaPhone className='text-indigo-600' />}
                label='Phone'
                value={selectedFranchise?.phone}
              />
              <InfoItem
                icon={<FaEnvelope className='text-indigo-600' />}
                label='Email'
                value={selectedFranchise?.email}
              />
              <InfoItem
                icon={<FaMapMarkerAlt className='text-indigo-600' />}
                label='Address'
                value={`${selectedFranchise?.address}, ${selectedFranchise?.city}, ${selectedFranchise?.state}`}
              />
              <InfoItem
                icon={<FaCalendar className='text-indigo-600' />}
                label='Created At'
                value={new Date(
                  selectedFranchise?.createdAt
                ).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
              <InfoItem
                icon={<FaTruck className='text-indigo-600' />}
                label='Delivery Area'
                value='Kanpur City Center (5km radius)'
              />
            </div>
          </div>

          {/* Orders Section - Modern Card Design */}
          <div className='bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden lg:col-span-2'>
            <div className='p-6'>
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
                <div>
                  <h2 className='text-xl font-bold text-gray-800 flex items-center'>
                    <div className='bg-indigo-100 p-2 rounded-lg mr-3'>
                      <FaShoppingBag className='text-indigo-600' />
                    </div>
                    Recent Orders
                    <span className='bg-indigo-100 text-indigo-800 text-sm font-medium ml-3 px-2.5 py-0.5 rounded-full'>
                      {selectedFranchise?.orders?.length || 0} orders
                    </span>
                  </h2>
                  <p className='text-gray-500 text-sm mt-2'>
                    Latest transactions and order details
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

              {selectedFranchise?.orders?.length === 0 ? (
                <div className='bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 text-center border-2 border-dashed border-indigo-100'>
                  <div className='bg-gray-200 border-2 border-dashed border-gray-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto'>
                    <FaShoppingBag className='text-gray-500 text-2xl' />
                  </div>
                  <h3 className='text-lg font-medium text-gray-900 mt-4'>
                    No orders yet
                  </h3>
                  <p className='text-gray-500 mt-2'>
                    This franchise hasn't received any orders yet.
                  </p>
                </div>
              ) : (
                <div className='space-y-5'>
                  {isLoading ? (
                    <div className='flex justify-center py-10'>
                      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
                    </div>
                  ) : orders?.length === 0 ? (
                    <p className='text-gray-500 text-center py-10'>
                      No orders found.
                    </p>
                  ) : (
                    <div className='space-y-4'>
                      {orders?.map((order, index) => (
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
                                  'en-IN'
                                )}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center mt-2 md:mt-0 ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-green-100 text-green-700'
                                  : order.orderStatus === 'Cancelled'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
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
                          </div>

                          {/* Grid Sections */}
                          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
                            {/* Customer Info */}
                            <div className='bg-gray-50 p-4 rounded-lg'>
                              <h4 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                                <FaUser className='mr-2 text-indigo-600' />{' '}
                                Customer
                              </h4>
                              <p className='text-gray-800 font-semibold'>
                                {order.customerName}
                              </p>
                              <p className='text-gray-500 text-sm mt-1'>
                                {order.customerId?.phone || 'N/A'}
                              </p>
                            </div>

                            {/* Order Items */}
                            <div className='bg-gray-50 p-4 rounded-lg'>
                              <h4 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                                <FaBox className='mr-2 text-indigo-600' /> Items
                              </h4>
                              <div className='space-y-3'>
                                {order?.orderItems?.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className='flex justify-between items-center'
                                  >
                                    <div className='flex items-center gap-2'>
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className='w-10 h-10 rounded object-cover border border-gray-300'
                                      />
                                      <div>
                                        <span className='font-medium text-gray-800'>
                                          {item.name}
                                        </span>
                                        <span className='text-gray-500 text-sm ml-2'>
                                          × {item.quantity}
                                        </span>
                                      </div>
                                    </div>
                                    <span className='font-medium'>
                                      ₹{item.price * item.quantity}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Payment Summary */}
                            <div className='bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100'>
                              <h4 className='text-sm font-medium text-gray-700 mb-2 flex items-center'>
                                <FaMoneyBillWave className='mr-2 text-indigo-600' />{' '}
                                Payment Summary
                              </h4>
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
                                  <span className='text-red-500'>
                                    - ₹{order.discount}
                                  </span>
                                </div>
                                <div className='flex justify-between border-t border-gray-300 pt-2 mt-2'>
                                  <span className='text-gray-700'>
                                    Tax (18%):
                                  </span>
                                  <span>
                                    ₹{(order.totalAmount * 0.18).toFixed(2)}
                                  </span>
                                </div>
                                <div className='flex justify-between font-bold text-gray-900 pt-2'>
                                  <span>Total:</span>
                                  <span className='text-indigo-700'>
                                    ₹{order.totalAmount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
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

export default FranchiseOrderSystem
