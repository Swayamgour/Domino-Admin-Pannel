import React, { useState, useEffect } from 'react'
import { useGetAllVenderQuery } from '../redux/api'
import { useNavigate } from 'react-router-dom'

const OrderDashboard = () => {
  const { data: AllVender, isSuccess } = useGetAllVenderQuery({
    page: 1,
    limit: 10
  })
  // Sample data

  let initialData = (isSuccess && AllVender?.data) || []

  const Navigate = useNavigate()

  const [data, setData] = useState(initialData || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [activeFilter, setActiveFilter] = useState('all')

  // Filter data based on search term and filters
  const filteredData = data.filter(item => {
    const matchesSearch =
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.frenchieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    const matchesActive =
      activeFilter === 'all' ||
      (activeFilter === 'active' && item.isActivated) ||
      (activeFilter === 'inactive' && !item.isActivated)

    return matchesSearch && matchesStatus && matchesActive
  })

  // Sort data
  useEffect(() => {
    if (isSuccess) {
      const sortedData = [...initialData]

      if (sortBy === 'newest') {
        sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (sortBy === 'oldest') {
        sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      } else if (sortBy === 'salesHigh') {
        sortedData.sort((a, b) => b.salesCount - a.salesCount)
      } else if (sortBy === 'salesLow') {
        sortedData.sort((a, b) => a.salesCount - b.salesCount)
      }

      setData(sortedData)
    }
  }, [sortBy, isSuccess , initialData])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <header className='mb-10'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div>
              <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
                Order Dashboard
              </h1>
              <p className='text-gray-600 mt-2'>
                Manage all your orders and franchises in one place
              </p>
            </div>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  placeholder='Search by city, owner, name or trade...'
                  className='w-full md:w-80 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              {/* <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center transition duration-200 shadow-md'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-1.5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                    clipRule='evenodd'
                  />
                </svg>
                New Order
              </button> */}
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Total Franchises
                </p>
                <h3 className='text-2xl font-bold text-gray-900 mt-1'>24</h3>
              </div>
              <div className='bg-blue-100 p-3 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-blue-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                  />
                </svg>
              </div>
            </div>
            <p className='text-green-600 text-sm font-medium mt-3'>
              <span className='inline-flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                12% from last month
              </span>
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Total Orders
                </p>
                <h3 className='text-2xl font-bold text-gray-900 mt-1'>327</h3>
              </div>
              <div className='bg-green-100 p-3 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-green-600'
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
            </div>
            <p className='text-green-600 text-sm font-medium mt-3'>
              <span className='inline-flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                8% from last month
              </span>
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>
                  Active Franchises
                </p>
                <h3 className='text-2xl font-bold text-gray-900 mt-1'>18</h3>
              </div>
              <div className='bg-purple-100 p-3 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-purple-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>
              </div>
            </div>
            <p className='text-red-600 text-sm font-medium mt-3'>
              <span className='inline-flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                3% from last month
              </span>
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500'>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-gray-500 text-sm font-medium'>Avg. Sales</p>
                <h3 className='text-2xl font-bold text-gray-900 mt-1'>
                  ₹65,420
                </h3>
              </div>
              <div className='bg-amber-100 p-3 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 text-amber-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
            </div>
            <p className='text-green-600 text-sm font-medium mt-3'>
              <span className='inline-flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
                15% from last month
              </span>
            </p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div className='flex flex-wrap gap-3'>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  statusFilter === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setStatusFilter('all')}
              >
                All Status
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center ${
                  statusFilter === 'Approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setStatusFilter('Approved')}
              >
                <span className='w-2 h-2 rounded-full bg-green-500 mr-2'></span>
                Approved
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center ${
                  statusFilter === 'Pending'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setStatusFilter('Pending')}
              >
                <span className='w-2 h-2 rounded-full bg-amber-500 mr-2'></span>
                Pending
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center ${
                  statusFilter === 'Rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setStatusFilter('Rejected')}
              >
                <span className='w-2 h-2 rounded-full bg-red-500 mr-2'></span>
                Rejected
              </button>
            </div>

            <div className='flex flex-wrap gap-3'>
              <div className='relative'>
                <select
                  className='appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full'
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value='newest'>Newest First</option>
                  <option value='oldest'>Oldest First</option>
                  <option value='salesHigh'>Sales: High to Low</option>
                  <option value='salesLow'>Sales: Low to High</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg
                    className='fill-current h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>

              <div className='flex rounded-lg overflow-hidden border border-gray-300'>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === 'active'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('active')}
                >
                  Active
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeFilter === 'inactive'
                      ? 'bg-gray-600 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                  onClick={() => setActiveFilter('inactive')}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Cards */}
        {isSuccess && filteredData?.length === 0 ? (
          <div className='bg-white rounded-xl shadow-md p-12 text-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 mx-auto text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <h3 className='text-xl font-medium text-gray-900 mt-4'>
              No orders found
            </h3>
            <p className='text-gray-500 mt-2'>
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <button
              className='mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200'
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
                setActiveFilter('all')
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredData?.map(item => (
              <div
                key={item._id}
                onClick={() =>
                  Navigate('/OrderManagementSystem', {
                    state: {
                      itemId: item?._id ,  // or just item if you need full object
                      freDetail: item
                    }
                  })
                }
                className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100'
              >
                <div className='p-6'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <div className='flex items-center'>
                        <h3 className='text-xl font-bold text-gray-900 truncate max-w-[180px]'>
                          {item.frenchieName}
                        </h3>
                        {item.isActivated ? (
                          <span className='ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full'>
                            Active
                          </span>
                        ) : (
                          <span className='ml-2 px-2 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded-full'>
                            Inactive
                          </span>
                        )}
                      </div>
                      <p className='text-gray-500 text-sm mt-1'>
                        ID: {item.frenchiesID}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>

                  <div className='mt-5 space-y-3'>
                    <div className='flex items-center'>
                      <div className='bg-gray-100 p-2 rounded-lg mr-3'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5 text-gray-600'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500'>Owner</p>
                        <p className='font-medium'>{item.ownerName}</p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='bg-gray-100 p-2 rounded-lg mr-3'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5 text-gray-600'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500'>Location</p>
                        <p className='font-medium'>
                          {item.city}, {item.state}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center'>
                      <div className='bg-gray-100 p-2 rounded-lg mr-3'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5 text-gray-600'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                        >
                          <path
                            fillRule='evenodd'
                            d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500'>Trade</p>
                        <p className='font-medium capitalize'>{item.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className='mt-6 pt-5 border-t border-gray-100'>
                    <div className='flex justify-between'>
                      <div>
                        <p className='text-xs text-gray-500'>Orders</p>
                        <p className='font-medium'>
                          {item.orders?.length || 0}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500'>Sales</p>
                        <p className='font-medium'>{item.salesCount}</p>
                      </div>
                      <div>
                        <p className='text-xs text-gray-500'>Joined</p>
                        <p className='font-medium'>
                          {new Date(item.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-gray-50 px-6 py-3 flex justify-between items-center'>
                  <button className='text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                      <path
                        fillRule='evenodd'
                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    View Details
                  </button>
                  <button className='text-gray-500 hover:text-gray-700'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDashboard
