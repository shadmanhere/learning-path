import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})
export const getPathsList = async () => {
  return await API.get('list-of-paths.json')
}
