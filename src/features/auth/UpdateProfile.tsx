import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from './authSlice'

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [firstNameValMsg, setFirstNameValMsg] = useState('')
  const [lastNameValMsg, setLastNameValMsg] = useState('')
  const [usernameValMsg, setUsernameValMsg] = useState('')
  const [emailValMsg, setEmailValMsg] = useState('')

  const validateFirstNameInput = () => {
    if (firstName === '') setFirstNameValMsg('enter first name')
    else if (/\s/.test(firstName)) setFirstNameValMsg('space not allowed')
    else if (firstName.length > 10) setFirstNameValMsg('more than 10 characters not allowed')
    else setFirstNameValMsg('')
  }

  const validateLastNameInput = () => {
    if (lastName === '') setLastNameValMsg('enter last name')
    else if (/\s/.test(lastName)) setLastNameValMsg('space not allowed')
    else if (lastName.length > 10) setLastNameValMsg('more than 10 characters not allowed')
    else setLastNameValMsg('')
  }

  const validateUsernameInput = () => {
    if (username === '') setUsernameValMsg('enter username')
    else if (/\s/.test(username)) setUsernameValMsg('space not allowed')
    else setUsernameValMsg('')
  }

  const validateEmailInput = () => {
    if (email === '') setEmailValMsg('enter email')
    else if (/\s/.test(email)) setEmailValMsg('space not allowed')
    else setEmailValMsg('')
  }

  const user = useAppSelector(selectUser)
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Update Profile | Learning Path</title>
      </Helmet>
      <div className='container grid  place-items-center mx-auto'>
        <h2 className='font-medium leading-tight text-4xl my-11 text-red-900'>Update Profile</h2>
        <form className='flex justify-center flex-col'>
          <div className='form-group mb-6'>
            <label
              htmlFor='firstName'
              className='form-label inline-block mb-2 text-red-700 font-semibold'
            >
              First Name
            </label>
            <input
              id='firstName'
              name='firstName'
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              value={user.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameValMsg !== '' ? (
              <span className='text-rose-600 block text-right text-xs'>*{firstNameValMsg}</span>
            ) : (
              ''
            )}
          </div>
          <div className='form-group mb-6'>
            <label
              htmlFor='lastName'
              className='form-label inline-block mb-2 text-red-700 font-semibold'
            >
              Last Name
            </label>
            <input
              id='lastName'
              name='lastName'
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              value={user.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameValMsg !== '' ? (
              <span className='text-rose-600 block text-right text-xs'>*{lastNameValMsg}</span>
            ) : (
              ''
            )}
          </div>
          <div className='form-group mb-6'>
            <label
              htmlFor='username'
              className='form-label inline-block mb-2 text-red-700 font-semibold'
            >
              Username
            </label>
            <input
              id='username'
              name='username'
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              value={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameValMsg !== '' ? (
              <span className='text-rose-600 block text-right text-xs'>*{usernameValMsg}</span>
            ) : (
              ''
            )}
          </div>
          <div className='form-group mb-6'>
            <label
              htmlFor='email'
              className='form-label inline-block mb-2 text-red-700 font-semibold'
            >
              Email Address
            </label>
            <input
              id='email'
              name='email'
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailValMsg !== '' ? (
              <span className='text-rose-600 block text-right text-xs'>*{emailValMsg}</span>
            ) : (
              ''
            )}
          </div>

          <Link
            to='/password/update'
            type='submit'
            data-mdb-ripple='true'
            data-mdb-ripple-color='light'
            className='text-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
          >
            Submit
          </Link>
        </form>
      </div>
    </HelmetProvider>
  )
}

export default UpdateProfile
