// ./component/AuthGuard.jsx
import { Navigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../redux/api'
import Cookies from 'js-cookie'

const token = Cookies.get('accessToken')
console.log('Token from cookie:', token)

if (token) {
  console.log('✅ accessToken is set')
} else {
  console.log('❌ accessToken is NOT set')
}

const AuthGuard = ({ children }) => {
  const { data, isLoading, isError } = useGetCurrentUserQuery(token)
  // console.log(data.cookie)
  if (isLoading) return <div>Loading...</div>

  if (isError || !data?.success) {
    return <Navigate to='/' replace />
  }

  return children
}

export default AuthGuard
