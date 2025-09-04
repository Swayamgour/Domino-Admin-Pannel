import React, { useState } from 'react'
import Switch from '@mui/material/Switch'
import { useActiveFrenchiesMutation } from '../redux/api'
import CircularProgress from '@mui/material/CircularProgress'
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineX,
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineCurrencyRupee,
  HiOutlineCalendar
} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const VendorCard = ({ data }) => {
  const Frenchies = data?.data || []
  const [updateAdmin, result] = useActiveFrenchiesMutation()
  const [loadingId, setLoadingId] = useState(null)

  const navigate = useNavigate()

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [cityFilter, setCityFilter] = useState('all')
  const [stateFilter, setStateFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const handleChange = async frenchiesID => {
    setLoadingId(frenchiesID)

    if (!frenchiesID) {
      console.error('Missing frenchiesID!')
      return
    }

    const body = {
      action: 'toggleStatus',
      frenchiesID
    }

    try {
      await updateAdmin(body).unwrap()
      console.log('Status toggled for:', frenchiesID)
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  // Filter Frenchies based on search term and filters
  const filteredFrenchies = Frenchies.filter(Frenchies => {
    // Search term filter
    const matchesSearch =
      searchTerm === '' ||
      Frenchies.frenchieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Frenchies.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Frenchies.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Frenchies.phone.includes(searchTerm) ||
      Frenchies.frenchiesID.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus =
      statusFilter === 'all' ||
      Frenchies.status.toLowerCase() === statusFilter.toLowerCase()

    // City filter
    const matchesCity =
      cityFilter === 'all' ||
      Frenchies.city.toLowerCase() === cityFilter.toLowerCase()

    // State filter
    const matchesState =
      stateFilter === 'all' ||
      Frenchies.state.toLowerCase() === stateFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCity && matchesState
  })

  // Get unique values for filter dropdowns
  const statusOptions = ['all', ...new Set(Frenchies.map(v => v.status.toLowerCase()))]
  const cityOptions = ['all', ...new Set(Frenchies.map(v => v.city).filter(Boolean))]
  const stateOptions = ['all', ...new Set(Frenchies.map(v => v.state).filter(Boolean))]

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setCityFilter('all')
    setStateFilter('all')
  }

  // Check if any filter is active
  const isFilterActive = searchTerm !== '' || statusFilter !== 'all' || cityFilter !== 'all' || stateFilter !== 'all'

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 '>
      <div className='max-w-7xl mx-auto'>
        {/* Search and Filter Header */}
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-6'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            <div className='relative w-full md:w-1/3'>
              <HiOutlineSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <input
                type='text'
                placeholder='Search Frenchies...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              />
            </div>

            <div className='flex gap-2 w-full md:w-auto'>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
              >
                <HiOutlineFilter className='h-5 w-5' />
                Filters
                {isFilterActive && (
                  <span className='bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                    !
                  </span>
                )}
              </button>

              {isFilterActive && (
                <button
                  onClick={clearFilters}
                  className='flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors'
                >
                  <HiOutlineX className='h-5 w-5' />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500'
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500'
                >
                  {cityOptions.map(city => (
                    <option key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>State</label>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500'
                >
                  {stateOptions.map(state => (
                    <option key={state} value={state}>
                      {state === 'all' ? 'All States' : state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className='mb-4 flex justify-between items-center'>
          <p className='text-gray-600'>
            Showing {filteredFrenchies.length} of {Frenchies.length} Frenchies
          </p>

          {isFilterActive && (
            <div className='flex gap-2 flex-wrap'>
              {searchTerm && (
                <span className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className='text-blue-600 hover:text-blue-800'>
                    <HiOutlineX className='h-3 w-3' />
                  </button>
                </span>
              )}
              {statusFilter !== 'all' && (
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
                  Status: {statusFilter}
                  <button onClick={() => setStatusFilter('all')} className='text-green-600 hover:text-green-800'>
                    <HiOutlineX className='h-3 w-3' />
                  </button>
                </span>
              )}
              {cityFilter !== 'all' && (
                <span className='bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
                  City: {cityFilter}
                  <button onClick={() => setCityFilter('all')} className='text-purple-600 hover:text-purple-800'>
                    <HiOutlineX className='h-3 w-3' />
                  </button>
                </span>
              )}
              {stateFilter !== 'all' && (
                <span className='bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full flex items-center gap-1'>
                  State: {stateFilter}
                  <button onClick={() => setStateFilter('all')} className='text-orange-600 hover:text-orange-800'>
                    <HiOutlineX className='h-3 w-3' />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Frenchies Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredFrenchies.map(frenchie => (
            <div
              key={frenchie._id}
              className='bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1'
              onClick={() => navigate('/OrderManagementSystem')}
            >
              {/* Card Header with Gradient */}
              <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-5'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <div className='bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center'>
                      {frenchie.logo ? (
                        <img
                          src={frenchie.logo}
                          alt={frenchie.frenchieName}
                          className='w-full h-full object-cover rounded-xl'
                        />
                      ) : (
                        <div className='text-white text-2xl'>
                          {frenchie.frenchieName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className='ml-4'>
                      <h2 className='text-xl font-bold text-white'>
                        {frenchie.frenchieName}
                      </h2>
                      <p className='text-indigo-200 text-sm'>
                        ID: {frenchie.frenchiesID}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusColor(
                      frenchie.status
                    )}`}
                  >
                    {frenchie.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className='p-5'>
                {/* Owner Info */}
                <div className='flex items-center mb-4'>
                  <div className='bg-gray-200 border-2 border-dashed rounded-full w-10 h-10 flex items-center justify-center'>
                    <HiOutlineUser className='h-5 w-5 text-gray-500' />
                  </div>
                  <div className='ml-3'>
                    <h3 className='font-medium text-gray-900'>
                      {frenchie.ownerName}
                    </h3>
                    <p className='text-sm text-gray-500'>Owner</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className='grid grid-cols-2 gap-3 mb-4'>
                  <div className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-indigo-500 mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                      />
                    </svg>
                    <span className='text-gray-700'>{frenchie.phone}</span>
                  </div>
                  <div className='flex items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-indigo-500 mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                    <span className='text-gray-700 truncate'>
                      {frenchie.email}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <HiOutlineLocationMarker className='h-5 w-5 text-indigo-500 mr-2' />
                    <span className='text-gray-700'>
                      {frenchie.city}, {frenchie.state}
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <HiOutlineCurrencyRupee className='h-5 w-5 text-indigo-500 mr-2' />
                    <span className='text-gray-700'>
                      ₹{frenchie.salesCount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Joined Date */}
                <div className='flex items-center text-sm text-gray-500 mb-4'>
                  <HiOutlineCalendar className='h-4 w-4 mr-2' />
                  Joined:{' '}
                  {new Date(frenchie.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 mt-4'>
                  <div className='flex flex-1 justify-center items-center space-x-2'>
                    {result?.isLoading ? (
                      loadingId === frenchie.frenchiesID ? (
                        <CircularProgress size={18} color='inherit' />
                      ) : (
                        <>
                          <p className='text-[15px]'>Active</p>
                          <Switch
                            checked={frenchie?.isActivated}
                            onChange={() => handleChange(frenchie.frenchiesID)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        </>
                      )
                    ) : (
                      <>
                        <p className='text-[15px]'>Active</p>
                        <Switch
                          checked={frenchie?.isActivated}
                          onChange={() => handleChange(frenchie.frenchiesID)}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFrenchies.length === 0 && (
          <div className='bg-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto mt-8'>
            <div className='mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-indigo-500'
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
            <h3 className='text-xl font-bold text-gray-800 mb-2'>
              {Frenchies.length === 0 ? 'No Frenchies Found' : 'No Matching Frenchies'}
            </h3>
            <p className='text-gray-600 mb-6'>
              {Frenchies.length === 0
                ? 'It looks like there are no Frenchies in your system yet. Add your first Frenchies to get started!'
                : 'Try adjusting your search or filters to find what you\'re looking for.'
              }
            </p>
            {isFilterActive && (
              <button
                onClick={clearFilters}
                className='px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all mr-3'
              >
                Clear All Filters
              </button>
            )}
            <button className='px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all'>
              Add New Frenchies
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VendorCard