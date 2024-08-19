'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignInSchema } from '@/src/features/auth/signIn/service/types/signInTypes'

const initialState: SignInSchema = {
  userId: null,
  username: null,
  accessToken: null,
}

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken
    },
    setUserAuthData: (
      state,
      action: PayloadAction<{ userId: number | null; username: string | null }>
    ) => {
      state.userId = action.payload.userId
      state.username = action.payload.username
    },
    clearToken: state => {
      state.accessToken = null
    },
  },
})

export const { setToken, clearToken, setUserAuthData } = signInSlice.actions
export const signInReducer = signInSlice.reducer
