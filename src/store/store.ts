import { configureStore } from '@reduxjs/toolkit'
import heroesReducer from '../slices/heroesSlice'
import episodesReducer from '../slices/episodesSlice'

export const store = configureStore({
  reducer: {
    heroes: heroesReducer,
    episodes: episodesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;