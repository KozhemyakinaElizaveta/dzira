import { configureStore } from '@reduxjs/toolkit'
import projectReducer from 'entities/project/model/slice'
import timerReducer from 'entities/timerSlice/timerSlice'

export const store = configureStore({
  reducer: {
    project: projectReducer,
    timer: timerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
