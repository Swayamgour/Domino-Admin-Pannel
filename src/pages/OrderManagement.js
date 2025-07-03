import React, { useState } from 'react';
import { format } from 'date-fns';

const OrderManagement = () => {
  // Mock data for orders
  const initialOrders = [
    // ... (same as original)
  ];

  // State management
  const [orders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    vendor: 'all',
    status: 'all',
    search: ''
  });
  const [deliveryStaff] = useState([
    { id: 1, name: 'Rahul K.', status: 'available' },
    { id: 2, name: 'Amit S.', status: 'on-delivery' },
    { id: 3, name: 'Neha R.', status: 'available' },
    { id: 4, name: 'Priya M.', status: 'available' }
  ]);
  const [refundReason, setRefundReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Date filter
    const dateMatch = !filters.date || 
      format(order.date, 'yyyy-MM-dd') === filters.date;
    
    // Vendor filter
    const vendorMatch = filters.vendor === 'all' || 
      order.vendor === filters.vendor;
    
    // Status filter
    const statusMatch = filters.status === 'all' || 
      order.status === filters.status;
    
    // Search filter
    const searchMatch = !filters.search || 
      order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customer.phone.includes(filters.search);
    
    return dateMatch && vendorMatch && statusMatch && searchMatch;
  });

  // Vendor options
  const vendors = [...new Set(orders.map(order => order.vendor))];

  // Status options
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'preparing', label: 'Preparing', color: 'bg-blue-100 text-blue-800' },
    { value: 'out-for-delivery', label: 'Out for Delivery', color: 'bg-indigo-100 text-indigo-800' },
    { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
    { value: 'canceled', label: 'Canceled', color: 'bg-red-100 text-red-800' },
    { value: 'refund-requested', label: 'Refund Requested', color: 'bg-purple-100 text-purple-800' },
    { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-800' }
  ];

  // Open order details
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
    setIsMenuOpen(false);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    // Implementation would update order status
  };

  // Assign delivery staff
  const assignDeliveryStaff = (orderId, staffName) => {
    // Implementation would assign staff
  };

  // Process refund
  const processRefund = () => {
    // Implementation would process refund
  };

  // Get status label and color
  const getStatusInfo = (status) => {
    return statusOptions.find(option => option.value === status);
  };

  // Get status color for mobile view
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'out-for-delivery': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'refund-requested': return 'bg-purple-100 text-purple-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile header */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Order Management</h1>
            <p className="text-xs text-gray-600 mt-1">Manage customer orders</p>
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
                placeholder="Search orders..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 text-xs mb-1">Vendor</label>
                <select
                  value={filters.vendor}
                  onChange={(e) => setFilters({...filters, vendor: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Vendors</option>
                  {vendors.map(vendor => (
                    <option key={vendor} value={vendor}>{vendor}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-xs mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
            <p className="text-gray-600 mt-1">Manage all customer orders efficiently</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Today's Orders</p>
                <p className="text-xl font-bold text-gray-800">
                  {orders.filter(o => format(o.date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section - Desktop */}
        <div className="hidden md:block bg-white rounded-xl shadow p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Search Orders</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by order ID, customer name or phone..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
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
                value={filters.date}
                onChange={(e) => setFilters({...filters, date: e.target.value})}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Vendor Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Vendor</label>
              <select
                value={filters.vendor}
                onChange={(e) => setFilters({...filters, vendor: e.target.value})}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Vendors</option>
                {vendors.map(vendor => (
                  <option key={vendor} value={vendor}>{vendor}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders List - Mobile View */}
        <div className="md:hidden mb-6">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            return (
              <div key={order.id} className="bg-white rounded-xl shadow mb-4 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-gray-800">{order.id}</div>
                      <div className="text-sm text-gray-500">{format(order.date, 'dd MMM, hh:mm a')}</div>
                    </div>
                    <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="text-sm font-medium">{order.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Vendor</p>
                      <p className="text-sm font-medium">{order.vendor}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm font-medium">₹{order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment</p>
                      <p className="text-sm font-medium">{order.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => openOrderDetails(order)}
                    className="w-full mt-3 py-2 bg-indigo-600 text-white text-sm rounded-lg"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Orders Table - Desktop View */}
        <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const statusInfo = getStatusInfo(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-indigo-600">{order.id}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.phone}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.vendor}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{format(order.date, 'dd MMM yyyy')}</div>
                        <div className="text-gray-400">{format(order.date, 'hh:mm a')}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{order.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => openOrderDetails(order)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {filteredOrders.length === 0 && (
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
                <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {isDetailOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">Order #{selectedOrder.id}</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Placed on {format(selectedOrder.date, 'dd MMM yyyy, hh:mm a')}
                  </p>
                </div>
                <button 
                  onClick={() => setIsDetailOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {/* Left Column - Order Items */}
                <div className="md:col-span-2">
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Order Items</h4>
                    <div className="space-y-3 md:space-y-4">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-gray-200 pb-3 md:pb-4">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                          </div>
                          <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 md:pt-4">
                        <div className="font-bold text-base md:text-lg">Total</div>
                        <div className="font-bold text-base md:text-lg">₹{selectedOrder.total.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    {selectedOrder.notes && (
                      <div className="mt-4 md:mt-6">
                        <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">Order Notes</h4>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 md:p-4">
                          <p className="text-gray-700">{selectedOrder.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Refund Section */}
                  {selectedOrder.status === 'refund-requested' && (
                    <div className="mt-4 md:mt-6 bg-red-50 rounded-xl p-4 md:p-6">
                      <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Refund Request</h4>
                      <div className="mb-3 md:mb-4">
                        <p className="font-medium">Reason:</p>
                        <p className="text-gray-700">{selectedOrder.refundReason}</p>
                      </div>
                      <div className="mb-3 md:mb-4">
                        <p className="font-medium">Requested Amount:</p>
                        <p className="text-gray-700">₹{selectedOrder.refundAmount.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                          onClick={() => {
                            setRefundReason(selectedOrder.refundReason);
                            setRefundAmount(selectedOrder.refundAmount);
                            updateOrderStatus(selectedOrder.id, 'refunded');
                          }}
                          className="px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 text-sm"
                        >
                          Approve Refund
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                          className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 text-sm"
                        >
                          Reject Request
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Right Column - Order Info */}
                <div>
                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Customer Information</h4>
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Name</p>
                        <p className="font-medium text-sm md:text-base">{selectedOrder.customer.name}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Phone</p>
                        <p className="font-medium text-sm md:text-base">{selectedOrder.customer.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Email</p>
                        <p className="font-medium text-sm md:text-base">{selectedOrder.customer.email}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Address</p>
                        <p className="font-medium text-sm md:text-base">{selectedOrder.customer.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Info */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Order Information</h4>
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Vendor</p>
                        <p className="font-medium text-sm md:text-base">{selectedOrder.vendor}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium text-sm md:text-base">{selectedOrder.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-500">Order Status</p>
                        <div className="mt-1">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusInfo(selectedOrder.status).color}`}>
                            {getStatusInfo(selectedOrder.status).label}
                          </span>
                        </div>
                      </div>
                      {selectedOrder.deliveryStaff && (
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Delivery Staff</p>
                          <p className="font-medium text-sm md:text-base">{selectedOrder.deliveryStaff}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Order Actions</h4>
                    
                    {/* Status Actions */}
                    <div className="mb-4 md:mb-6">
                      <p className="text-xs md:text-sm text-gray-500 mb-2">Update Status</p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'preparing')}
                          disabled={selectedOrder.status !== 'pending'}
                          className={`px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm rounded-lg ${
                            selectedOrder.status !== 'pending' 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          }`}
                        >
                          Preparing
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'out-for-delivery')}
                          disabled={selectedOrder.status !== 'preparing'}
                          className={`px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm rounded-lg ${
                            selectedOrder.status !== 'preparing' 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                          }`}
                        >
                          Out for Delivery
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'delivered')}
                          disabled={selectedOrder.status !== 'out-for-delivery'}
                          className={`px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm rounded-lg ${
                            selectedOrder.status !== 'out-for-delivery' 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          Delivered
                        </button>
                        <button
                          onClick={() => updateOrderStatus(selectedOrder.id, 'canceled')}
                          disabled={selectedOrder.status === 'delivered' || selectedOrder.status === 'canceled'}
                          className={`px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm rounded-lg ${
                            selectedOrder.status === 'delivered' || selectedOrder.status === 'canceled'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                    
                    {/* Assign Delivery */}
                    {selectedOrder.status === 'preparing' && (
                      <div className="mb-4 md:mb-6">
                        <p className="text-xs md:text-sm text-gray-500 mb-2">Assign Delivery Staff</p>
                        <select
                          value={selectedOrder.deliveryStaff || ''}
                          onChange={(e) => assignDeliveryStaff(selectedOrder.id, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="">Select delivery staff</option>
                          {deliveryStaff
                            .filter(staff => staff.status === 'available')
                            .map(staff => (
                              <option key={staff.id} value={staff.name}>{staff.name}</option>
                            ))}
                        </select>
                      </div>
                    )}
                    
                    {/* Refund Section */}
                    {(selectedOrder.status === 'delivered' || selectedOrder.status === 'canceled') && (
                      <div>
                        <p className="text-xs md:text-sm text-gray-500 mb-2">Process Refund</p>
                        <div className="space-y-2">
                          <div>
                            <input
                              type="text"
                              placeholder="Refund reason"
                              value={refundReason}
                              onChange={(e) => setRefundReason(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              placeholder="Refund amount"
                              value={refundAmount}
                              onChange={(e) => setRefundAmount(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <button
                            onClick={processRefund}
                            disabled={!refundReason || !refundAmount}
                            className={`w-full py-2 rounded-lg text-sm ${
                              !refundReason || !refundAmount
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                          >
                            Process Refund
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;