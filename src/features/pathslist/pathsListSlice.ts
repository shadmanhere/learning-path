import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getPathsList } from './pathsListApi'

export interface pathsListState {
  value: { name: string }[]
  error: string
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: pathsListState = {
  value: [],
  error: '',
  status: 'idle',
}

export const GetPathsList = createAsyncThunk('pathslist/getPathsList', async () => {
  try {
    const response = await getPathsList()
    return response.data
  } catch (err: any) {
    return err.response.data
  }
})

export const pathsListSlice = createSlice({
  name: 'pathslist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPathsList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(GetPathsList.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success) state.value = action.payload
        else state.error = action.payload.message
      })
      .addCase(GetPathsList.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

// export const { requestTutorialsList } = tutorialsSlice.actions
export const selectPathsList = (state: RootState) => state.pathsList.value
export const selectStatus = (state: RootState) => state.pathsList.status
export const selectError = (state: RootState) => state.pathsList.error

export default pathsListSlice.reducer
