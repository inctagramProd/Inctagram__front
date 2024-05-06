import { signInReducer } from '@/src/features/auth/signIn/model/signInSlice'
import { baseApi } from '@/src/shared/api/baseApi'
import { loadState, saveState } from '@/src/shared/lib/localstorage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  signIn: signInReducer,
})

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  preloadedState: loadState(),
  reducer: rootReducer,
})

setupListeners(store.dispatch)

store.subscribe(() => {
  saveState(store.getState())
})
