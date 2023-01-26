import { API } from '../../app/api'

export const getTutorial = async (tutorialId: string) => {
  return await API.get(`tutorial/${tutorialId}`)
}
