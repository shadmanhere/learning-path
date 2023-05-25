import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Logout, selectUser } from '../auth/authSlice'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [currentUrl, setCurrentUrl] = useState('')
  const [crumbs, setCrumbs] = useState<any[]>([])

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    setCurrentUrl(location.pathname)
  }, [location.pathname])

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  useEffect(() => {
    const locationArray = currentUrl.split('/').filter((crumb) => crumb !== '')
    const crumbsArray: any[] = []
    for (let i = 0; i < locationArray.length; i++) {
      if (locationArray[i] === 'path') {
        crumbsArray.push({
          name: 'Home',
          url: '/',
        })
        crumbsArray.push({
          name: toTitleCase(locationArray[i + 1].split('-').join(' ')),
          url: `/path/${locationArray[i + 1]}`,
        })
      } else if (locationArray[i] === 'tutorial' && locationArray[i - 2] === 'path') {
        crumbsArray.push({
          name: 'Tutorial',
          url: '#',
        })
      }
    }
    setCrumbs(crumbsArray as string[])
  }, [currentUrl])

  const logoutHandle = () => {
    dispatch(Logout())
    navigate('/signin')
  }
  return (
    <nav className='relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg'>
      <div className='container-fluid w-full flex flex-wrap items-center justify-between px-6'>
        <div className='container-fluid flex w-screen items-center flex-col sm:flex-row'>
          <img src='/logo.png' alt='Your Logo' className='w-20 h-20 px-0 mx-0' />
          <Link
            to='/'
            className={`${styles.brand} text-2xl text-rose-800 font-normal tracking-wide`}
          >
            {process.env.REACT_APP_META_NAME}
          </Link>
          <div className='mx-auto sm:mx-1 my-2 sm:ml-auto space-x-0.5'>
            <Link
              to='/'
              type='button'
              className={`px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out 
              ${currentUrl === '/' ? 'bg-gray-400 text-white' : ''}`}
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
        <div className='flex w-full flex-wrap items-center justify-between'>
          <nav className='bg-grey-light w-full rounded-md tems-center' aria-label='breadcrumb'>
            <ol className='list-reset flex'>
              {crumbs.map((crumb, index) => {
                return (
                  <>
                    <li key={index}>
                      <Link
                        to={crumb.url}
                        className='text-neutral-500 hover:text-neutral-600 dark:text-neutral-200'
                      >
                        {crumb.name}
                      </Link>
                    </li>
                    {index !== crumbs.length - 1 ? (
                      <li>
                        <span className='mx-2 text-neutral-500 dark:text-neutral-200'>/</span>
                      </li>
                    ) : (
                      ''
                    )}
                  </>
                )
              })}
            </ol>
          </nav>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
