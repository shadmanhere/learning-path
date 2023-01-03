import React, { useEffect } from 'react'
import { Route, Navigate, useLocation } from 'react-router-dom'
import { selectAuthenticated, selectStatus, selectUser, setFromLocation } from '../auth/authSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const ProtectedRoute = ({ isAdmin, children }: any) => {
  const isAuthenticated = useAppSelector(selectAuthenticated)
  const status = useAppSelector(selectStatus)
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const location = useLocation()

  if (isAuthenticated === false) {
    dispatch(setFromLocation(location.pathname))
    return <Navigate to='/signin' />
  }

  //   if (isAdmin === true && user.role !== 'ADMIN') {
  //     return <Navigate to='/' />
  //   }

  return children
}

export default ProtectedRoute
