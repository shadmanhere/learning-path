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

export const logoutRequest = async () => {
  return await API.get('user/logout')
}
