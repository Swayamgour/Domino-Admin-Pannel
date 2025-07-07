// src/components/FranchiseDashboard.js
import React from 'react';

const FranchiseDashboard = ({ onSelectFranchise }) => {
  const franchises = [
    {
      id: 'FR-001',
      name: 'Pizza Corner',
      owner: 'Rahul Sharma',
      city: 'Kanpur',
      state: 'Uttar Pradesh',
      status: 'Active',
      orders: 42,
      sales: 128500,
      rating: 4.7,
      lastOrder: '2 hours ago',
      isPremium: true
    },
    {
      id: 'FR-002',
      name: 'Bakery Delight',
      owner: 'Priya Singh',
      city: 'Delhi',
      state: 'Delhi',
      status: 'Active',
      orders: 28,
      sales: 98200,
      rating: 4.5,
      lastOrder: '5 hours ago',
      isPremium: false
    },
    {
      id: 'FR-003',
      name: 'Spice Market',
      owner: 'Raj Patel',
      city: 'Mumbai',
      state: 'Maharashtra',
      status: 'Pending',
      orders: 15,
      sales: 56700,
      rating: 4.2,
      lastOrder: '1 day ago',
      isPremium: true
    },
    {
      id: 'FR-004',
      name: 'Tech Cafe',
      owner: 'Ananya Reddy',
      city: 'Bangalore',
      state: 'Karnataka',
      status: 'Active',
      orders: 36,
      sales: 115800,
      rating: 4.8,
      lastOrder: '3 hours ago',
      isPremium: false
    },
    {
      id: 'FR-005',
      name: 'Book Haven',
      owner: 'Vikram Kumar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      status: 'Inactive',
      orders: 12,
      sales: 38700,
      rating: 4.0,
      lastOrder: '1 week ago',
      isPremium: false
    },
    {
      id: 'FR-006',
      name: 'Fresh Mart',
      owner: 'Sneha Gupta',
      city: 'Hyderabad',
      state: 'Telangana',
      status: 'Active',
      orders: 53,
      sales: 164300,
      rating: 4.9,
      lastOrder: '1 hour ago',
      isPremium: true
    }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Franchises</h2>
          <p className="text-gray-600 mt-1">Manage your franchise network efficiently</p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
            <i className="fas fa-plus mr-2"></i> Add Franchise
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center">
            <i className="fas fa-filter mr-2"></i> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {franchises.map((franchise) => (
          <div 
            key={franchise.id}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => onSelectFranchise(franchise)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-bold text-gray-900">{franchise.name}</h3>
                    {franchise.isPremium && (
                      <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{franchise.owner}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  franchise.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : franchise.status === 'Pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {franchise.status}
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-xl font-bold text-gray-900">{franchise.orders}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <p className="text-xl font-bold text-gray-900">₹{franchise.sales.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{franchise.city}, {franchise.state}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < Math.floor(franchise.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      ></i>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{franchise.rating}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Last Order</p>
                  <p className="text-sm font-medium">{franchise.lastOrder}</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                  View Details <i className="fas fa-chevron-right ml-2 text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FranchiseDashboard;