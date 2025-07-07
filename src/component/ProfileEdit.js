import React, { useState } from 'react'
import { useGetCurrentUserQuery, useUpdateFrenchieMutation } from '../redux/api'
import { HiOutlineMail, HiOutlinePhone, HiOutlineGlobe } from 'react-icons/hi'

function ProfileEdit () {
  const { data: userData } = useGetCurrentUserQuery()
  const [updateFre, result] = useUpdateFrenchieMutation()

  const [isEditing, setIsEditing] = useState(false)

  const [profileData, setProfileData] = useState({
    ...userData.data,
    profileImage:
      'https://imgs.search.brave.com/dZdpbogNh8mudIRhimLEsXDq6Z1k_9dZV_i_20CkhzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Vc2Vy/LVByb2ZpbGUtUE5H/LnBuZw'
  })

  // Password update state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsEditing(false)
    console.log('Updated profile:', profileData)
    let body = {
      phone: '6392601573',
      latitude: '26.39531217885032',
      longitude: '80.40430577566494',
      password: '12345'
    }
  }

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser')
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords
            resolve({ lat: latitude, lng: longitude })
          },
          error => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject('User denied the request for Geolocation.')
                break
              case error.POSITION_UNAVAILABLE:
                reject('Location information is unavailable.')
                break
              case error.TIMEOUT:
                reject('The request to get user location timed out.')
                break
              default:
                reject('An unknown error occurred.')
                break
            }
          }
        )
      }
    })
  }

  const fetchLocation = async () => {
    try {
      const location = await getCurrentLocation()
      console.log('User location:', location)
      // Use location.lat and location.lng here
    } catch (err) {
      console.error('Error getting location:', err)
    }
  }

  console.log(fetchLocation())

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-end'>
          <div className='bg-white rounded-t-2xl shadow-lg p-6 w-full max-w-lg transition-all transform duration-300 animate-slide-up h-[80vh] overflow-y-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  Business Name
                </label>
                <input
                  type='text'
                  name='frenchieName'
                  value={profileData.frenchieName}
                  onChange={handleInputChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  Owner Name
                </label>
                <input
                  type='text'
                  name='OwnerName'
                  value={profileData.OwnerName}
                  onChange={handleInputChange}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  Frenchies ID
                </label>
                <input
                  type='text'
                  name='frenchiesID'
                  value={profileData.frenchiesID}
                  onChange={handleInputChange}
                  className='w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-sm'
                  disabled
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  Email
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <HiOutlineMail className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='email'
                    name='email'
                    value={profileData.email}
                    onChange={handleInputChange}
                    className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                  />
                </div>
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  Phone
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <HiOutlinePhone className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='text'
                    name='phone'
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className='w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-transparent text-sm'
                    disabled
                  />
                </div>
              </div>

              <div className='md:col-span-2'>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  Address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <HiOutlineGlobe className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    type='text'
                    name='address'
                    value={profileData.address}
                    onChange={handleInputChange}
                    className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                  />
                </div>
              </div>

              <div>
                <label className='block text-gray-700 font-medium mb-2 text-sm'>
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  value={profileData.city}
                  onChange={handleInputChange}
                  className='w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-transparent text-sm'
                  disabled
                />
              </div>
            </div>

            <div className='flex justify-end mt-8 space-x-3'>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg text-sm hover:from-indigo-600 hover:to-indigo-700'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </form>
    </>
  )
}

export default ProfileEdit
