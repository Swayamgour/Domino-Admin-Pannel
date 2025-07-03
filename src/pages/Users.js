import React, { useState, useEffect } from 'react'
import {
  HiUsers,
  HiCheckCircle,
  HiUserGroup,
  HiOfficeBuilding,
  HiSearch,
  HiX,
  HiEmojiSad,
  HiClipboardList,
  HiEye,
  HiEyeOff,
  HiLockClosed
} from 'react-icons/hi'
import { FiX } from 'react-icons/fi'
import { BsSearch } from 'react-icons/bs'

const UserManagement = () => {
  // Mock data for users
  const initialUsers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      role: 'superadmin',
      status: 'active',
      lastLogin: '2023-06-25 14:30:22',
      createdAt: '2023-01-10',
      activityLog: [
        { action: 'Created new vendor', time: '2023-06-27 09:15:22' },
        { action: 'Updated product categories', time: '2023-06-26 16:45:10' },
        { action: 'Reset user password', time: '2023-06-25 11:20:33' }
      ]
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2023-06-27 08:45:11',
      createdAt: '2023-02-15',
      activityLog: [
        { action: 'Approved new orders', time: '2023-06-27 08:45:11' },
        { action: 'Updated inventory status', time: '2023-06-26 14:30:45' }
      ]
    },
    {
      id: 3,
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      role: 'vendor',
      status: 'active',
      lastLogin: '2023-06-26 17:20:15',
      createdAt: '2023-03-20',
      activityLog: [
        { action: 'Added new products', time: '2023-06-26 17:20:15' },
        { action: 'Updated store information', time: '2023-06-25 10:15:30' }
      ]
    },
    {
      id: 4,
      name: 'Ananya Patel',
      email: 'ananya@example.com',
      role: 'admin',
      status: 'inactive',
      lastLogin: '2023-06-20 11:30:44',
      createdAt: '2023-04-05',
      activityLog: [
        { action: 'Processed refunds', time: '2023-06-20 11:30:44' }
      ]
    },
    {
      id: 5,
      name: 'Arjun Mehta',
      email: 'arjun@example.com',
      role: 'vendor',
      status: 'pending',
      lastLogin: '2023-06-18 09:15:22',
      createdAt: '2023-05-12',
      activityLog: []
    }
  ]

  // State management
  const [users, setUsers] = useState(initialUsers)
  const [editingUser, setEditingUser] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Filter users
  const filteredUsers = users.filter(user => {
    // Status filter
    const statusMatch = filter === 'all' || user.status === filter

    // Role filter
    const roleMatch = roleFilter === 'all' || user.role === roleFilter

    // Search term filter
    const searchMatch =
      !searchTerm ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    return statusMatch && roleMatch && searchMatch
  })

  // Delete a user
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  // Toggle user status
  const toggleUserStatus = id => {
    setUsers(
      users.map(user =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'active' ? 'inactive' : 'active'
            }
          : user
      )
    )
  }

  // Open user form
  const openUserForm = (user = null) => {
    setEditingUser(
      user || {
        id: null,
        name: '',
        email: '',
        role: 'admin',
        status: 'active',
        password: ''
      }
    )
    setIsFormOpen(true)
    setNewPassword('')
    setConfirmPassword('')
  }

  // Handle form input changes
  const handleInputChange = e => {
    const { name, value } = e.target
    setEditingUser({
      ...editingUser,
      [name]: value
    })
  }

  // Submit user form
  const handleSubmit = e => {
    e.preventDefault()

    // Password validation for new users
    if (!editingUser.id && newPassword !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (editingUser.id) {
      // Update existing user
      setUsers(users.map(u => (u.id === editingUser.id ? editingUser : u)))
    } else {
      // Add new user
      const newUser = {
        ...editingUser,
        id: users.length + 1,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: '',
        activityLog: []
      }
      setUsers([...users, newUser])
    }

    setIsFormOpen(false)
    setEditingUser(null)
  }

  // Open user details
  const openUserDetails = user => {
    setSelectedUser(user)
    setIsDetailOpen(true)
  }

  // All functions remain unchanged (deleteUser, toggleUserStatus, etc.)

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header - Responsive adjustments */}
        <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8'>
          <div className='mb-4 md:mb-0'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-800'>
              User Management
            </h1>
            <p className='text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base'>
              Super Admin Dashboard - Manage all system users
            </p>
          </div>
          {/* <button
            onClick={() => openUserForm()}
            className='px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg sm:rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300'
          >
            + Add New User
          </button> */}
        </div>

        {/* Stats Cards - Responsive grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-8'>
          {/* Total Users Card */}
          <div className='bg-white rounded-xl shadow p-4 sm:p-5 md:p-6 col-span-2 md:col-span-1'>
            <div className='flex items-center'>
              <div className='bg-indigo-100 p-2 sm:p-3 rounded-lg'>
                <HiUsers className='h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-indigo-600' />
              </div>
              <div className='ml-3 sm:ml-4'>
                <p className='text-xs sm:text-sm text-gray-500'>Total Users</p>
                <p className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          {/* Active Users Card */}
          <div className='bg-white rounded-xl shadow p-4 sm:p-5 md:p-6 col-span-2 md:col-span-1'>
            <div className='flex items-center'>
              <div className='bg-green-100 p-2 sm:p-3 rounded-lg'>
                <HiUserGroup className='h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600' />
              </div>
              <div className='ml-3 sm:ml-4'>
                <p className='text-xs sm:text-sm text-gray-500'>Active Users</p>
                <p className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          {/* Administrators Card */}
          <div className='bg-white rounded-xl shadow p-4 sm:p-5 md:p-6 col-span-2 md:col-span-1'>
            <div className='flex items-center'>
              <div className='bg-blue-100 p-2 sm:p-3 rounded-lg'>
                <HiOfficeBuilding className='h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-600' />
              </div>
              <div className='ml-3 sm:ml-4'>
                <p className='text-xs sm:text-sm text-gray-500'>
                  Administrators
                </p>
                <p className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>
                  {
                    users.filter(
                      u => u.role === 'admin' || u.role === 'superadmin'
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Vendors Card */}
          <div className='bg-white rounded-xl shadow p-4 sm:p-5 md:p-6 col-span-2 md:col-span-1'>
            <div className='flex items-center'>
              <div className='bg-purple-100 p-2 sm:p-3 rounded-lg'>
                <HiUsers className='h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-gray-400' />
              </div>
              <div className='ml-3 sm:ml-4'>
                <p className='text-xs sm:text-sm text-gray-500'>Vendors</p>
                <p className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>
                  {users.filter(u => u.role === 'vendor').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search - Responsive adjustments */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow p-4 sm:p-5 md:p-6 mb-6 md:mb-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
            {/* Search */}
            <div className='sm:col-span-2'>
              <label className='block text-gray-700 text-xs sm:text-sm font-medium mb-1'>
                Search Users
              </label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search by name or email...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base'
                />
                <FiX className='h-5 w-5 sm:h-6 sm:w-6' />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className='block text-gray-700 text-xs sm:text-sm font-medium mb-1'>
                Status
              </label>
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base'
              >
                <option value='all'>All Status</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
                <option value='pending'>Pending</option>
              </select>
            </div>

            {/* Role Filter */}
            <div>
              <label className='block text-gray-700 text-xs sm:text-sm font-medium mb-1'>
                Role
              </label>
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base'
              >
                <option value='all'>All Roles</option>
                <option value='admin'>Admin</option>
                <option value='vendor'>Vendor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table - Responsive adjustments */}
        <div className='bg-white rounded-xl sm:rounded-2xl shadow overflow-hidden mb-6 md:mb-8'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider'>
                    User
                  </th>
                  <th className='px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider'>
                    Role
                  </th>
                  <th className='px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell'>
                    Last Login
                  </th>
                  <th className='px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell'>
                    Created
                  </th>
                  {/* <th className='px-4 py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {filteredUsers.map(user => (
                  <tr
                    key={user.id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-4 py-3 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm'>
                          {user.name.charAt(0)}
                        </div>
                        <div className='ml-3'>
                          <div className='text-sm font-medium text-gray-900 truncate max-w-[150px]'>
                            {user.name}
                          </div>
                          <div className='text-xs text-gray-500 truncate max-w-[150px]'>
                            {/* {user.email} */}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3 whitespace-nowrap'>
                      <span
                        className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                          user.role === 'superadmin'
                            ? 'bg-purple-100 text-purple-800'
                            : user.role === 'admin'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className='px-4 py-3 whitespace-nowrap'>
                      <span
                        className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : user.status === 'inactive'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className='px-4 py-3 whitespace-nowrap text-xs text-gray-500 hidden sm:table-cell'>
                      {user.lastLogin || 'Never'}
                    </td>
                    <td className='px-4 py-3 whitespace-nowrap text-xs text-gray-500 hidden sm:table-cell'>
                      {user.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className='text-center py-10'>
                <HiEmojiSad className='h-14 w-14 mx-auto text-gray-400' />
                <h3 className='mt-3 text-base sm:text-lg font-medium text-gray-900'>
                  No users found
                </h3>
                <p className='mt-1 text-xs sm:text-sm text-gray-500'>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Detail Modal - Responsive adjustments */}
      {isDetailOpen && selectedUser && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4'>
          <div className='bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
            <div className='p-4 sm:p-5 md:p-6'>
              <div className='flex justify-between items-center mb-4 sm:mb-5 md:mb-6'>
                <div>
                  <h3 className='text-xl sm:text-2xl font-bold text-gray-800'>
                    {selectedUser.name}
                  </h3>
                  <p className='text-gray-600 text-sm sm:text-base'>
                    {selectedUser.email}
                  </p>
                </div>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <HiClipboardList className='h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-300' />
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'>
                {/* Left Column - User Info */}
                <div className='md:col-span-2'>
                  <div className='bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-4 sm:mb-5'>
                    <h4 className='text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4'>
                      User Information
                    </h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                      <div>
                        <p className='text-xs sm:text-sm text-gray-500'>Role</p>
                        <p
                          className={`font-medium text-sm sm:text-base ${
                            selectedUser.role === 'superadmin'
                              ? 'text-purple-600'
                              : selectedUser.role === 'admin'
                              ? 'text-blue-600'
                              : 'text-green-600'
                          }`}
                        >
                          {selectedUser.role.charAt(0).toUpperCase() +
                            selectedUser.role.slice(1)}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs sm:text-sm text-gray-500'>
                          Status
                        </p>
                        <div className='flex items-center'>
                          <p
                            className={`font-medium text-sm sm:text-base ${
                              selectedUser.status === 'active'
                                ? 'text-green-600'
                                : selectedUser.status === 'inactive'
                                ? 'text-red-600'
                                : 'text-yellow-600'
                            }`}
                          >
                            {selectedUser.status.charAt(0).toUpperCase() +
                              selectedUser.status.slice(1)}
                          </p>
                          <button
                            onClick={() => toggleUserStatus(selectedUser.id)}
                            className='ml-2 text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300'
                          >
                            {selectedUser.status === 'active'
                              ? 'Deactivate'
                              : 'Activate'}
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className='text-xs sm:text-sm text-gray-500'>
                          Last Login
                        </p>
                        <p className='font-medium text-sm sm:text-base'>
                          {selectedUser.lastLogin || 'Never logged in'}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs sm:text-sm text-gray-500'>
                          Created On
                        </p>
                        <p className='font-medium text-sm sm:text-base'>
                          {selectedUser.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Log */}
                  <div className='bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5'>
                    <div className='flex justify-between items-center mb-3 sm:mb-4'>
                      <h4 className='text-base sm:text-lg font-bold text-gray-800'>
                        Activity Log
                      </h4>
                      <span className='text-xs sm:text-sm text-gray-500'>
                        {selectedUser.activityLog.length} activities
                      </span>
                    </div>

                    <div className='space-y-3 sm:space-y-4'>
                      {selectedUser.activityLog.length > 0 ? (
                        selectedUser.activityLog.map((activity, index) => (
                          <div
                            key={index}
                            className='border-l-2 sm:border-l-4 border-indigo-500 pl-3 sm:pl-4 py-1'
                          >
                            <p className='font-medium text-sm sm:text-base'>
                              {activity.action}
                            </p>
                            <p className='text-xs sm:text-sm text-gray-500'>
                              {activity.time}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className='text-center py-3 sm:py-4'>
                          <HiEye className='h-4 w-4 sm:h-5 sm:w-5' />
                          <p className='text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm'>
                            No activity recorded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Password Reset */}
                <div>
                  <div className='bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-4 sm:mb-5'>
                    <h4 className='text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4'>
                      Reset Password
                    </h4>

                    <div className='space-y-3 sm:space-y-4'>
                      <div>
                        <label className='block text-gray-700 text-xs sm:text-sm font-medium mb-1'>
                          New Password
                        </label>
                        <div className='relative'>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base'
                            placeholder='Enter new password'
                          />
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-2.5 sm:right-3 top-2.5 sm:top-3 text-gray-400 hover:text-gray-600'
                          >
                            <HiEyeOff className='h-4 w-4 sm:h-5 sm:w-5' />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className='block text-gray-700 text-xs sm:text-sm font-medium mb-1'>
                          Confirm Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          className='w-full p-2 sm:p-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base'
                          placeholder='Confirm new password'
                        />
                      </div>

                      <button
                        onClick={() => {
                          if (newPassword && newPassword === confirmPassword) {
                            alert('Password has been reset successfully!')
                            setNewPassword('')
                            setConfirmPassword('')
                          } else {
                            alert('Passwords do not match or are empty!')
                          }
                        }}
                        className='w-full py-2 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-indigo-700 text-sm sm:text-base'
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className='bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5'>
                    <h4 className='text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4'>
                      Role Permissions
                    </h4>

                    <div className='space-y-2 sm:space-y-3'>
                      {/* ... (same permission content) */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Form Modal - Responsive adjustments */}
      {isFormOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-3 md:p-4'>
          <div className='bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='p-4 sm:p-5 md:p-6'>
              <div className='flex justify-between items-center mb-4 sm:mb-5 md:mb-6'>
                <h3 className='text-xl sm:text-2xl font-bold text-gray-800'>
                  {editingUser.id ? 'Edit User' : 'Add New User'}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <FiX className='h-5 w-5 sm:h-6 sm:w-6' />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5'>
                  {/* ... (same form fields with responsive classes) */}
                </div>

                <div className='mt-6 sm:mt-7 md:mt-8 flex justify-end space-x-3 sm:space-x-4'>
                  <button
                    type='button'
                    onClick={() => setIsFormOpen(false)}
                    className='px-4 py-2 sm:px-5 sm:py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-50 text-sm sm:text-base'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg sm:rounded-xl shadow hover:shadow-md transition-all text-sm sm:text-base'
                  >
                    {editingUser.id ? 'Update User' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
