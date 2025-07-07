import React from 'react';
import { FaBox, FaMapMarkerAlt, FaCreditCard, FaHistory, FaCalendarAlt, FaTag, FaUser, FaStore, FaTruck, FaCheckCircle, FaClock, FaMoneyBillWave, FaPercent, FaReceipt } from 'react-icons/fa';

const OrderDetailCard = () => {
  const order = {
    deliveryLocation: {
      coordinates: [77.1025, 28.7041],
      address: "123 Main Street, Delhi",
      landmark: "Near Metro Station",
      type: "Point"
    },
    _id: "68678f117b5814a3cec08406",
    orderId: "ORD1751617297578",
    customerId: "68677f5bad4351350c9059dc",
    frenchiesId: "686774908569e4feccc8afb2",
    orderItems: [
      {
        productId: "68677f24ad4351350c9059d6",
        quantity: 6,
        price: 200,
        _id: "68678f117b5814a3cec08407",
        name: "Premium Pizza Oven"
      }
    ],
    amount: 1200,
    discount: 50,
    totalAmount: 1150,
    paymentMethod: "COD",
    paymentId: null,
    paymentStatus: "pending",
    orderStatus: "confirmed",
    statusHistory: [
      {
        status: "confirmed",
        timestamp: "2025-07-04T08:21:37.578Z",
        _id: "68678f117b5814a3cec08408"
      },
      {
        status: "processing",
        timestamp: "2025-07-04T10:21:37.578Z",
        _id: "68678f117b5814a3cec08409"
      },
      {
        status: "shipped",
        timestamp: "2025-07-04T12:21:37.578Z",
        _id: "68678f117b5814a3cec08410"
      }
    ],
    createdAt: "2025-07-04T08:21:37.586Z",
    updatedAt: "2025-07-04T08:21:37.586Z",
    __v: 0
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get payment status color
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                  <FaBox className="mr-3" />
                  Order #{order.orderId}
                </h1>
                <div className="flex items-center mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                  <span className="ml-3 text-indigo-200 flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>
              <button className="mt-4 md:mt-0 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center transition">
                <FaTruck className="mr-2" />
                Track Order
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaReceipt className="text-indigo-600 mr-2" />
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                          <FaBox className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Product</p>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">ID: {item.productId}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="font-medium">₹{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <FaMoneyBillWave className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="font-medium">₹{order.amount}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <FaPercent className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Discount</p>
                        <p className="font-medium">-₹{order.discount}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                        <FaMoneyBillWave className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-bold text-lg text-indigo-700">₹{order.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Customer & Franchise Info */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaUser className="text-indigo-600 mr-2" />
                  Customer & Franchise
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <FaUser className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Customer ID</p>
                      <p className="font-medium">{order.customerId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <FaStore className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Franchise ID</p>
                      <p className="font-medium">{order.frenchiesId}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment & Delivery Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Payment Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaCreditCard className="text-indigo-600 mr-2" />
                  Payment Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <FaCreditCard className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">{order.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <div className={`w-3 h-3 rounded-full ${
                        order.paymentStatus === 'pending' 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`}></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <p className={`font-medium ${
                        order.paymentStatus === 'pending' 
                          ? 'text-yellow-600' 
                          : 'text-green-600'
                      }`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Delivery Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaMapMarkerAlt className="text-indigo-600 mr-2" />
                  Delivery Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <FaMapMarkerAlt className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery Address</p>
                      <p className="font-medium">{order.deliveryLocation.address}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.deliveryLocation.landmark}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Coordinates</p>
                      <p className="font-medium">
                        {order.deliveryLocation.coordinates[0]}, {order.deliveryLocation.coordinates[1]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status History */}
            <div className="bg-gray-50 rounded-xl p-5 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaHistory className="text-indigo-600 mr-2" />
                Status History
              </h2>
              
              <div className="relative pl-8 border-l-2 border-indigo-200 space-y-6">
                {order.statusHistory.map((status, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-3.5 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                      {status.status === 'confirmed' ? (
                        <FaCheckCircle className="text-white text-xs" />
                      ) : status.status === 'shipped' ? (
                        <FaTruck className="text-white text-xs" />
                      ) : (
                        <FaClock className="text-white text-xs" />
                      )}
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-indigo-800">
                        {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(status.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-3">
              Print Invoice
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCard;