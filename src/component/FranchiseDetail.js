// src/components/FranchiseDetail.js
import React from 'react';

const FranchiseDetail = ({ franchise, onBack }) => {
  const orders = [
    { id: 'ORD-001', date: '2023-07-15', items: 5, amount: 2500, status: 'Delivered' },
    { id: 'ORD-002', date: '2023-07-14', items: 3, amount: 1500, status: 'Delivered' },
    { id: 'ORD-003', date: '2023-07-13', items: 8, amount: 4200, status: 'Processing' },
    { id: 'ORD-004', date: '2023-07-12', items: 2, amount: 900, status: 'Delivered' },
    { id: 'ORD-005', date: '2023-07-11', items: 6, amount: 3200, status: 'Cancelled' },
  ];

  const stats = [
    { name: 'Total Orders', value: franchise.orders, change: '+12%', changeType: 'positive' },
    { name: 'Total Revenue', value: `₹${franchise.sales.toLocaleString()}`, change: '+18%', changeType: 'positive' },
    { name: 'Avg. Order Value', value: '₹1,850', change: '+5%', changeType: 'positive' },
    { name: 'Customer Rating', value: franchise.rating, change: '+0.2', changeType: 'positive' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with back button */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4">
        <button 
          onClick={onBack}
          className="text-white hover:text-gray-200 flex items-center"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Franchises
        </button>
      </div>
      
      {/* Franchise Info */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center text-gray-500">
              <i className="fas fa-store text-3xl"></i>
            </div>
            
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900">{franchise.name}</h2>
              <p className="text-gray-600 mt-1">{franchise.owner}</p>
              
              <div className="mt-4 flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star ${i < Math.floor(franchise.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    ></i>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{franchise.rating} (128 reviews)</span>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-phone text-indigo-600 mr-3"></i>
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-envelope text-indigo-600 mr-3"></i>
                    <span>contact@{franchise.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-indigo-600 mr-3"></i>
                    <span>{franchise.city}, {franchise.state}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 md:pl-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className={`ml-2 text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Orders Table */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  View All <i className="fas fa-chevron-right ml-1 text-sm"></i>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'Processing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Charts Placeholder */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Overview</h3>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <i className="fas fa-chart-bar text-4xl mb-3"></i>
                  <p>Sales and Order Charts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="relative pl-8 border-l-2 border-indigo-200 space-y-6">
            <div className="relative">
              <div className="absolute -left-3.5 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-indigo-800">Order ORD-005 marked as completed</p>
                <p className="text-xs text-gray-500 mt-1">Today at 10:30 AM</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-3.5 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                <i className="fas fa-shopping-cart text-white text-xs"></i>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800">New order received - ORD-006</p>
                <p className="text-xs text-gray-500 mt-1">Yesterday at 4:45 PM</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-3.5 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-xs"></i>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Staff member added - Priya Sharma</p>
                <p className="text-xs text-gray-500 mt-1">July 12, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="bg-gray-50 px-6 py-4 flex justify-between border-t border-gray-200">
        <div>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-3">
            <i className="fas fa-download mr-2"></i> Export Data
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg">
            <i className="fas fa-print mr-2"></i> Print Report
          </button>
        </div>
        <div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mr-3">
            <i className="fas fa-ban mr-2"></i> Deactivate
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
            <i className="fas fa-edit mr-2"></i> Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FranchiseDetail;