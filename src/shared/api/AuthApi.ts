import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

export const AuthApi = createApi({
  reducerPath: 'gitAuthApi',
  baseQuery: baseQueryWithReauth,

  endpoints: build => ({
    gitAuth: build.mutation({
      query: (body: any) => ({
        url: '/auth/github-auth',
        method: 'POST',
        body,
      }),
    }),
    GoogleAuth: build.mutation({
      query: (body: any) => ({
        url: '/auth/github-auth',
        method: 'POST',
        body,
      }),
    }),
  }),
  tagTypes: [],
})

export const { useGitAuthMutation, useGoogleAuthMutation } = AuthApi
