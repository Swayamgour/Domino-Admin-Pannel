import React, { useEffect, useState } from 'react'
// import { FaApple, FaGoogle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {
  useAllLoginMutation,
  // useCreateAdminBySuperAdminMutation,
  useGetCurrentUserQuery
} from '../redux/api'
import Cookies from 'js-cookie'
import Loader from '../component/Loader'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const [upDatePass] = useState(true)
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const [loginForAll, result] = useAllLoginMutation()
  // const [logAdmin] = useCreateAdminBySuperAdminMutation()

  // const handelClick = async e => {
  //   e.preventDefault()
  //   let body = {
  //     phone: mobile,
  //     password: password
  //   }

  //   await loginForAll(body)
  // }

  const handelClick = async e => {
    e.preventDefault()

    let body = {
      phone: mobile,
      password: password
    }

    await loginForAll(body)
  }

  // console.log(result?.data?.message?.accessToken)

  useEffect(() => {
    if (result?.data?.data?.accessToken) {
      Cookies.set('accessToken', result.data.data.accessToken, {
        expires: 7
      })
      if (result?.data?.data?.user?.role === 'customer') {
        toast.error('User Not Exits')
      } else {
        navigate('/Home')
      }
    }
  }, [result?.isSuccess, navigate, result?.data?.data?.accessToken])

  const handelClickTwo = e => {
    e.preventDefault()

    navigate('/Home')
  }

  const { data, isSuccess, isLoading } = useGetCurrentUserQuery()
  // const navigate = useNavigate()

  // console.log(data)

  useEffect(() => {
    if (isSuccess && data?.success) {
      // if (data?.user?.role !== 'customer') {
      //
      // } else {
      //   toast.error('User Not Exits')
      // }
      navigate('/Home')
    }
  }, [isSuccess, data, navigate])

  if (isLoading)
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16'></div>
      </div>
    )

  return (
    <diV>
      {result?.isLoading && <Loader />}
      {/* {isSuccess && ( */}
      <div className='min-h-screen bg-gray-300 flex items-center justify-center p-4 '>
        <div className='w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row'>
          {/* Left: Form */}
          {upDatePass ? (
            <div className='w-full lg:w-1/2 bg-gradient-to-br from-yellow-100 via-white to-white p-10  flex flex-col justify-center'>
              <div className='mb-8'>
                <h2 className='text-3xl font-semibold text-gray-800'>
                  Log in account
                </h2>
              </div>

              <form onSubmit={handelClick} className='space-y-5'>
                <input
                  type='text'
                  maxLength={10}
                  placeholder='Mobile Number'
                  value={mobile}
                  onChange={e => {
                    const val = e.target.value
                    if (/^\d*$/.test(val)) setMobile(val) // only digits
                  }}
                  className='w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none'
                />

                <input
                  type='password'
                  placeholder='Password'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  className='w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none'
                />

                <button
                  type='submit'
                  className='w-full py-3 rounded-full bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition'
                >
                  Submit
                </button>
              </form>

              <div className='mt-8 flex justify-between text-sm text-gray-500'>
                <a href='#' className='hover:underline'>
                  Terms & Conditions
                </a>
              </div>
            </div>
          ) : (
            <div className='w-full lg:w-1/2 bg-gradient-to-br from-yellow-100 via-white to-white p-10 flex flex-col justify-center'>
              <div className='mb-8'>
                <h2 className='text-3xl font-semibold text-gray-800'>
                  Update Password
                </h2>
              </div>

              <form onSubmit={handelClickTwo} className='space-y-5'>
                <input
                  type='text'
                  placeholder='Update Password'
                  className='w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none'
                />

                <input
                  type='password'
                  placeholder='Repeat Password'
                  className='w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none'
                />

                <button
                  type='submit'
                  className='w-full py-3 rounded-full bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition'
                >
                  Submit
                </button>
              </form>

              <div className='mt-8 flex justify-between text-sm text-gray-500'>
                <a href='#' className='hover:underline'>
                  Terms & Conditions
                </a>
              </div>
            </div>
          )}

          {/* Right: Image */}
          <div className='w-full lg:w-1/2 relative hidden lg:block'>
            <img
              src='https://imgs.search.brave.com/5Or6izX2PQGnoxC9tTYJrpt9bs07ZFvimNQn5hEQ6GM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/OTU5NzY5MC9waG90/by9wZXBwZXJvbmkt/cGl6emEtb24tYmxh/Y2stc2xhdGUtYmFj/a2dyb3VuZC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9X2NE/Zy11bk9zVWJ5WHl3/eWQyZXBoTGdBU3Bw/d0RlNEdBRzZBZGJj/el8xRT0'
              alt='Team'
              className='w-full h-full object-cover rounded-tr-[2rem] rounded-br-[2rem] shadow-lg'
            />
          </div>
        </div>
      </div>
      {/* )} */}
    </diV>
  )
}

export default LoginPage
