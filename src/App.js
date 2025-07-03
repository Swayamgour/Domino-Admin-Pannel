import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import Sidebar from './component/Sidebar'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
// import Reports from './pages/Reports'
import Navbar from './component/Navbar'
import Product from './pages/Product'
import OrderManagement from './pages/OrderManagement'
import VendorManagement from './pages/VendorManagement'
import PaymentTransactions from './pages/PaymentTransactions'
import LoginPage from './pages/LoginPage'
import { useGetCurrentUserQuery } from './redux/api'
import { useEffect } from 'react'
import AuthGuard from './component/AuthGuard'
import { Toaster } from 'react-hot-toast'
import ProfilePage from './pages/ProfilePage'

function Layout () {
  const location = useLocation()
  const isLoginPage = location.pathname === '/'

  

  return (
    <>
      {/* <Toaster /> */}
      <Toaster  />
      {!isLoginPage && <Navbar />}

      <div className={`flex ${!isLoginPage ? 'pt-16' : ''}`}>
        {!isLoginPage && (
          <div className='hidden md:block w-64 min-h-screen bg-gray-800 text-white'>
            <Sidebar />
          </div>
        )}

        <div className='flex-1 bg-gray-100 '>
          <Routes>
            <Route path='/' element={<LoginPage />} />

            {/* 👇 Wrap all protected routes */}
            <Route
              path='/Home'
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              }
            />
            <Route
              path='/Products'
              element={
                <AuthGuard>
                  <Product />
                </AuthGuard>
              }
            />
            <Route
              path='/OrderManagement'
              element={
                <AuthGuard>
                  <OrderManagement />
                </AuthGuard>
              }
            />
            <Route
              path='/Vendor'
              element={
                <AuthGuard>
                  <VendorManagement />
                </AuthGuard>
              }
            />
            <Route
              path='/users'
              element={
                <AuthGuard>
                  <Users />
                </AuthGuard>
              }
            />
            <Route
              path='/payment'
              element={
                <AuthGuard>
                  <PaymentTransactions />
                </AuthGuard>
              }
            />
            <Route
              path='/ProfilePage'
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  )
}

function App () {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
