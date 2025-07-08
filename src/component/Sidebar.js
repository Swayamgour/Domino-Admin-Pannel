import { NavLink, useNavigate } from 'react-router-dom'
import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  // FaUsers,
  FaMoneyCheckAlt,
  FaStore
  // FaChartBar
} from 'react-icons/fa'
import { IoExitOutline } from 'react-icons/io5'
// import { FiSettings } from 'react-icons/fi'
// import { MdOutlineDashboard } from 'react-icons/md'
import { useGetCurrentUserQuery, useLogoutMutation } from '../redux/api'
import Cookies from 'js-cookie'

const Sidebar = () => {
  // Create a reusable NavItem component to handle active state
  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
          isActive
            ? 'bg-indigo-600 shadow-lg shadow-indigo-500/20 text-white'
            : 'hover:bg-gray-700 text-gray-300'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`p-2 rounded-lg ${
              isActive ? 'bg-indigo-700' : 'bg-gray-700'
            }`}
          >
            <Icon className='text-lg' />
          </div>
          {label}
        </>
      )}
    </NavLink>
  )

  const navigate = useNavigate()

  const { data: CurrentUser } = useGetCurrentUserQuery()
  const [logout] = useLogoutMutation()

  // console.log(CurrentUser)

  const handelLogOut = async () => {
    try {
      Cookies.remove('accessToken') // Clear token

      setTimeout(() => {
        window.location.reload() // Reload after navigation
      }, 100)
      navigate('/') // Redirect to home
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className='w-64 min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-5 fixed left-0 top-0  flex-col shadow-xl z-50 hidden md:block'>
      {/* Branding */}
      <div className='mb-5 pt-2 flex-col justify-center items-center gap-3 border-b border-gray-700 pb-5'>
        <div className='flex justify-center ' onClick={() => navigate('/Home')}>
          {/* <img src='/image/logo1.png' className='w-30 h-12 ' /> */}
          <img
            src='/image/logo1.png'
            className='w-[130px] h-[57px]'
            alt='of logo'
          />
        </div>
        {/* <div>
          <h1 className='text-2xl font-bold'>Admin</h1>
          
          <p className='text-xs text-gray-400'>Dashboard v3.0</p>
        </div> */}
        <h1 className='text-2xl font-bold text-center'>
          {CurrentUser?.data?.role === 'frenchies' ? 'Admin' : 'Super Admin'}
        </h1>
      </div>

      {/* Navigation */}
      <nav className='space-y-1 flex-1 '>
        <NavItem to='/Home' icon={FaHome} label='Dashboard' />
        {CurrentUser?.data?.role === 'frenchies' && (
          <NavItem to='/Products' icon={FaBoxOpen} label='Products' />
        )}
        {CurrentUser?.data?.role !== 'frenchies' && (
          <NavItem to='/Vendor' icon={FaStore} label='Frenchie' />
        )}
        {CurrentUser?.data?.role !== 'frenchies' && (
          <NavItem
            to='/OrderManagement'
            icon={FaClipboardList}
            label='Orders'
          />
        )}
        {CurrentUser?.data?.role === 'frenchies' && (
          <NavItem to='/FrencieOrder' icon={FaClipboardList} label='Orders' />
        )}
        {/* <NavItem to='/users' icon={FaUsers} label='Users' /> */}
        <NavItem to='/payment' icon={FaMoneyCheckAlt} label='Payments' />
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
            <p className='font-medium'>
              {CurrentUser?.data?.role === 'frenchies'
                ? 'Admin '
                : 'Super Admin'}
            </p>
            <p className='text-xs text-gray-400'>admin@example.com</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer`}
          onClick={() => handelLogOut()}
        >
          <div className={`p-2 rounded-lg `}>
            <IoExitOutline className='text-lg' />
          </div>
          Logout
        </div>
      </div>
    </div>
  )
}

export default Sidebar
