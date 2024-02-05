import { AuthApi } from '@/src/shared/api/AuthApi'
import { baseApi } from '@/src/shared/api/baseApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { signInReducer } from '@/src/features/auth/signIn/model/signInSlice'
import { loadState, saveState } from '@/src/shared/lib/localstorage'

const rootReducer: any = {
  [baseApi.reducerPath]: baseApi.reducer,
  signIn: signInReducer,
}
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware).concat(AuthApi.middleware),
    preloadedState: loadState(),
})

setupListeners(store.dispatch)

store.subscribe(() => {
  saveState(store.getState())
})
