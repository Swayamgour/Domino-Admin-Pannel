import React, { useState } from 'react'
import { useGetCurrentUserQuery } from '../redux/api'

const ProfilePage = () => {
  // User data from API response

  const { data: userData } = useGetCurrentUserQuery()

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    ...userData.message,
    profileImage: '/profile-placeholder.jpg'
  })

  // Format date for display
  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Handle input changes for editing
  const handleInputChange = e => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault()
    setIsEditing(false)
    console.log('Updated profile:', profileData)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
            Business Profile
          </h1>
          <p className='text-gray-600'>Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className='bg-white rounded-2xl shadow-xl overflow-hidden mb-8'>
          <div className='relative'>
            {/* Banner */}
            <div className='h-32 bg-gray-800'></div>

            {/* Profile Section */}
            <div className='px-6 pb-6'>
              <div className='flex flex-col md:flex-row items-center md:items-end -mt-16'>
                {/* Profile Image */}
                <div className='relative'>
                    
                  <img
                    src={'https://imgs.search.brave.com/dZdpbogNh8mudIRhimLEsXDq6Z1k_9dZV_i_20CkhzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Vc2Vy/LVByb2ZpbGUtUE5H/LnBuZw'}
                    alt='Profile'
                    className='w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200'
                  />
                  <button
                    className='absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors'
                    onClick={() => document.getElementById('fileInput').click()}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-gray-700'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                  <input
                    type='file'
                    id='fileInput'
                    className='hidden'
                    accept='image/*'
                  />
                </div>

                {/* Profile Info */}
                <div className='mt-4 md:mt-0 md:ml-6 text-center md:text-left'>
                  <div className='flex flex-col md:flex-row md:items-center'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                      {profileData.frenchieName}
                    </h2>
                    <div className='mt-1 md:mt-0 md:ml-4'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          profileData.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {profileData.status}
                      </span>
                    </div>
                  </div>
                  <p className='text-gray-600 mt-1'>
                    {profileData.frenchiesID}
                  </p>
                  <p className='text-gray-600 flex items-center justify-center md:justify-start mt-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {profileData.city}, {profileData.state}
                  </p>
                </div>

                {/* Action Button */}
                <div className='mt-4 md:mt-0 md:ml-auto'>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className='px-4 py-2 bg-gray-800 text-white rounded-lg '
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
          <h3 className='text-xl font-bold text-gray-800 mb-6'>
            Profile Information
          </h3>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Business Name
                  </label>
                  <input
                    type='text'
                    name='frenchieName'
                    value={profileData.frenchieName}
                    onChange={handleInputChange}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Frenchies ID
                  </label>
                  <input
                    type='text'
                    name='frenchiesID'
                    value={profileData.frenchiesID}
                    onChange={handleInputChange}
                    className='w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed'
                    disabled
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={profileData.email}
                    onChange={handleInputChange}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Phone
                  </label>
                  <input
                    type='text'
                    name='phone'
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent'
                  />
                </div>

                <div className='md:col-span-2'>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Address
                  </label>
                  <input
                    type='text'
                    name='address'
                    value={profileData.address}
                    onChange={handleInputChange}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    value={profileData.city}
                    onChange={handleInputChange}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    State
                  </label>
                  <input
                    type='text'
                    name='state'
                    value={profileData.state}
                    onChange={handleInputChange}
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Account Status
                  </label>
                  <div className='w-full p-3 bg-gray-100 rounded-lg'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        profileData.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {profileData.status}
                    </span>
                  </div>
                </div>

                <div>
                  <label className='block text-gray-700 font-medium mb-2'>
                    Account Type
                  </label>
                  <div className='w-full p-3 bg-gray-100 rounded-lg'>
                    <span className='capitalize'>{profileData.role}</span>
                  </div>
                </div>
              </div>

              <div className='flex justify-end mt-8 space-x-4'>
                <button
                  type='button'
                  onClick={() => setIsEditing(false)}
                  className='px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-6 py-3  bg-gray-800 text-white font-medium rounded-lg '
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <p className='text-gray-500 text-sm'>Frenchies ID</p>
                <p className='text-gray-800 font-medium'>
                  {profileData.frenchiesID}
                </p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Business Name</p>
                <p className='text-gray-800 font-medium'>
                  {profileData.frenchieName}
                </p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Email Address</p>
                <p className='text-gray-800 font-medium'>{profileData.email}</p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Phone Number</p>
                <p className='text-gray-800 font-medium'>{profileData.phone}</p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Account Status</p>
                <p className='text-gray-800 font-medium flex items-center'>
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      profileData.status === 'Approved'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  ></span>
                  {profileData.status}
                </p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Account Type</p>
                <p className='text-gray-800 font-medium capitalize'>
                  {profileData.role}
                </p>
              </div>

              <div className='md:col-span-2'>
                <p className='text-gray-500 text-sm'>Address</p>
                <p className='text-gray-800 font-medium'>
                  {profileData.address}
                </p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>City</p>
                <p className='text-gray-800 font-medium'>{profileData.city}</p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>State</p>
                <p className='text-gray-800 font-medium'>{profileData.state}</p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Account Created</p>
                <p className='text-gray-800 font-medium'>
                  {formatDate(profileData.createdAt)}
                </p>
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Last Updated</p>
                <p className='text-gray-800 font-medium'>
                  {formatDate(profileData.updatedAt)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
