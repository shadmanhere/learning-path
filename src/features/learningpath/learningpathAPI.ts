import axios from 'axios'

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})
export const getPath = async () => {
  return await API.get('/data/reactpath.json')
}
