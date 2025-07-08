// import React from 'react'
// import { useGetOrderByfrenchieQuery } from '../redux/api'

// function FrencieOrder () {
//   const { data } = useGetOrderByfrenchieQuery()

//   console.log(data?.data)

//   return <div>FrencieOrder</div>
// }

// export default FrencieOrder

// src/components/OrderDashboard.js
import React from 'react'
import OrderCard from '../component/OrderCard'
import StatsCard from '../component/StatsCard'
import { useGetOrderByfrenchieQuery } from '../redux/api'
// import { useSelector } from 'react-redux'

const FrencieOrder = () => {
  const { data } = useGetOrderByfrenchieQuery()

  const stats = [
    { title: 'Total Orders', value: 42, change: '+12%', positive: true },
    { title: 'Pending Orders', value: 8, change: '-3%', positive: false },
    { title: 'Revenue', value: '₹24,850', change: '+18%', positive: true },
    { title: 'Avg. Order Value', value: '₹750', change: '+5%', positive: true }
  ]



  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Header */}
      <header className='flex flex-col md:flex-row justify-between items-center mb-10'>
        <div className='flex items-center mb-6 md:mb-0'>
          <div className='bg-indigo-600 text-white p-3 rounded-xl shadow-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
          </div>
          <div className='ml-4'>
            <h1 className='text-3xl font-bold text-gray-800'>
              Order Dashboard
            </h1>
            <p className='text-gray-500'>Manage all your orders in one place</p>
          </div>
        </div>

        <div className='flex space-x-3'>
          <button className='bg-white p-3 rounded-xl shadow hover:shadow-md transition-shadow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
          </button>
          <button className='bg-white p-3 rounded-xl shadow hover:shadow-md transition-shadow'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </button>
          <button className='bg-white p-3 rounded-xl shadow hover:shadow-md transition-shadow flex items-center'>
            <div className='bg-indigo-100 text-indigo-800 rounded-full w-8 h-8 flex items-center justify-center font-medium'>
              AS
            </div>
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            positive={stat.positive}
          />
        ))}
      </div>

      {/* Orders Section */}
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
        <div className='px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center'>
          <h2 className='text-xl font-bold text-gray-800 mb-4 md:mb-0'>
            Recent Orders
          </h2>
          <div className='flex flex-wrap gap-2'>
            <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium'>
              All Orders
            </button>
            <button className='bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50'>
              Pending
            </button>
            <button className='bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50'>
              Completed
            </button>
            <button className='bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4 mr-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
                />
              </svg>
              Filters
            </button>
          </div>
        </div>

        <div className='divide-y divide-gray-100'>
          {data?.data?.map(order => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className='mt-10 text-center text-gray-500 text-sm'>
        <p>© 2025 Order Dashboard. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default FrencieOrder
