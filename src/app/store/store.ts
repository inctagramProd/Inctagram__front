import { baseApi } from '@/src/shared/api/baseApi'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { signInReducer } from '@/src/features/auth/signIn/model/signInSlice'
import { loadState, saveState } from '@/src/shared/lib/localstorage'
import { viewPostsApi } from '@/src/shared/components/Posts/service/api/viewPost.api'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [viewPostsApi.reducerPath]: viewPostsApi.reducer,

  signIn: signInReducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(viewPostsApi.middleware),
  preloadedState: loadState(),
})

setupListeners(store.dispatch)

store.subscribe(() => {
  saveState(store.getState())
})
