import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser, SignUp } from './signinSlice'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfrimPassword] = useState('')
  const user = useAppSelector(selectUser)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (user.email) navigate('/')
  }, [user])

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    dispatch(SignUp({ firstName, lastName, username, email, password, confirmPassword }))
  }
  return (
    <HelmetProvider>
      <div className='container grid h-screen place-items-center mx-auto'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Signin | Learning Path</title>
        </Helmet>
        <div className='block p-6 rounded-lg shadow-lg bg-white w-100 max-w-xl'>
          <form>
            <div className='flex space-x-1'>
              <div>
                <div className='form-group mb-6'>
                  <label htmlFor='firstName' className='form-label inline-block mb-2 text-gray-700'>
                    First Name
                  </label>
                  <input
                    type='text'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='firstName'
                    name='firstName'
                    aria-describedby='firstNameHelp'
                    placeholder='Enter first name'
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className='form-group mb-6'>
                  <label htmlFor='username' className='form-label inline-block mb-2 text-gray-700'>
                    Username
                  </label>
                  <input
                    type='text'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='username'
                    name='username'
                    aria-describedby='usernameHelp'
                    placeholder='Enter username'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className='form-group mb-6'>
                  <label htmlFor='password' className='form-label inline-block mb-2 text-gray-700'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='password'
                    name='password'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className='form-group mb-6'>
                  <label htmlFor='lastName' className='form-label inline-block mb-2 text-gray-700'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='lastName'
                    name='lastName'
                    aria-describedby='lastNameHelp'
                    placeholder='Enter last name'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className='form-group mb-6'>
                  <label htmlFor='email' className='form-label inline-block mb-2 text-gray-700'>
                    Email
                  </label>
                  <input
                    type='email'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='email'
                    name='email'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='form-group mb-6'>
                  <label
                    htmlFor='confrimPassword'
                    className='form-label inline-block mb-2 text-gray-700'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                    id='confrimPassword'
                    name='confirmPassword'
                    placeholder='Confrim Password'
                    onChange={(e) => setConfrimPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center mb-6'>
              {/* <div className='form-group form-check'>
              <input
                type='checkbox'
                className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                id='exampleCheck2'
              />
              <label
                className='form-check-label inline-block text-gray-800'
                htmlFor='exampleCheck2'
              >
                Remember me
              </label>
            </div> */}
              {/* <a
                href='#!'
                className='text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'
              >
                Forgot password?
              </a> */}
            </div>
            <button
              type='submit'
              className=' w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
              onClick={(e) => handleSubmit(e)}
            >
              Signup
            </button>
            <p className='text-gray-800 mt-6 text-center'>
              Already a member ?{' '}
              <a
                href='#!'
                className='text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out'
              >
                Signin
              </a>
            </p>
          </form>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Signup
