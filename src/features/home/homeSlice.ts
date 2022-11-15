import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { getTutorialsList } from './homeAPI'

export interface tutorialsState {
  value: any
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: tutorialsState = {
  value: [],
  status: 'idle',
}

export const TutorialsList: any = createAsyncThunk('tutorials/getTutorialsList', async () => {
  const response = await getTutorialsList()
  return response.data
})

export const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
    requestTutorialsList: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TutorialsList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(TutorialsList.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
      .addCase(TutorialsList.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { requestTutorialsList } = tutorialsSlice.actions

export default tutorialsSlice.reducer
