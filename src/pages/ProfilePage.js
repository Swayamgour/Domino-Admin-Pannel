import React, { useState } from 'react'
// import { motion } from 'framer-motion';
import ProfileEdit from '../component/ProfileEdit'
import ChangePassword from '../component/ChangePassword'
import { useGetCurrentUserQuery } from '../redux/api'
import ProfileImageUpdate from '../component/ProfileImageUpdate'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [passwordForm, setPasswordForm] = useState(false)
  const [editProfile, setEditProfile] = useState(false)

  // User data
  // const userData = {
  //   phone: '6392601692',
  //   role: 'superAdmin',
  //   name: 'SwayamGour',
  //   email: 'goura0775@gmail.com',
  //   createdAt: '2025-07-08T06:18:24.950Z',
  //   updatedAt: '2025-07-08T07:39:11.130Z',
  //   frenchies: [],
  //   userId: '686cb830ba0f9abf8463835b',
  //   status: 'active',
  //   lastLogin: '2025-07-08T07:39:11.130Z'
  // }

  const { data: userDetail } = useGetCurrentUserQuery()
  let userData = userDetail?.data
  // console.log(userData)

  console.log(userDetail)

  // Format dates
  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Stats data
  const stats = [
    { label: 'Total Frenchies', value: 12 },
    { label: 'Total Order', value: 5 },
    { label: 'Completed Order', value: 24 },
    { label: 'Pending Order', value: 8 }
  ]

  // Activity data
  const activities = [
    { id: 1, action: 'Logged in', time: '2025-07-08T07:39:11.130Z' },
    { id: 2, action: 'Updated profile', time: '2025-07-08T06:45:22.130Z' },
    { id: 3, action: 'Created new project', time: '2025-07-07T14:22:18.130Z' }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4 sm:px-6'>
      <ProfileEdit setEditProfile={setEditProfile} editProfile={editProfile} />
      <ChangePassword
        setPasswordForm={setPasswordForm}
        passwordForm={passwordForm}
      />
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Left Sidebar */}
          <div className='lg:w-1/3'>
            <div
              className='bg-white rounded-2xl shadow-lg overflow-hidden'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Profile Header */}
              {/* <div className='bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center relative'>
                <div className='absolute top-0 left-0 w-full h-full opacity-10'>
                  <div className='pattern-dots pattern-blue-500 pattern-bg-transparent pattern-opacity-100 pattern-size-4' />
                </div>

                <div className='relative z-10'>
                  <div className="mx-auto bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-full w-32 h-32 flex items-center justify-center mb-4 relative">
                    <div className="bg-indigo-100 border-2 border-dashed border-indigo-300 rounded-full w-24 h-24 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://imgs.search.brave.com/kvBPNeUD--wsOXJnz_SVUDkwLDDopfdeKoa8NdFBybw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzY0LzIxLzEx/LzM2MF9GXzM2NDIx/MTE0N18xcWdMVnh2/MVRjcTBPaHozRmF3/VWZydE9Oeno4bnEz/ZS5qcGc"
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    
                    <button
                      className="absolute bottom-4 right-2  p-1 rounded-full shadow  bg-white"
                      onClick={() => alert("Edit image clicked!")}
                    >
                      ✏️
                    </button>
                  </div>

                  <h2 className='text-2xl font-bold text-white'>
                    {userData?.ownerName}
                  </h2>
                  <p className='text-indigo-100 mt-1'>{userData?.email}</p>
                  <div className='mt-3'>
                    <span className='inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1 rounded-full'>
                      {userData?.role.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div> */}

              <ProfileImageUpdate />

              {/* Profile Stats */}
              <div className='p-6'>
                <div className='grid grid-cols-2 gap-4'>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className='bg-indigo-50 p-4 rounded-xl text-center'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    >
                      <p className='text-2xl font-bold text-indigo-700'>
                        {stat.value}
                      </p>
                      <p className='text-xs text-gray-600'>{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Status Indicator */}
                <div className='mt-6 flex items-center justify-between bg-gray-50 p-4 rounded-xl'>
                  <div className='flex items-center'>
                    <div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
                    <span className='text-sm font-medium'>Account Status</span>
                  </div>
                  <span className='text-sm font-semibold text-green-600'>
                    Active
                  </span>
                </div>

                {/* Last Login */}
                {/* <div className='mt-4 text-center text-sm text-gray-500'>
                  Last login: {formatDate(userData?.lastLogin)}
                </div> */}
              </div>
            </div>

            {/* Quick Actions */}

          </div>

          {/* Main Content */}
          <div className='lg:w-2/3'>
            <div
              className='bg-white rounded-2xl shadow-lg overflow-hidden'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* Tabs */}
              <div className='border-b border-gray-200'>
                <nav className='flex px-6'>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === 'profile'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    Profile Information
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === 'activity'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    onClick={() => setActiveTab('activity')}
                  >
                    Activity Log
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === 'settings'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    Settings
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className='p-6'>
                {activeTab === 'profile' && (
                  <div>
                    <h3 className='text-xl font-bold text-gray-800 mb-6'>
                      Personal Information
                    </h3>

                    <div className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100'>
                          <h3 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4 mr-2 text-indigo-500'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Phone Number
                          </h3>
                          <p className='text-lg font-semibold text-gray-800'>
                            {userData?.phone}
                          </p>
                        </div>

                        <div className='bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100'>
                          <h3 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4 mr-2 text-indigo-500'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                              <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                            </svg>
                            Email Address
                          </h3>
                          <p className='text-lg font-semibold text-gray-800 break-all'>
                            {userData?.email}
                          </p>
                        </div>

                        <div className='bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100'>
                          <h3 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4 mr-2 text-indigo-500'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Account Created
                          </h3>
                          <p className='text-lg font-semibold text-gray-800'>
                            {formatDate(userData?.createdAt)}
                          </p>
                        </div>

                        <div className='bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100'>
                          <h3 className='text-sm font-medium text-gray-500 mb-2 flex items-center'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-4 w-4 mr-2 text-indigo-500'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                                clipRule='evenodd'
                              />
                            </svg>
                            Last Updated
                          </h3>
                          <p className='text-lg font-semibold text-gray-800'>
                            {formatDate(userData?.updatedAt)}
                          </p>
                        </div>
                      </div>

                      {/* Frenchies Section */}

                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div>
                    <h3 className='text-xl font-bold text-gray-800 mb-6'>
                      Recent Activity
                    </h3>
                    <div className='space-y-4'>
                      {activities.map((activity, index) => (
                        <div
                          key={activity.id}
                          className='flex items-start p-4 border-b border-gray-100 last:border-0'
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className='bg-indigo-100 p-2 rounded-full mr-4'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-5 w-5 text-indigo-600'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </div>
                          <div className='flex-1'>
                            <p className='font-medium text-gray-800'>
                              {activity.action}
                            </p>
                            <p className='text-sm text-gray-500'>
                              {formatDate(activity.time)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h3 className='text-xl font-bold text-gray-800 mb-6'>
                      Account Settings
                    </h3>
                    <div className='space-y-6'>
                      <div className='bg-gray-50 p-5 rounded-xl'>
                        <h4 className='font-medium text-gray-800 mb-3'>
                          Account Preferences
                        </h4>
                        <div className='space-y-3'>
                          <div className='flex items-center justify-between'>
                            <span className='text-gray-600'>
                              Email Notifications
                            </span>
                            <label className='relative inline-flex items-center cursor-pointer'>
                              <input
                                type='checkbox'
                                className='sr-only peer'
                                defaultChecked
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                          <div className='flex items-center justify-between'>
                            <span className='text-gray-600'>
                              Push Notifications
                            </span>
                            <label className='relative inline-flex items-center cursor-pointer'>
                              <input type='checkbox' className='sr-only peer' />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className='mt-6 bg-white rounded-2xl shadow-lg p-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h3 className='text-lg font-bold text-gray-800 mb-4'>
                Quick Actions
              </h3>
              <div className='space-y-3'>
                <button
                  onClick={() => setEditProfile(true)}
                  className='w-full flex items-center justify-between py-3 px-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors'
                >
                  <span className='font-medium text-gray-700'>
                    Edit Profile
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-indigo-600'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                  </svg>
                </button>
                <button
                  onClick={() => setPasswordForm(true)}
                  className='w-full flex items-center justify-between py-3 px-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors'
                >
                  <span className='font-medium text-gray-700'>
                    Change Password
                  </span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-indigo-600'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
