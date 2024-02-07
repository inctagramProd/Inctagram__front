import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../../../../shared/api/baseQueryWithReauth'
import React from 'react'

export const AuthApi = createApi({
  reducerPath: 'gitAuthApi',
  baseQuery: baseQueryWithReauth,

  endpoints: build => ({
    gitAuth: build.mutation({
      query: (body: object) => ({
        url: '/auth/github-auth',
        method: 'POST',
        body,
      }),
    }),
    GoogleAuth: build.mutation({
      query: (body: object) => ({
        url: '/auth/google-auth',
        method: 'POST',
        body,
      }),
    }),
  }),
  tagTypes: [],
})

export const { useGitAuthMutation, useGoogleAuthMutation } = AuthApi
