import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Oval } from 'react-loading-icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectMessage,
  selectSuccess,
  selectError,
  resetError,
  resetMessage,
  selectStatus,
  resetSuccess,
  ChangePassword,
} from './authSlice'

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfrimPassword] = useState('')

  const [oldPasswordValMsg, setOldPasswordValMsg] = useState('')
  const [passwordValMsg, setPasswordValMsg] = useState('')
  const [confirmPasswordValMsg, setConfirmPasswordValMsg] = useState('')

  const dispatch = useAppDispatch()
  const message = useAppSelector(selectMessage)
  const navigate = useNavigate()

  const success = useAppSelector(selectSuccess)
  const error = useAppSelector(selectError)
  const status = useAppSelector(selectStatus)

  useEffect(() => {
    if (success) {
      dispatch(resetSuccess())
      navigate('/me')
    }
  }, [success])

  const validateOldPasswordInput = () => {
    if (oldPassword === '') setOldPasswordValMsg('enter old password')
    else if (/\s/.test(oldPassword)) setOldPasswordValMsg('space not allowed')
    else setOldPasswordValMsg('')
  }

  const validatePasswordInput = () => {
    if (password === '') setPasswordValMsg('enter password')
    else if (/\s/.test(password)) setPasswordValMsg('space not allowed')
    else setPasswordValMsg('')
  }

  const validateConfirmPasswordInput = () => {
    if (confirmPassword === '') setConfirmPasswordValMsg('enter confirm password')
    else if (confirmPassword !== password) setConfirmPasswordValMsg('password do not match')
    else if (/\s/.test(confirmPassword)) setConfirmPasswordValMsg('space not allowed')
    else setConfirmPasswordValMsg('')
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(resetMessage())
    dispatch(resetError())
    const formData = new FormData()
    formData.set('oldPassword', oldPassword)
    formData.set('password', password)
    dispatch(ChangePassword(formData))
  }

  return (
    <HelmetProvider>
      <div className='container grid h-screen place-items-center mx-auto'>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Update Password | Learning Path</title>
        </Helmet>
        <div className='block p-6 rounded-lg shadow-lg bg-white w-80 max-w-sm'>
          <form>
            <div className='form-group mb-6'>
              <label htmlFor='password' className='form-label inline-block mb-2 text-gray-700'>
                Old Password
              </label>
              <input
                type='password'
                className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                  passwordValMsg !== '' ? 'border-rose-600' : ''
                }`}
                id='oldPassword'
                name='oldPassword'
                placeholder='Old Password'
                onChange={(e) => {
                  setOldPassword(e.target.value)
                  validateOldPasswordInput()
                }}
                onBlur={() => validateOldPasswordInput()}
                readOnly={status === 'loading'}
              />
              {oldPasswordValMsg !== '' ? (
                <span className='text-rose-600 block text-right text-xs'>*{oldPasswordValMsg}</span>
              ) : (
                ''
              )}
            </div>

            <div className='form-group mb-6'>
              <label htmlFor='password' className='form-label inline-block mb-2 text-gray-700'>
                New Password
              </label>
              <input
                type='password'
                className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                  passwordValMsg !== '' ? 'border-rose-600' : ''
                }`}
                id='password'
                name='password'
                placeholder='Password'
                onChange={(e) => {
                  setPassword(e.target.value)
                  validatePasswordInput()
                }}
                onBlur={() => validatePasswordInput()}
                readOnly={status === 'loading'}
              />
              {passwordValMsg !== '' ? (
                <span className='text-rose-600 block text-right text-xs'>*{passwordValMsg}</span>
              ) : (
                ''
              )}
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
                className={`form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                  confirmPasswordValMsg !== '' ? 'border-rose-600' : ''
                }`}
                id='confrimPassword'
                name='confirmPassword'
                placeholder='Confrim Password'
                onChange={(e) => {
                  setConfrimPassword(e.target.value)
                  validateConfirmPasswordInput()
                }}
                onBlur={() => validateConfirmPasswordInput()}
                readOnly={status === 'loading'}
              />
              {confirmPasswordValMsg !== '' ? (
                <span className='text-rose-600 block text-right text-xs'>
                  *{confirmPasswordValMsg}
                </span>
              ) : (
                ''
              )}
            </div>
            {error.message && error.from === 'ChangePassword' ? (
              <span className='text-rose-600 block text-right text-xs'>*{error.message}</span>
            ) : (
              ''
            )}
            {message ? (
              <span className='text-green-600 block text-right text-xs'>*{message}</span>
            ) : (
              ''
            )}
            <button
              type='submit'
              className={`w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ${
                status === 'loading' ? 'pointer-events-none opacity-75' : ''
              }`}
              onClick={(e) => handleSubmit(e)}
            >
              {status === 'loading' ? <Oval height='1.2rem' strokeWidth='3' /> : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default UpdatePassword
