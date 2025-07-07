import React, { useState } from 'react'
import { useGetCurrentUserQuery } from '../redux/api'
import {
  HiCamera,
  HiLocationMarker,
  HiLockClosed,
  HiOutlinePencil,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineGlobe,
  HiOutlineCalendar,
  HiOutlineKey
} from 'react-icons/hi'
// import { BsCrosshair2 } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import ChangePassword from '../component/ChangePassword'
import ProfileEdit from '../component/ProfileEdit'

const ProfilePage = () => {
  const { data: userData } = useGetCurrentUserQuery()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [profileData, setProfileData] = useState({
    ...userData?.data,
    profileImage:
      'https://imgs.search.brave.com/dZdpbogNh8mudIRhimLEsXDq6Z1k_9dZV_i_20CkhzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Vc2Vy/LVByb2ZpbGUtUE5H/LnBuZw'
  })

  // Password update state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = e => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
    if (passwordError) setPasswordError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsEditing(false)
    console.log('Updated profile:', profileData)
  }

  const handlePasswordSubmit = e => {
    e.preventDefault()

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setPasswordError('All fields are required')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }

    console.log('Password update data:', {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    })

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setPasswordError('')
    setPasswordSuccess('Password updated successfully!')

    setTimeout(() => setPasswordSuccess(''), 3000)
  }

  console.log(profileData?.data)

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        {/* <div className='text-center mb-10'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
            Business Profile
          </h1>
          <p className='text-gray-600 max-w-md mx-auto'>
            Manage your account information and settings
          </p>
        </div> */}

        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Profile Card (Left Sidebar) */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
              <div className='relative'>
                {/* Banner */}
                <div className='h-32 bg-gradient-to-r from-blue-500 to-indigo-600'></div>

                {/* Profile Content */}
                <div className='px-6 pb-8 -mt-16'>
                  <div className='flex justify-center'>
                    <div className='relative group'>
                      <img
                        src={profileData.profileImage}
                        alt='Profile'
                        className='w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gray-200 object-cover'
                      />
                      <div className='absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                          onClick={() =>
                            document.getElementById('fileInput').click()
                          }
                          className='p-2 bg-white rounded-full'
                        >
                          <HiCamera className='h-6 w-6 text-gray-800' />
                        </button>
                      </div>
                    </div>
                  </div>

                  <input
                    type='file'
                    id='fileInput'
                    className='hidden'
                    accept='image/*'
                  />

                  <div className='text-center mt-4'>
                    <div className='flex flex-col items-center'>
                      <h2 className='text-2xl font-bold text-gray-800'>
                        {profileData.frenchieName}
                      </h2>
                      <div className='mt-2'>
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

                    <p className='text-gray-600 mt-2 flex items-center justify-center'>
                      <HiLocationMarker className='h-4 w-4 mr-1 text-indigo-500' />
                      {profileData.city}, {profileData.state}
                    </p>

                    <p className='text-gray-500 text-sm mt-1'>
                      ID: {profileData.frenchiesID}
                    </p>

                    <div className='mt-6 flex flex-col space-y-3'>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className='px-4 py-2 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all'
                      >
                        <HiOutlinePencil className='mr-2' />
                        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                      </button>

                      <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className={`px-4 py-2 flex items-center justify-center rounded-lg border ${
                          showPasswordForm
                            ? 'border-gray-300 text-gray-800'
                            : 'border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100'
                        } transition-colors`}
                      >
                        <HiOutlineKey className='mr-2' />
                        {showPasswordForm
                          ? 'Cancel Password Change'
                          : 'Change Password'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className='px-6 py-4 border-t border-gray-100'>
                <div className='grid grid-cols-3 gap-4'>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-indigo-600'>24</p>
                    <p className='text-xs text-gray-500'>Projects</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-indigo-600'>89%</p>
                    <p className='text-xs text-gray-500'>Success</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-indigo-600'>2.1k</p>
                    <p className='text-xs text-gray-500'>Customers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Info Card */}
            <div className='bg-white rounded-2xl shadow-lg mt-6 p-6'>
              <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center'>
                <HiOutlineCalendar className='mr-2 text-indigo-500' />
                Account Information
              </h3>

              <div className='space-y-3'>
                <div>
                  <p className='text-xs text-gray-500'>Account Created</p>
                  <p className='text-sm font-medium text-gray-800'>
                    {formatDate(profileData.createdAt)}
                  </p>
                </div>

                <div>
                  <p className='text-xs text-gray-500'>Last Updated</p>
                  <p className='text-sm font-medium text-gray-800'>
                    {formatDate(profileData.updatedAt)}
                  </p>
                </div>

                <div>
                  <p className='text-xs text-gray-500'>Account Type</p>
                  <p className='text-sm font-medium text-gray-800 capitalize'>
                    {profileData.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className='lg:w-2/3'>
            {/* Profile Information Card */}
            <div className='bg-white rounded-2xl shadow-lg p-6 mb-6'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-xl font-bold text-gray-800'>
                  Profile Information
                </h3>
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

              {isEditing ? (
                <ProfileEdit />
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='flex items-start'>
                    <div className='bg-indigo-50 p-2 rounded-lg mr-3'>
                      <HiOutlineMail className='h-5 w-5 text-indigo-600' />
                    </div>
                    <div>
                      <p className='text-xs text-gray-500'>Email Address</p>
                      <p className='text-sm font-medium text-gray-800'>
                        {profileData.email}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='bg-indigo-50 p-2 rounded-lg mr-3'>
                      <HiOutlinePhone className='h-5 w-5 text-indigo-600' />
                    </div>
                    <div>
                      <p className='text-xs text-gray-500'>Phone Number</p>
                      <p className='text-sm font-medium text-gray-800'>
                        {profileData.phone}
                      </p>
                    </div>
                  </div>

                  <div className='md:col-span-2 flex items-start'>
                    <div className='bg-indigo-50 p-2 rounded-lg mr-3'>
                      <HiOutlineGlobe className='h-5 w-5 text-indigo-600' />
                    </div>
                    <div>
                      <p className='text-xs text-gray-500'>Address</p>
                      <p className='text-sm font-medium text-gray-800'>
                        {profileData.address}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='bg-indigo-50 p-2 rounded-lg mr-3'>
                      <HiLocationMarker className='h-5 w-5 text-indigo-600' />
                    </div>
                    <div>
                      <p className='text-xs text-gray-500'>City</p>
                      <p className='text-sm font-medium text-gray-800'>
                        {profileData.city}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <div className='bg-indigo-50 p-2 rounded-lg mr-3'>
                      <HiLocationMarker className='h-5 w-5 text-indigo-600' />
                    </div>
                    <div>
                      <p className='text-xs text-gray-500'>State</p>
                      <p className='text-sm font-medium text-gray-800'>
                        {profileData.state}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Password Update Section */}

            <ChangePassword
              showPasswordForm={showPasswordForm}
              setShowPasswordForm={setShowPasswordForm}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
