// ./component/AuthGuard.jsx
import { Navigate } from 'react-router-dom'
import { useGetCurrentUserQuery } from '../redux/api'
import Cookies from 'js-cookie'
import React from 'react'

const AuthGuard = ({ children }) => {
  const token = Cookies.get('accessToken')






  // Skip API call if no token
  const shouldSkip = !token

  const { data, isLoading, isError , isSuccess } = useGetCurrentUserQuery(token, {
    skip: shouldSkip
  })

  //(data , token)

  // No token? Redirect immediately
  if (!token) {
    //('❌ accessToken is NOT set')
    return <Navigate to='/' replace />
  } else {
    //('✅ accessToken is set')
  }

  // While checking user status, show loader
  if (isLoading) return <div>Loading...</div>

  // If user not authorized or API failed
  if (isError || !data) {
    return <Navigate to='/' replace />
  }

  // Authorized: Render children
  return children
}

export default AuthGuard
