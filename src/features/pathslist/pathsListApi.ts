import { API } from '../../app/api'

export const getPathsList = async () => {
  return await API.get('learningpath')
}
