import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getTutorial } from './tutorialApi'

export interface tutorialState {
  value: { id: number; createdAt: string; title: string; url: string; image_url: string }
  error: { messgae: string; statusCode: number }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: tutorialState = {
  // eslint-disable-next-line camelcase
  value: { id: 0, createdAt: '', title: '', url: 'string', image_url: '' },
  error: { messgae: '', statusCode: 0 },
  status: 'idle',
}

export const GetTutorial = createAsyncThunk('tutorial/getTutorial', async (tutorialId: string) => {
  try {
    const response = await getTutorial(tutorialId)
    return response.data
  } catch (err: any) {
    return err.response
  }
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
        if (action.payload.success) state.value = action.payload.tutorial
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(GetTutorial.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

// export const { requestTutorialsList } = tutorialsSlice.actions
export const selectTutorial = (state: RootState) => state.tutorial.value
export const selectStatus = (state: RootState) => state.tutorial.status
export const selectError = (state: RootState) => state.tutorial.error

export default tutorialSlice.reducer
