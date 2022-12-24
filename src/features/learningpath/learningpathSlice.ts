import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getPath } from './learningpathAPI'

export interface pathState {
  value: {
    name: string
    Section: { name: string; tutorials: { title: string; url: string; image_url: string }[] }[]
  }[]
  error: { messgae: string; statusCode: number }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: pathState = {
  value: [],
  error: { messgae: '', statusCode: 0 },
  status: 'idle',
}

export const Path = createAsyncThunk('path/getPath', async (learningpath: string) => {
  try {
    const response = await getPath(learningpath)
    return response.data
  } catch (err: any) {
    return err.response
  }
})

export const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = { messgae: '', statusCode: 0 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Path.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(Path.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success) state.value = action.payload.learningPath
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(Path.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { resetError } = pathSlice.actions

export const selectPath = (state: RootState) => state.path.value
export const selectStatus = (state: RootState) => state.path.status
export const selectError = (state: RootState) => state.path.error

export default pathSlice.reducer
