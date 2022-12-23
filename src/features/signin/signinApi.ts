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
