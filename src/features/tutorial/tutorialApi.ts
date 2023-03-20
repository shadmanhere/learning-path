import { API } from '../../app/api'

export const getTutorial = async (tutorialId: string) => {
  return await API.get(`tutorial/${tutorialId}`)
}

export const getChapters = async (tutorialId: string) => {
  const params = new URLSearchParams([['tutorialId', tutorialId]])
  return await API.get('chapter', { params })
}
