import axios from 'axios'

export const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'App-Name': process.env.REACT_APP_NAME,
  },
})
