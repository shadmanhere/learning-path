import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { signinRequest } from './signinApi'

export interface signinState {
  error: { messgae: string; statusCode: number }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: signinState = {
  error: { messgae: '', statusCode: 0 },
  status: 'idle',
}

export const SignIn = createAsyncThunk(
  'signin/signin',
  async (data: { username: string; password: string }) => {
    try {
      const response = await signinRequest(data.username, data.password)
      return response.data
    } catch (err: any) {
      return err.response
    }
  },
)

export const signinSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = { messgae: '', statusCode: 0 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignIn.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(SignIn.fulfilled, (state, action) => {
        state.status = 'idle'
        if (!action.payload.success) {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(SignIn.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { resetError } = signinSlice.actions

// export const { requestSignIn } = tutorialsSlice.actions

export const selectStatus = (state: RootState) => state.signin.status
export const selectError = (state: RootState) => state.signin.error

export default signinSlice.reducer
