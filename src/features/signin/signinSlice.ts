import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../../app/store'
import { logoutRequest, signinRequest } from './signinApi'

export interface signinState {
  fromLocation: string
  value: { id: number; firstName: string; lastName: string; username: string; email: string }
  error: { messgae: string; statusCode: number }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: signinState = {
  fromLocation: '',
  value: { id: 0, firstName: '', lastName: '', username: '', email: '' },
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

export const Logout = createAsyncThunk('signin/logout', async () => {
  try {
    const response = await logoutRequest()
    return response.data
  } catch (err: any) {
    return err.response
  }
})

export const signinSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
    setFromLocation: (state, action: PayloadAction<string>) => {
      state.fromLocation = action.payload
    },
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
        if (action.payload.success) state.value = action.payload.user
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(SignIn.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(Logout.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success)
          state.value = { id: 0, firstName: '', lastName: '', username: '', email: '' }
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(Logout.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { setFromLocation, resetError } = signinSlice.actions

// export const { requestSignIn } = tutorialsSlice.actions

export const selectFromLocation = (state: RootState) => state.signin.fromLocation
export const selectUser = (state: RootState) => state.signin.value
export const selectStatus = (state: RootState) => state.signin.status
export const selectError = (state: RootState) => state.signin.error

export default signinSlice.reducer
