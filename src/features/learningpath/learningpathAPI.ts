import axios from 'axios'

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
})
export const getPath = async (learningpath: string) => {
  return await API.get(`learningpath/${learningpath}`)
}
