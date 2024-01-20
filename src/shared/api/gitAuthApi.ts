import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

export const gitAuthApi = createApi({
  reducerPath: 'gitAuthApi',
  baseQuery: baseQueryWithReauth,

  endpoints: build => ({
    getUser: build.query({
      query: () => 'user', // baseUrl/user
    }),
    addUser: build.mutation({
      query: (body: any) => ({
        url: 'user',
        method: 'POST',
        body,
      }),
    }),
  }),
  tagTypes: [],
})

export const { useGetUserQuery, useAddUserMutation } = gitAuthApi

//
