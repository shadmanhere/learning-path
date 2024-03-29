import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { Oval } from 'react-loading-icons'
import {
  ForgotPassword as ForgotPasswordSlice,
  selectError,
  resetError,
  selectMessage,
  resetMessage,
  selectStatus,
} from './authSlice'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()
  const error = useAppSelector(selectError)
  const message = useAppSelector(selectMessage)

  const status = useAppSelector(selectStatus)

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(resetMessage())
    dispatch(resetError())
    const formData = new FormData()
    formData.set('email', email)
    dispatch(ForgotPasswordSlice(formData))
  }
  return (
    <HelmetProvider>
      <div className='container grid h-screen place-items-center mx-auto'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Forgot Password | Learning Path</title>
        </Helmet>
        <div className='block p-6 rounded-lg shadow-lg bg-white w-80 max-w-sm'>
          <form>
            <div className='form-group mb-6'>
              <label htmlFor='username' className='form-label inline-block mb-2 text-gray-700'>
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
                readOnly={status === 'loading'}
              />
              {error.message && error.from === 'ForgotPassword' ? (
                <span className='text-rose-600 block text-right text-xs'>*{error.message}</span>
              ) : (
                ''
              )}
              {message ? (
                <span className='text-green-600 block text-right text-xs'>*{message}</span>
              ) : (
                ''
              )}
            </div>
            <button
              type='submit'
              className={`w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ${
                status === 'loading' ? 'pointer-events-none opacity-75' : ''
              }`}
              onClick={(e) => handleSubmit(e)}
            >
              {status === 'loading' ? (
                <Oval className='mx-auto' height='1.2rem' strokeWidth='3' />
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default ForgotPassword
