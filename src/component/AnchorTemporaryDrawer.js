import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'

import { TiThMenu } from 'react-icons/ti'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdOutlineDashboard } from 'react-icons/md'
import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  // FaUsers,
  FaMoneyCheckAlt,
  FaStore,
  // FaChartBar
} from 'react-icons/fa'
import { IoExitOutline } from 'react-icons/io5'
import { useGetCurrentUserQuery, useLogoutMutation } from '../redux/api'

export default function AnchorTemporaryDrawer() {
  const [open, setOpen] = React.useState(false)

  const navigate = useNavigate()

  const { data: CurrentUser } = useGetCurrentUserQuery()
  const [logout] = useLogoutMutation()

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpen(open)
  }

  const handelLogOut = async () => {
    await logout()
  }

  let franchise_admin = CurrentUser?.user?.role === 'franchise_admin'


  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isActive
          ? 'bg-gradient-to-r from-purple-600 to-indigo-700 shadow-lg shadow-indigo-500/20 text-white'
          : 'hover:bg-gray-700 text-gray-300'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`p-2 rounded-lg ${isActive ? '' : 'bg-gray-700'}`}>
            <Icon className='text-lg' />
          </div>
          {label}
        </>
      )}
    </NavLink>
  )

  const list = () => (
    <Box
      sx={{ width: 255 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className='w-64 min-h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white p-5 fixed left-0 top-0  flex flex-col shadow-xl z-50'>
        {/* Branding */}
        <div className='mb-5 pt-2 flex items-center gap-3 border-b border-gray-700 pb-5'>
          <div className='bg-indigo-600 p-2 rounded-lg'>
            <MdOutlineDashboard className='text-2xl' />
          </div>
          <div>
            <h1 className='text-2xl font-bold'>
              {franchise_admin
                ? 'Admin'
                : 'Super Admin'}
            </h1>
            <p className='text-xs text-gray-400'>Dashboard v3.0</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className='space-y-1 flex-1 '>
          <NavItem to='/Home' icon={FaHome} label='Dashboard' />
          {/* <NavItem to='/Products' icon={FaBoxOpen} label='Products' /> */}
          {franchise_admin && (
            <NavItem to='/Products' icon={FaBoxOpen} label='Products' />
          )}

          {/* <NavItem to="/Vendor" icon={FaStore} label="Vendors" /> */}
          {!franchise_admin && (
            <NavItem to='/Vendor' icon={FaStore} label='Frenchies' />
          )}

          <NavItem
            to='/OrderManagement'
            icon={FaClipboardList}
            label='Orders'
          />
          {/* <NavItem to='/users' icon={FaUsers} label='Users' /> */}
          {/* <NavItem to='/payment' icon={FaMoneyCheckAlt} label='Payments' /> */}
          {franchise_admin && <NavItem to='/payment' icon={FaMoneyCheckAlt} label='Payments' />}

          {/* <NavItem to="/reports" icon={FaChartBar} label="Reports" /> */}
          {/* <NavItem to="/settings" icon={FiSettings} label="Settings" /> */}
        </nav>

        {/* Footer with Logout */}
        <div className='mt-auto pt-5 border-t border-gray-700'>
          <div
            onClick={() => navigate('/ProfilePage')}
            className='flex items-center gap-3 p-3 bg-gray-800 rounded-xl mb-4'
          >
            <div className='bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center'>
              <span className='font-bold'>AK</span>
            </div>
            <div>
              <p className='font-medium'>Admin User</p>
              <p className='text-xs text-gray-400'>admin@example.com</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200`}
            onClick={() => handelLogOut()}
          >
            <div className={`p-2 rounded-lg `}>
              <IoExitOutline className='text-lg' />
            </div>
            Logout
          </div>
        </div>
      </div>
    </Box>
  )

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <TiThMenu size={24} className='text-white' />
      </Button>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  )
}
