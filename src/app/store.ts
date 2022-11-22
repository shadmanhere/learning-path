import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import tutorialsReducer from '../features/home/homeSlice'
import pathReducer from '../features/learningpath/learningpathSlice'
import pathsListReducer from '../features/pathlist/pathsListSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tutorials: tutorialsReducer,
    path: pathReducer,
    pathsList: pathsListReducer,
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
