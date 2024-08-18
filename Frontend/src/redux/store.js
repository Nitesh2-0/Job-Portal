import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import jobSlice from './jobSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    jobs: jobSlice
  },
})