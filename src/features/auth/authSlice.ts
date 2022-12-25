import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { logoutRequest, signinRequest, signupRequest, getUserProfile } from './authApi'

export interface authState {
  fromLocation: string
  value: { id: number; firstName: string; lastName: string; username: string; email: string }
  error: { messgae: string; statusCode: number }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: authState = {
  fromLocation: '',
  value: { id: 0, firstName: '', lastName: '', username: '', email: '' },
  error: { messgae: '', statusCode: 0 },
  status: 'idle',
}

export const SignIn = createAsyncThunk(
  'auth/signin',
  async (data: { username: string; password: string }) => {
    try {
      const response = await signinRequest(data.username, data.password)
      return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err.response
    }
  },
)

export const SignUp = createAsyncThunk(
  'auth/signup',
  async (data: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    try {
      const response = await signupRequest(
        data.firstName,
        data.lastName,
        data.username,
        data.email,
        data.password,
        data.password,
      )
      return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err.response
    }
  },
)

export const Logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await logoutRequest()
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.response
  }
})

export const UserProfile = createAsyncThunk('auth/userprofile', async () => {
  try {
    const response = await getUserProfile()
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.response
  }
})

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(SignUp.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success) state.value = action.payload.user
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(SignUp.rejected, (state) => {
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
      .addCase(UserProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(UserProfile.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success) state.value = action.payload.user
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(UserProfile.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { setFromLocation, resetError } = authSlice.actions

// export const { requestSignIn } = tutorialsSlice.actions

export const selectFromLocation = (state: RootState) => state.auth.fromLocation
export const selectUser = (state: RootState) => state.auth.value
export const selectStatus = (state: RootState) => state.auth.status
export const selectError = (state: RootState) => state.auth.error

export default authSlice.reducer
