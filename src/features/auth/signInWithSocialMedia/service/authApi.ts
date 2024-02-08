import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../../../../shared/api/baseQueryWithReauth'
import React from 'react'
import { setToken } from '@/src/features/auth/signIn/model/signInSlice'
import { AccessToken, SingInParams } from '@/src/features/auth/signIn/service/types/signInTypes'
import { baseApi } from '@/src/shared/api/baseApi'

export const AuthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    gitAuth: build.mutation({
      query: (body: object) => ({
        url: '/auth/github-auth',
        method: 'POST',
        body,
      }),
    }),
    GoogleAuth: build.mutation<AccessToken, SingInParams>({
      query: (body: object) => ({
        url: '/auth/google-auth',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.accessToken) {
            console.log(data)
            dispatch(setToken({ accessToken: data.accessToken }))
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),

  overrideExisting: false,
})

export const { useGitAuthMutation, useGoogleAuthMutation } = AuthApi
