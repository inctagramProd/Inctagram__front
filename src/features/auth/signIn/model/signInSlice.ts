'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignInSchema } from '@/src/features/auth/signIn/service/types/signInTypes'

const initialState: SignInSchema = {
  accessToken: null,
}

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken
    },
    clearToken: state => {
      state.accessToken = null
    },
  },
})

export const { setToken, clearToken } = signInSlice.actions
export const signInReducer = signInSlice.reducer
