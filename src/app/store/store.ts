import { baseApi } from '@/src/shared/api/baseApi'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { signInReducer } from '@/src/features/auth/signIn/model/signInSlice'
import { loadState, saveState } from '@/src/shared/lib/localstorage'
import { postsReducer } from '@/src/entities/post/model/slice/postSlice'
import { AppDispatch, AppRootState } from '@/src/app/store/types'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { viewPostsApi } from '@/src/shared/components/Posts/service/api/viewPost.api'

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [viewPostsApi.reducerPath]: viewPostsApi.reducer,

  signIn: signInReducer,
  posts: postsReducer
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

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector