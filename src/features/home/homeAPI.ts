import { API } from '../../app/api'

export const getTutorialsList = async () => {
  return await API.get('tutorial/random')
}
