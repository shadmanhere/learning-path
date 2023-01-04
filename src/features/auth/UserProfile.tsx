import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BallTriangle } from 'react-loading-icons'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectUser, selectStatus } from './authSlice'

const UserProfile = () => {
  const user = useAppSelector(selectUser)
  const status = useAppSelector(selectStatus)
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet='utf-8' />
        <title>User Profile | Learning Path</title>
      </Helmet>
      <div className='container grid  place-items-center mx-auto'>
        {status === 'loading' ? (
          <BallTriangle height='4rem' fillOpacity='2' stroke='#9F1239' strokeWidth='6' />
        ) : (
          <>
            <h2 className='font-medium leading-tight text-4xl my-11 text-red-900'>My Profile</h2>
            <div className='flex justify-center flex-col'>
              <h4 className='leading-tight mt-0 mb-2 text-2xl text-rose-800 font-semibold'>
                Full Name
              </h4>
              <p className='text-lg ml-3 mb-4'>{`${user.firstName} ${user.lastName}`}</p>

              <h4 className='leading-tight mt-0 mb-2 text-2xl text-rose-800 font-semibold'>
                Username
              </h4>
              <p className='text-lg ml-3 mb-4'>{`${user.username}`}</p>

              <h4 className='leading-tight mt-0 mb-2 text-2xl text-rose-800 font-semibold'>
                Email Address
              </h4>
              <p className='text-lg ml-3 mb-4'>{user.email}</p>

              <h4 className='leading-tight mt-0 mb-2 text-2xl text-rose-800 font-semibold'>
                Joined On
              </h4>
              <p className='text-lg ml-3 mb-4'>{String(user.createdAt).substring(0, 10)}</p>

              <div className='inline-flex shadow-md hover:shadow-lg focus:shadow-lg' role='group'>
                <Link
                  to='/me/update'
                  id='edit_profile'
                  type='button'
                  data-mdb-ripple='true'
                  data-mdb-ripple-color='light'
                  className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-l shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                >
                  Edit Profile
                </Link>
                <Link
                  to='/password/update'
                  type='button'
                  data-mdb-ripple='true'
                  data-mdb-ripple-color='light'
                  className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-r shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                >
                  Change Password
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </HelmetProvider>
  )
}

export default UserProfile
