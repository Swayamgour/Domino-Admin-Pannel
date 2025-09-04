import { useNavigate } from 'react-router-dom'
import AnchorTemporaryDrawer from './AnchorTemporaryDrawer'
import { useDispatch } from 'react-redux'
import { setLocation } from '../redux/globalSlice'
import { getUserLocation } from '../utils/getUserLocation'
import { useEffect } from 'react'

function Navbar() {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleGetLocation = async () => {
    try {
      const location = await getUserLocation()
      dispatch(setLocation(location))
    } catch (err) {
      console.error('Error:', err.message)
    }
  }

  useEffect(() => {
    handleGetLocation()
  }, [])

  return (
    <nav className='w-full bg-gradient-to-r from-purple-600 to-indigo-700 p-2 shadow-md fixed top-0 left-0 z-30'>
      <div className='max-w-7xl mx-auto flex items-center justify-between text-white'>
        {/* Drawer icon (hamburger menu) */}

        {/* Desktop Menu */}
        <div onClick={() => navigate('/Home')}>
          {/* <img src='/image/logo1.png' className='w-30 h-12 ' /> */}
          <img
            src='/image/logo1.png'
            className='w-[130px] h-[57px]'
            alt='logo of dominos website'
          />
        </div>

        {/* <div
          onClick={() => navigate('/ProfilePage')}
          className='flex items-center gap-3   rounded-xl border-collapse p-2'
        >
          <div className='bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center'>
            <span className='font-bold'>AK</span>
          </div>
          <div>
            <p className='font-medium'>
              {CurrentUser?.message?.role === 'frenchies'
                ? 'Admin '
                : 'Super Admin'}
            </p>
            <p className='text-xs text-gray-400'>admin@example.com</p>
          </div>
        </div> */}

        <div className="block lg:hidden">
          <AnchorTemporaryDrawer />
        </div>


      </div>
    </nav>
  )
}

export default Navbar
