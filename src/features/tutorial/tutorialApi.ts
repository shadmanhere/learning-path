import { API } from '../../app/api'

export const getTutorial = async (tutorialId: string) => {
  return await API.get(`tutorial/${tutorialId}`)
}

export const getChapters = async (tutorialId: string) => {
  const params = new URLSearchParams([['tutorialId', tutorialId]])
  return await API.get('chapter', { params })
}

export const chapterViewed = async (chapterId: number, userId: number) => {
  const params = new URLSearchParams()
  params.append('chapterId', chapterId as unknown as string)
  params.append('userId', userId as unknown as string)
  return await API.post('chapterToUser/new', params)
}
