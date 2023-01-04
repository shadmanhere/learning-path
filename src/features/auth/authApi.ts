import axios from 'axios'

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
})
export const signinRequest = async (username: string, password: string) => {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return await API.post('user/signin', params)
}

export const signupRequest = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const params = new URLSearchParams()
  params.append('firstName', firstName)
  params.append('lastName', lastName)
  params.append('username', username)
  params.append('email', email)
  params.append('password', password)
  params.append('confirmPassword', confirmPassword)
  return await API.post('user/signup', params)
}

export const loadUser = async () => {
  return await API.get('user/me')
}

export const logoutRequest = async () => {
  return await API.get('user/logout')
}

export const forgotPassword = async (email: string) => {
  const params = new URLSearchParams()
  params.append('email', email)
  return await API.post('user/forgot', params)
}

export const resetPassword = async (token: string, password: string, confirmPassword: string) => {
  const params = new URLSearchParams()
  params.append('password', password)
  params.append('confirmPassword', confirmPassword)
  return await API.put(`user/password/reset/${token}`, params)
}

export const updateProfile = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
) => {
  const params = new URLSearchParams()
  params.append('firstName', firstName)
  params.append('lastName', lastName)
  params.append('username', username)
  params.append('email', email)
  return await API.put('user/me/update', params)
}
