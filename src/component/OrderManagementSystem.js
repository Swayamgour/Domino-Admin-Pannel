import React, { useEffect, useState } from 'react';
import {
  FaStore,
  FaMapMarkerAlt,
  FaPhone,
  FaIdCard,
  FaCalendar,
  FaShoppingBag,
  FaMoneyBillWave,
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaReceipt
} from 'react-icons/fa';
import { useGetFranchiseByIdQuery } from '../redux/api';
import { useLocation, useParams } from 'react-router-dom';
import Loader from './Loader';

const FranchiseDashboard = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [expandedPayment, setExpandedPayment] = useState(null);



  const { id } = useParams(); // id will be "68b9707692498ed846206b43"
  console.log("Franchise ID:", id);

  const { data: franchiseData, isLoading } = useGetFranchiseByIdQuery(id)
  // Sample data


  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const togglePaymentExpand = (paymentId) => {
    setExpandedPayment(expandedPayment === paymentId ? null : paymentId);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateOrderTotal = (order) => {
    if (order.items && order.items[0].name) {
      return order.items.reduce((total, item) => {
        return total + (item.quantity * (item.unitPrice || 0));
      }, 0);
    }
    return "N/A";
  };

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <>
      {isLoading ? <p className='w-100 h-full flex justify-center items-center'>Loading...</p> : <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Franchise Dashboard</h1>
            <p className="text-gray-600">Manage your franchise operations</p>
          </div>

          {/* Franchise Information Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaStore className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Franchise Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-800">{franchiseData?.franchise?.address}, {franchiseData?.franchise?.city}, {franchiseData?.franchise?.state}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800">{franchiseData?.franchise?.phone}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaIdCard className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Franchise ID</p>
                  <p className="text-gray-800">{franchiseData?.franchise?._id}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Owner ID</p>
                  <p className="text-gray-800">{franchiseData?.franchise?.ownerUserId}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaCalendar className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="text-gray-800">{formatDate(franchiseData?.franchise?.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaCalendar className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Updated At</p>
                  <p className="text-gray-800">{formatDate(franchiseData?.franchise?.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaShoppingBag className="text-blue-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{franchiseData?.orders.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaMoneyBillWave className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ₹{franchiseData?.payments.reduce((total, payment) => total + payment.amount, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaCreditCard className="text-purple-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {franchiseData?.orders.filter(order => order.status === 'PENDING').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FaShoppingBag className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
            </div>

            {franchiseData?.orders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No orders found</p>
            ) : (
              <div className="space-y-4">
                {franchiseData?.orders.map((order) => (
                  <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                      onClick={() => toggleOrderExpand(order._id)}
                    >
                      <div>
                        <p className="font-medium">Order ID: {order._id}</p>
                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                          }`}>
                          {order.status}
                        </span>
                        {expandedOrder === order._id ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </div>
                    </div>

                    {expandedOrder === order._id && (
                      <div className="p-4 bg-white">
                        <div className="mb-4">
                          <p className="font-medium mb-2">Items:</p>
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                              <div>
                                <p>{item.name || `Item ${index + 1}`}</p>
                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              {item.unitPrice && (
                                <p>₹{item.quantity * item.unitPrice}</p>
                              )}
                            </div>
                          ))}
                          {order.items[0].unitPrice && (
                            <div className="flex justify-between font-medium pt-2">
                              <p>Total:</p>
                              <p>₹{calculateOrderTotal(order)}</p>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Payment Mode</p>
                            <p className="font-medium">{order.paymentMode}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Customer ID</p>
                            <p className="font-medium">{order.customerId}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Created</p>
                            <p className="font-medium">{formatDate(order.createdAt)}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Updated</p>
                            <p className="font-medium">{formatDate(order.updatedAt)}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payments Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FaReceipt className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Payments</h2>
            </div>

            {franchiseData?.payments.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No payments found</p>
            ) : (
              <div className="space-y-4">
                {franchiseData?.payments.map((payment) => (
                  <div key={payment._id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                      onClick={() => togglePaymentExpand(payment._id)}
                    >
                      <div>
                        <p className="font-medium">Payment ID: {payment._id}</p>
                        <p className="text-sm text-gray-500">{formatDate(payment.paymentDate)}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {payment.status}
                        </span>
                        {expandedPayment === payment._id ? (
                          <FaChevronUp className="text-gray-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </div>
                    </div>

                    {expandedPayment === payment._id && (
                      <div className="p-4 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-medium text-xl">₹{payment.amount}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Payment Mode</p>
                            <p className="font-medium">{payment.paymentMode}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Transaction ID</p>
                            <p className="font-medium">{payment.transactionId}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="font-medium">{payment.orderId}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Customer ID</p>
                            <p className="font-medium">{payment.customerId}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Payment Date</p>
                            <p className="font-medium">{formatDate(payment.paymentDate)}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Created</p>
                            <p className="font-medium">{formatDate(payment.createdAt)}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">Updated</p>
                            <p className="font-medium">{formatDate(payment.updatedAt)}</p>
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
      </div>}
    </>
  );
};

export default FranchiseDashboard;