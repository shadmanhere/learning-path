import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getPathsList } from './pathsListApi'

export interface pathsListState {
  value: { name: string }[]
  error: { messgae: string; statusCode: number }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: pathsListState = {
  value: [],
  error: { messgae: '', statusCode: 0 },
  status: 'idle',
}

export const GetPathsList = createAsyncThunk('pathslist/getPathsList', async () => {
  try {
    const response = await getPathsList()
    return response.data
  } catch (err: any) {
    return err.response
  }
})

export const pathsListSlice = createSlice({
  name: 'pathslist',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = { messgae: '', statusCode: 0 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetPathsList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(GetPathsList.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success) state.value = action.payload.learningPaths
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(GetPathsList.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { resetError } = pathsListSlice.actions
// export const { requestTutorialsList } = tutorialsSlice.actions
export const selectPathsList = (state: RootState) => state.pathsList.value
export const selectStatus = (state: RootState) => state.pathsList.status
export const selectError = (state: RootState) => state.pathsList.error

export default pathsListSlice.reducer
