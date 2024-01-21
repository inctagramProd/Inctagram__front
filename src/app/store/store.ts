import { baseApi } from '@/src/shared/api/baseApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { gitAuthApi } from '@/src/shared/api/AuthApi'
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [gitAuthApi.reducerPath]: gitAuthApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(gitAuthApi.middleware),
})

setupListeners(store.dispatch)
