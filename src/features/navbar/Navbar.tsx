import React from 'react'
import { styled } from '@linaria/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Logout, selectUser } from '../auth/authSlice'
import './Navbar.css'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  const logoutHandle = () => {
    dispatch(Logout())
    navigate('/signin')
  }
  return (
    <nav className='relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg'>
      <div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
        <div className='container-fluid flex w-screen items-center flex-col sm:flex-row'>
          <Link to='/'>
            <Brand className='text-2xl text-rose-800 font-normal tracking-wide'>
              {process.env.REACT_APP_META_NAME}
            </Brand>
          </Link>
          <div className='mx-auto sm:mx-1 my-2 sm:ml-auto space-x-0.5'>
            <Link
              to='/'
              type='button'
              className='px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
            >
              Home
            </Link>
            {user.id ? (
              <>
                <button
                  type='button'
                  className='px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
                  onClick={() => logoutHandle()}
                >
                  Logout
                </button>
                <Link
                  to='/me'
                  className='px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
                >
                  {user.firstName}
                </Link>
              </>
            ) : (
              <>
                <Link to='/signin'>
                  <button
                    type='button'
                    className='px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
                  >
                    Signin
                  </button>
                </Link>
                <Link to='/signup'>
                  <button
                    type='button'
                    className='px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out'
                  >
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

// Create a styled component
const Brand = styled.p`
  font-family: 'Mulish', sans-serif;
`

export default Navbar
