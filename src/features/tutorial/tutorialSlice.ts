import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getTutorial } from './tutorialApi'

export interface tutorialState {
  value: { id: number; createdAt: string; title: string; url: string; image_url: string }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: tutorialState = {
  // eslint-disable-next-line camelcase
  value: { id: 0, createdAt: '', title: '', url: 'string', image_url: '' },
  status: 'idle',
}

export const GetTutorial = createAsyncThunk('tutorial/getTutorial', async (tutorialId: string) => {
  const response = await getTutorial(tutorialId)
  return response.data
})

export const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTutorial.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(GetTutorial.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
      .addCase(GetTutorial.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

// export const { requestTutorialsList } = tutorialsSlice.actions
export const selectTutorial = (state: RootState) => state.tutorial.value
export const selectStatus = (state: RootState) => state.tutorial.status

export default tutorialSlice.reducer
