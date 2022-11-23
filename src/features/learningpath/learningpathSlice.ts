import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { getPath } from './learningpathAPI'

export interface pathState {
  value: {
    section: { name: string; tutorials: { title: string; url: string; thumbnail: string }[] }
  }[]
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: pathState = {
  value: [],
  status: 'idle',
}

export const Path = createAsyncThunk('path/getPath', async (learningpath: string) => {
  const response = await getPath(learningpath)
  return response.data
})

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Path.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(Path.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
      .addCase(Path.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const selectPath = (state: RootState) => state.path.value
export const selectStatus = (state: RootState) => state.path.status

export default pathSlice.reducer
