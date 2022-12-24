import axios from 'axios'

const API = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL,
})
export const getTutorial = async (tutorialId: string) => {
  return await API.get(`tutorial/${tutorialId}`)
}
