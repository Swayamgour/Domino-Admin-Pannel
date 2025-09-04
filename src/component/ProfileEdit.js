import React, { useEffect, useState } from 'react'
import { useGetCurrentUserQuery, useUpdateFrenchieMutation } from '../redux/api'
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineGlobe,
  HiLockClosed,
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineUser,
  HiOutlineMap,
  HiOutlineFlag
} from 'react-icons/hi'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import toast from 'react-hot-toast'

function ProfileEdit({ setEditProfile, editProfile }) {
  const { data: userData } = useGetCurrentUserQuery()

  const [updateFre, result] = useUpdateFrenchieMutation()

  const [profileData, setProfileData] = useState({
    ...userData?.data,
    profileImage:
      'https://imgs.search.brave.com/dZdpbogNh8mudIRhimLEsXDq6Z1k_9dZV_i_20CkhzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Vc2Vy/LVByb2ZpbGUtUE5H/LnBuZw'
  })

  const handleInputChange = e => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  // const location =  useSelector((state)=>state?.)
  const location = useSelector(state => state.global.location)

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('ownerName', profileData?.ownerName || '')
    formData.append('email', profileData?.email || '')
    formData.append('address', profileData?.address || '')
    formData.append('latitude', location?.latitude || '')
    formData.append('longitude', location?.longitude || '')

    if (profileData?.profileImage) {
      formData.append('image', profileData.profileImage)
    }

    // ✅ Corrected here
    await updateFre(formData)
  }

  useEffect(() => {
    if (result?.isSuccess) {
      setEditProfile(false)
      toast.success('Profile Edit Successfully')
    }
  }, [result.isSuccess])

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      // Store or preview the image
      console.log('Selected image file:', file)

      // Example: preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          imagePreview: reader.result,
          profileImage: file
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {editProfile && (
        <form onSubmit={handleSubmit}>
          {result?.isLoading && <Loader />}
          {/* <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-end sm:items-center'> */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-end sm:items-center">
            <div className="bg-white   h-[80%] rounded-t-2xl sm:rounded-2xl p-4 overflow-y-auto">
              <div className='bg-white rounded-t-2xl sm:rounded-2xl shadow-lg p-6 w-full max-w-2xl transition-all transform duration-300 animate-slide-up h-[85vh] sm:h-auto overflow-y-auto'>
                <div className='flex justify-between items-center mb-6'>
                  <h3 className='text-xl font-bold text-gray-800 flex items-center'>
                    <HiLockClosed className='mr-2 text-indigo-600' />
                    Edit Business Profile
                  </h3>

                  <button
                    type='button'
                    onClick={() => setEditProfile(false)}
                    className='text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100'
                  >
                    <RxCross2 className='text-2xl' />
                  </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-6'>
                  {/* Business Info Section */}
                  <div className='md:col-span-2'>
                    <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                      <HiOutlineOfficeBuilding className='mr-2 text-indigo-500' />
                      Business Information
                    </h4>
                  </div>



                  {/* <div>
                    <label className='block text-gray-700 font-medium mb-2 text-sm flex items-center'>
                      <HiOutlineUser className='mr-2 text-gray-500 text-sm' />
                      Upload Image
                    </label>

                    <input
                      type='file'
                      accept='image/*'
                      name='profileImage'
                      onChange={handleImageChange}
                      className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white'
                    />
                  </div> */}

                  <div>
                    <label className='block text-gray-700 font-medium mb-2 text-sm flex items-center'>
                      <HiOutlineUser className='mr-2 text-gray-500 text-sm' />
                      Owner Name
                    </label>
                    <input
                      type='text'
                      name='ownerName'
                      value={profileData.ownerName || ''}
                      onChange={handleInputChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                    />
                  </div>

                  <div>
                    <label className='block text-gray-700 font-medium mb-2 text-sm flex items-center'>
                      <HiOutlineMail className='mr-2 text-gray-500 text-sm' />
                      Email
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <HiOutlineMail className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type='email'
                        name='email'
                        value={profileData.email || ''}
                        onChange={handleInputChange}
                        className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-gray-700 font-medium mb-2 text-sm flex items-center'>
                      <HiOutlinePhone className='mr-2 text-gray-500 text-sm' />
                      Phone
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <HiOutlinePhone className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type='text'
                        name='phone'
                        value={profileData.phone || ''}
                        onChange={handleInputChange}
                        className='w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-transparent text-sm'
                        disabled
                      />
                    </div>
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-gray-700 font-medium mb-2 text-sm flex items-center'>
                      <HiOutlineGlobe className='mr-2 text-gray-500 text-sm' />
                      Address
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none'>
                        <HiOutlineGlobe className='h-5 w-5 text-gray-400' />
                      </div>
                      <textarea
                        name='address'
                        value={profileData.address || ''}
                        onChange={handleInputChange}
                        className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                        rows='3'
                      />
                    </div>
                  </div>
                </div>

                {/* Location Details Section */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-6'>
                  <div className='md:col-span-2'>
                    <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                      <HiOutlineLocationMarker className='mr-2 text-indigo-500' />
                      Location Details
                    </h4>
                  </div>




                  <div className='md:col-span-2'>
                    <label className='block text-gray-700 font-medium mb-2 text-sm flex items-center'>
                      <HiOutlineFlag className='mr-2 text-gray-500 text-sm' />
                      Country
                    </label>
                    <input
                      type='text'
                      name='country'
                      value={profileData.country || ''}
                      onChange={handleInputChange}
                      className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label className='block text-gray-700 font-medium mb-2 text-sm flex items-center'>
                      <HiOutlineOfficeBuilding className='mr-2 text-gray-500 text-sm' />
                      Frenchies ID
                    </label>
                    <input
                      type='text'
                      name='frenchiesID'
                      value={profileData.frenchiesID || ''}
                      onChange={handleInputChange}
                      className='w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:border-transparent text-sm'
                      disabled
                    />
                  </div>
                </div>

                {/* Status Section */}
                <div className='mb-6'>
                  <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center'>
                    <HiOutlineUser className='mr-2 text-indigo-500' />
                    Account Status
                  </h4>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                      <label className='block text-gray-700 font-medium mb-2 text-sm'>
                        Status
                      </label>
                      <div className='p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${profileData.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {profileData.status || 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className='block text-gray-700 font-medium mb-2 text-sm'>
                        Activation Status
                      </label>
                      <div className='p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${profileData.isActivated
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {profileData.isActivated ? 'Activated' : 'Deactivated'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex justify-end mt-8 space-x-3'>
                  <button
                    type='button'
                    onClick={() => setEditProfile(false)}
                    className='px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg text-sm hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg'
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default ProfileEdit
