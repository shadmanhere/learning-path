import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { getTutorial, chapterViewed } from './tutorialApi'
export interface tutorialState {
  value: {
    id: number
    createdAt: string
    title: string
    url: string
    imageUrl: string
    Chapter: {
      id: number
      createdAt: Date
      title: string
      url: string
      imageUrl: string
      tutorialId: number
      ChapterToUser: { chapterId: number; userId: number }[]
    }[]
  }
  error: { messgae: string; statusCode: number }
  status: 'idle' | 'request' | 'loading' | 'failed'
}

const initialState: tutorialState = {
  // eslint-disable-next-line camelcase
  value: {
    id: 0,
    createdAt: '',
    title: '',
    url: '',
    // eslint-disable-next-line camelcase
    imageUrl: '',
    Chapter: [
      {
        id: 0,
        createdAt: new Date(),
        title: '',
        url: '',
        imageUrl: '',
        tutorialId: 0,
        ChapterToUser: [{ chapterId: -1, userId: -1 }],
      },
    ],
  },
  error: { messgae: '', statusCode: 0 },
  status: 'idle',
}

export const GetTutorial = createAsyncThunk('tutorial/getTutorial', async (tutorialId: string) => {
  try {
    const response = await getTutorial(tutorialId)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return err.response
  }
})

export const ChapterViewed = createAsyncThunk(
  'tutorial/chapter/chapterViewed',
  async (data: { chapterId: number; userId: number }) => {
    try {
      const response = await chapterViewed(data.chapterId, data.userId)
      return response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err.response
    }
  },
)

export const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = { messgae: '', statusCode: 0 }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetTutorial.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(GetTutorial.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success) state.value = action.payload.tutorial
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(GetTutorial.rejected, (state) => {
        state.status = 'failed'
      })

      // chapter viewed
      .addCase(ChapterViewed.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(ChapterViewed.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.success)
          state.value.Chapter = state.value.Chapter.map((chapter) => {
            if (chapter.id === action.payload.chapterToUser.chapterId) {
              chapter.ChapterToUser = [action.payload.chapterToUser]
            }
            return chapter
          })
        else {
          state.error.messgae = action.payload.data.message
          state.error.statusCode = action.payload.status
        }
      })
      .addCase(ChapterViewed.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { resetError } = tutorialSlice.actions
// export const { requestTutorialsList } = tutorialsSlice.actions
export const selectTutorial = (state: RootState) => state.tutorial.value
export const selectStatus = (state: RootState) => state.tutorial.status
export const selectError = (state: RootState) => state.tutorial.error

export default tutorialSlice.reducer
