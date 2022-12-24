import axios from 'axios'

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
})
export const getPathsList = async () => {
  return await API.get('learningpath')
}
