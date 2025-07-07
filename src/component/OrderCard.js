// src/components/OrderCard.js
import React from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave, FaHistory, FaBox, FaUser, FaStore } from 'react-icons/fa';

const OrderCard = ({ order }) => {
  // Format date
  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Status color mapping
  const statusColors = {
    confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    shipped: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' },
    delivered: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' }
  };

  const statusColor = statusColors[order.orderStatus] || statusColors.confirmed;

  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-indigo-100'>
      {/* Card Header */}
      <div className={`p-4 border-b ${statusColor.border}`}>
        <div className='flex flex-wrap justify-between items-center'>
          <div>
            <h3 className='text-lg font-bold text-gray-800 flex items-center'>
              <FaBox className='mr-2 text-indigo-600' />
              {order.orderId}
            </h3>
            <p className='text-gray-500 text-sm mt-1'>
              {formatDate(order.createdAt)}
            </p>
          </div>
          <div className='flex items-center'>
            <span className={`px-3 py-1 ${statusColor.bg} ${statusColor.text} rounded-full text-sm font-medium flex items-center`}>
              {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='p-5'>
        {/* Customer and Franchise Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
          <div className='bg-gray-50 rounded-lg p-4 flex items-start'>
            <div className='bg-indigo-100 p-3 rounded-lg mr-4'>
              <FaUser className='text-indigo-600 text-lg' />
            </div>
            <div>
              <h4 className='text-gray-500 text-xs font-medium uppercase tracking-wider mb-1'>Customer ID</h4>
              <p className='text-gray-800 font-medium truncate'>{order.customerId}</p>
            </div>
          </div>
          
          <div className='bg-gray-50 rounded-lg p-4 flex items-start'>
            <div className='bg-indigo-100 p-3 rounded-lg mr-4'>
              <FaStore className='text-indigo-600 text-lg' />
            </div>
            <div>
              <h4 className='text-gray-500 text-xs font-medium uppercase tracking-wider mb-1'>Franchise ID</h4>
              <p className='text-gray-800 font-medium truncate'>{order.frenchiesId}</p>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className='bg-gray-50 rounded-lg p-4 mb-6'>
          <h4 className='text-gray-500 text-xs font-medium uppercase tracking-wider mb-2'>Payment Information</h4>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <FaMoneyBillWave className='text-gray-500 mr-2' />
              <span className='text-gray-800 font-medium'>
                {order.paymentMethod}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                order.paymentStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </span>
          </div>
        </div>

        {/* Order Items */}
        <div className='mb-6'>
          <h4 className='text-gray-800 font-medium mb-3 flex items-center'>
            <span className='bg-indigo-100 text-indigo-600 p-1 rounded mr-2'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </span>
            Order Items
          </h4>
          <div className='border border-gray-200 rounded-lg overflow-hidden'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider'>Product</th>
                  <th className='text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider'>Quantity</th>
                  <th className='text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
                  <th className='text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider'>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className='py-3 px-4 text-sm text-gray-800 font-medium'>{item.productId}</td>
                    <td className='py-3 px-4 text-center text-sm text-gray-600'>{item.quantity}</td>
                    <td className='py-3 px-4 text-center text-sm text-gray-600'>₹{item.price}</td>
                    <td className='py-3 px-4 text-right text-sm font-semibold text-gray-800'>₹{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='border border-gray-200 rounded-lg p-4 text-center'>
            <p className='text-gray-500 text-sm mb-1'>Subtotal</p>
            <p className='font-bold text-gray-800 text-lg'>₹{order.amount}</p>
          </div>
          <div className='border border-gray-200 rounded-lg p-4 text-center'>
            <p className='text-gray-500 text-sm mb-1'>Discount</p>
            <p className='font-bold text-red-500 text-lg'>-₹{order.discount}</p>
          </div>
          <div className='border-2 border-indigo-200 bg-indigo-50 rounded-lg p-4 text-center'>
            <p className='text-indigo-500 text-sm mb-1'>Total Amount</p>
            <p className='font-bold text-indigo-700 text-xl'>₹{order.totalAmount}</p>
          </div>
        </div>

        {/* Delivery and Status History */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Delivery Information */}
          <div>
            <h4 className='text-gray-800 font-medium mb-3 flex items-center'>
              <FaMapMarkerAlt className='text-indigo-600 mr-2' />
              Delivery Information
            </h4>
            <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-indigo-100'>
              <div className='flex'>
                <div className='bg-white p-3 rounded-lg mr-4 shadow-sm'>
                  <FaMapMarkerAlt className='text-indigo-600 text-xl' />
                </div>
                <div>
                  <p className='font-medium text-gray-800'>
                    {order.deliveryLocation.address}
                  </p>
                  <p className='text-sm text-gray-500 mt-1'>
                    {order.deliveryLocation.landmark}
                  </p>
                  <div className='mt-2 flex items-center text-xs text-gray-500'>
                    <span className='bg-gray-200 px-2 py-1 rounded mr-2'>Coordinates</span>
                    <span>{order.deliveryLocation.coordinates[0]}, {order.deliveryLocation.coordinates[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status History */}
          <div>
            <h4 className='text-gray-800 font-medium mb-3 flex items-center'>
              <FaHistory className='text-indigo-600 mr-2' />
              Status History
            </h4>
            <div className='relative pl-6 border-l-2 border-indigo-200 ml-3'>
              {order.statusHistory.map((status, index) => (
                <div key={index} className='mb-4 relative'>
                  <div className='absolute -left-8 top-0 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center'>
                    <div className='w-2 h-2 rounded-full bg-white'></div>
                  </div>
                  <div className='bg-white rounded-lg p-3 shadow-sm border border-gray-100'>
                    <div className='flex justify-between items-start'>
                      <span className='font-medium text-gray-800 capitalize'>{status.status}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        status.status === 'confirmed' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {formatDate(status.timestamp)}
                      </span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>
                      {new Date(status.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className='bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end'>
        <button className='px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors mr-3'>
          View Details
        </button>
        <button className='px-4 py-2 bg-white text-indigo-600 border border-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors'>
          Track Order
        </button>
      </div>
    </div>
  );
};

export default OrderCard;