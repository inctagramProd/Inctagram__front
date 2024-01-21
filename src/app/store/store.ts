import { AuthApi } from '@/src/shared/api/AuthApi'
import { baseApi } from '@/src/shared/api/baseApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(AuthApi.middleware),
})

setupListeners(store.dispatch)
