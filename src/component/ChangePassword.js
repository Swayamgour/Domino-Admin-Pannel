import React, { useEffect, useState } from 'react'
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
import { RxCross2 } from 'react-icons/rx'
import { useGetCurrentUserQuery, useUpdatePasswordMutation } from '../redux/api'

function ChangePassword ({ showPasswordForm, setShowPasswordForm }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const { data: userData } = useGetCurrentUserQuery()

  const [updatePass, result] = useUpdatePasswordMutation()

  console.log(result)

  const [profileData, setProfileData] = useState({
    ...userData?.message,
    profileImage:
      'https://imgs.search.brave.com/dZdpbogNh8mudIRhimLEsXDq6Z1k_9dZV_i_20CkhzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Vc2Vy/LVByb2ZpbGUtUE5H/LnBuZw'
  })

  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (result.isSuccess) {
      setPasswordSuccess('Password updated successfully!')
    } else {
      if (result.isError) {
        setPasswordError('Old Password is not matched')
      }
    }
  }, [result])

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

  const handlePasswordSubmit = async e => {
    e.preventDefault()

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setPasswordError('All fields are required')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    if (passwordData.newPassword.length < 2) {
      setPasswordError('Password must be at least 8 characters')
      return
    }

    console.log('Password update data:', {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    })

    let body = {
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.newPassword
    }

    await updatePass(body)

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setPasswordError('')

    setTimeout(() => setPasswordSuccess(''), 3000)
  }

  return (
    <>
      {showPasswordForm && (
        <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-end'>
          <div className='bg-white rounded-t-2xl shadow-lg p-6 w-full max-w-lg transition-all transform duration-300 animate-slide-up'>
            <div className='bg-white rounded-2xl shadow-lg p-6'>
              <div className='flex justify-between items-center'>
                <h3 className='text-xl font-bold text-gray-800 mb-6 flex items-center'>
                  <HiLockClosed className='mr-2 text-indigo-600' />
                  Update Password
                </h3>

                <div
                  onClick={() => {
                    setShowPasswordForm(false)
                    setPasswordError('')
                  }}
                  className='text-xl font-bold text-gray-800 mb-6 flex items-center'
                >
                  <RxCross2 />{' '}
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className='grid grid-cols-1 gap-5'>
                  <div>
                    <label className='block text-gray-700 font-medium mb-2 text-sm'>
                      Current Password
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <HiOutlineKey className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type='password'
                        name='currentPassword'
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                        placeholder='Enter current password'
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                      <label className='block text-gray-700 font-medium mb-2 text-sm'>
                        New Password
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <HiOutlineKey className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                          type='password'
                          name='newPassword'
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                          placeholder='Enter new password'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-gray-700 font-medium mb-2 text-sm'>
                        Confirm New Password
                      </label>
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <HiOutlineKey className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                          type='password'
                          name='confirmPassword'
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                          placeholder='Confirm new password'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {passwordError && (
                  <div className='mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm'>
                    {passwordError}
                  </div>
                )}

                {passwordSuccess && (
                  <div className='mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm'>
                    {passwordSuccess}
                  </div>
                )}

                <div className='flex justify-end mt-6'>
                  <button
                    type='submit'
                    className='px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg text-sm hover:from-indigo-600 hover:to-indigo-700'
                  >
                    Update Password
                  </button>
                </div>
              </form>

              <div className='mt-6 pt-4 border-t border-gray-100'>
                <h4 className='font-medium text-gray-700 mb-2 text-sm'>
                  Password Requirements:
                </h4>
                <ul className='text-xs text-gray-600 grid grid-cols-2 gap-2'>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-indigo-500 rounded-full mr-2'></span>
                    Minimum 8 characters
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-indigo-500 rounded-full mr-2'></span>
                    Uppercase & lowercase letters
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-indigo-500 rounded-full mr-2'></span>
                    At least one number
                  </li>
                  <li className='flex items-center'>
                    <span className='w-2 h-2 bg-indigo-500 rounded-full mr-2'></span>
                    Special characters (!@#$%^&*)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChangePassword
