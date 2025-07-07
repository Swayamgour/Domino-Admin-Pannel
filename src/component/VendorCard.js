import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch'
import { useActiveFrenchiesMutation } from '../redux/api'
import CircularProgress from '@mui/material/CircularProgress'

const VendorCard = ({ data }) => {
  const vendors = data?.data || []

  const [open, setOpen] = useState(false)
  const [checked, setChecked] = React.useState(true)
  const [updateAdmin, result] = useActiveFrenchiesMutation()
  const [loadingId, setLoadingId] = useState(null)

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

  //   console.log()

  // Function to get status color
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

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {vendors.map(frenchie => (
            <div
              key={frenchie._id}
              className='bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1'
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
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                      />
                    </svg>
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
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    <span className='text-gray-700'>
                      {frenchie.city}, {frenchie.state}
                    </span>
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
                        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                      />
                    </svg>
                    <span className='text-gray-700'>
                      ₹{frenchie.salesCount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Joined Date */}
                <div className='flex items-center text-sm text-gray-500 mb-4'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  Joined:{' '}
                  {new Date(frenchie.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 mt-4'>
                  {/* <button
                    onClick={() => setOpen(true)}
                    className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-lg hover:bg-green-100 transition-all'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                      />
                    </svg>
                    Edit
                  </button> */}
                  {/* <button className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-all'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                    Delete
                  </button> */}

                  {/* {console.log(frenchie?.frenchiesID)} */}

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
                      ) // Small loader
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
        {vendors?.length === 0 && (
          <div className='bg-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto'>
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
              No Vendors Found
            </h3>
            <p className='text-gray-600 mb-6'>
              It looks like there are no vendors in your system yet. Add your
              first vendor to get started!
            </p>
            <button className='px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all'>
              Add New Vendor
            </button>
          </div>
        )}
      </div>

      {/* <from>
        <div>
          <label className='block text-gray-700 mb-2'>Address</label>
          <input
            type='text'
            name='Address'
            // value={editingVendor.Address}
            // onChange={handleInputChange}
            className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
            required
          />
        </div>
      </from> */}
    </div>
  )
}

export default VendorCard
