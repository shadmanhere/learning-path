import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getTutorialsList } from './homeAPI'

export interface tutorialsState {
  value: { title: string; url: string; imageUrl: string }[]
  error: { messgae: string; statusCode: number }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: tutorialsState = {
  value: [],
  error: { messgae: '', statusCode: 0 },
  status: 'idle',
}

export const TutorialsList = createAsyncThunk('tutorials/getTutorialsList', async () => {
  try {
    const response = await getTutorialsList()
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.response
  }
})

export const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
    resetValue: (state) => {
      state.value = []
    },
    resetError: (state) => {
      state.error = { messgae: '', statusCode: 0 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TutorialsList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(TutorialsList.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success) state.value = action.payload.tutorials
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(TutorialsList.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { resetError, resetValue } = tutorialsSlice.actions

// export const { requestTutorialsList } = tutorialsSlice.actions
export const selectTutorials = (state: RootState) => state.tutorials.value
export const selectStatus = (state: RootState) => state.tutorials.status
export const selectError = (state: RootState) => state.tutorials.error

export default tutorialsSlice.reducer
