import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  resetError,
  selectError,
  selectStatus,
  selectSuccess,
  selectUser,
  UpdateMyProfile,
  resetSuccess,
} from './authSlice'

const UpdateProfile = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [firstNameValMsg, setFirstNameValMsg] = useState('')
  const [lastNameValMsg, setLastNameValMsg] = useState('')
  const [usernameValMsg, setUsernameValMsg] = useState('')
  const [emailValMsg, setEmailValMsg] = useState('')

  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const user = useAppSelector(selectUser)
  const isUpdated = useAppSelector(selectSuccess)
  const navigate = useNavigate()
  const error = useAppSelector(selectError)

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setUsername(user.username)
      setEmail(user.email)
    }
    if (isUpdated) {
      dispatch(resetSuccess())
      navigate('/me')
    }
  }, [isUpdated])

  useEffect(() => {
    if (firstName !== '') validateFirstNameInput()
    if (lastName !== '') validateLastNameInput()
    if (username !== '') validateUsernameInput()
    if (email !== '') validateEmailInput()
  }, [firstName, lastName, username, email])

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
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      setEmailValMsg('enter valid email id')
    else setEmailValMsg('')
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    dispatch(UpdateMyProfile({ firstName, lastName, username, email }))
    dispatch(resetError())
  }
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
              type='text'
              id='firstName'
              name='firstName'
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              value={firstName}
              placeholder='Enter first name'
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
              onBlur={() => validateFirstNameInput()}
              readOnly={status === 'loading'}
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
              type='text'
              id='lastName'
              name='lastName'
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              value={lastName}
              placeholder='Enter last name'
              onChange={(e) => {
                setLastName(e.target.value)
              }}
              onBlur={() => validateLastNameInput()}
              readOnly={status === 'loading'}
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
              type='text'
              id='username'
              name='username'
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              value={username}
              placeholder='Enter username'
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              onBlur={() => validateUsernameInput()}
              readOnly={status === 'loading'}
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
              type='email'
              id='email'
              name='email'
              className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
              value={email}
              placeholder='Enter email'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              onBlur={() => validateEmailInput()}
              readOnly={status === 'loading'}
            />
            {emailValMsg !== '' ? (
              <span className='text-rose-600 block text-right text-xs'>*{emailValMsg}</span>
            ) : (
              ''
            )}
          </div>
          {error.message && error.from === 'UpdateProfile' ? (
            <span className='text-rose-600 block text-right text-xs'>*{error.message}</span>
          ) : (
            ''
          )}
          <button
            type='submit'
            data-mdb-ripple='true'
            data-mdb-ripple-color='light'
            className='text-center inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>
      </div>
    </HelmetProvider>
  )
}

export default UpdateProfile
