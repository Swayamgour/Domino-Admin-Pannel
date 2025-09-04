import React from 'react';
import { HiArrowNarrowRight, HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi';

const TopPerformingStores = () => {
  // Sample data for demonstration
  const dashboardData = {
    topStores: [
      { id: 1, name: 'Downtown Store', orders: 342, revenue: '₹ 12,402', trend: 'up' },
      { id: 2, name: 'Westside Mall', orders: 267, revenue: '₹ 8,943', trend: 'up' },
      { id: 3, name: 'East Village', orders: 189, revenue: '₹ 7,235', trend: 'down' },
      { id: 4, name: 'Central Plaza', orders: 412, revenue: '₹ 15,678', trend: 'up' },
      { id: 5, name: 'Northside Outlet', orders: 298, revenue: '₹ 9,876', trend: 'up' },
    ]
  };

  return (
    <div className='bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-md m-6'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5'>
        <h2 className='text-lg font-bold text-gray-800'>
          Top Performing Stores
        </h2>
        {/* <button className='mt-3 sm:mt-0 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300 flex items-center'>
          View All Stores
          <HiArrowNarrowRight className='h-4 w-4 ml-2' />
        </button> */}
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='text-left text-gray-500 text-sm'>
              <th className='pb-3 font-medium'>Store</th>
              <th className='pb-3 font-medium'>Orders</th>
              <th className='pb-3 font-medium'>Revenue</th>
              <th className='pb-3 font-medium'>Status</th>
              <th className='pb-3 font-medium'>Trend</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.topStores.map((store) => (
              <tr
                key={store.id}
                className='border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150'
              >
                <td className='py-3.5 font-medium text-gray-900'>
                  {store.name}
                </td>
                <td className='py-3.5'>{store.orders}</td>
                <td className='py-3.5'>{store.revenue}</td>
                <td className='py-3.5'>
                  <span className='px-2.5 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium'>
                    Active
                  </span>
                </td>
                <td className='py-3.5'>
                  {store.trend === 'up' ? (
                    <span className='flex items-center text-green-600'>
                      <HiArrowSmUp className='h-4 w-4 mr-1' />
                      8.2%
                    </span>
                  ) : (
                    <span className='flex items-center text-red-600'>
                      <HiArrowSmDown className='h-4 w-4 mr-1' />
                      3.5%
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPerformingStores;