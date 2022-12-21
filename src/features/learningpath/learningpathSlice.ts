import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getPath } from './learningpathAPI'

export interface pathState {
  value: {
    name: string
    Section: { name: string; tutorials: { title: string; url: string; image_url: string }[] }[]
  }[]
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: pathState = {
  value: [],
  status: 'idle',
}

export const Path = createAsyncThunk('path/getPath', async (learningpath: string) => {
  try {
    const response = await getPath(learningpath)
    return response.data
  } catch (err) {
    console.log(err)
  }
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
