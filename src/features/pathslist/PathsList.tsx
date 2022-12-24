import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { GetPathsList, selectPathsList, selectStatus, selectError } from './pathsListSlice'
import { useNavigate, useLocation } from 'react-router-dom'

import Paths from './Path'
import { setFromLocation } from '../auth/authSlice'

const PathsList = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    dispatch(GetPathsList())
  }, [])

  const isAuthenticated = () => {
    if (error.statusCode === 401 || error.messgae === 'JSON Web Token is expired. Try Again!!!') {
      dispatch(setFromLocation(location.pathname))
      navigate('/signin')
    }
  }
  useEffect(() => {
    isAuthenticated()
  }, [error])

  const listOfPaths: { name: string }[] = useAppSelector(selectPathsList)
  return (
    <>
      {status === 'idle'
        ? listOfPaths.map((path, i) => {
            return (
              <Paths
                key={i}
                pathName={path.name}
                pathUrl={'path/' + path.name.toLowerCase().split(' ').join('-')}
              ></Paths>
            )
          })
        : [0, 1, 2].map((i) => {
            return (
              <div key={i} className='flex flex-wrap w-1/3 animate-pulse'>
                <div className='w-full p-1 md:p-2'>
                  <a target='_blank' rel='noreferrer' href='#'>
                    <div className='block object-cover object-center w-full h-20 md:h-10 rounded-lg bg-slate-300	'></div>
                  </a>
                </div>
              </div>
            )
          })}
    </>
  )
}

export default PathsList
