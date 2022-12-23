import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { getTutorialsList } from './homeAPI'

export interface tutorialsState {
  value: { title: string; url: string; image_url: string }[]
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
  } catch (err: any) {
    return err.response
  }
})

export const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
    // requestTutorialsList: (state, action: PayloadAction<any>) => {
    //   state.value = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TutorialsList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(TutorialsList.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success) state.value = action.payload
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

// export const { requestTutorialsList } = tutorialsSlice.actions
export const selectTutorials = (state: RootState) => state.tutorials.value
export const selectStatus = (state: RootState) => state.tutorials.status
export const selectError = (state: RootState) => state.tutorials.error

export default tutorialsSlice.reducer
