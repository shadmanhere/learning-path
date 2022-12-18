import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getPathsList } from './pathsListApi'

export interface pathsListState {
  value: { name: string }[]
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: pathsListState = {
  value: [],
  status: 'idle',
}

export const GetPathsList = createAsyncThunk('pathslist/getPathsList', async () => {
  const response = await getPathsList()
  return response.data
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
        state.value = action.payload
      })
      .addCase(GetPathsList.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

// export const { requestTutorialsList } = tutorialsSlice.actions
export const selectPathsList = (state: RootState) => state.pathsList.value
export const selectStatus = (state: RootState) => state.pathsList.status

export default pathsListSlice.reducer
