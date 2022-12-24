import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import tutorialsReducer from '../features/home/homeSlice'
import tutorialReducer from '../features/tutorial/tutorialSlice'
import pathReducer from '../features/learningpath/learningpathSlice'
import pathsListReducer from '../features/pathslist/pathsListSlice'
import signinSlice from '../features/auth/signinSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tutorials: tutorialsReducer,
    path: pathReducer,
    pathsList: pathsListReducer,
    tutorial: tutorialReducer,
    signin: signinSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
