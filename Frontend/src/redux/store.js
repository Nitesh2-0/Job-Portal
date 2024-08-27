import authSlice from './authSlice'
import jobSlice from './jobSlice'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persitConfig = {
  key: 'root',
  version: 1,
  storage
}

const rootReducer = combineReducers({
  auth: authSlice,
  jobs: jobSlice,
})

const persistedReducer = persistReducer(persitConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;