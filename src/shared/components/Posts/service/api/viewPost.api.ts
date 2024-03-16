import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from '@/src/shared/api/ThirdPartyApi'

export const viewPostsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({
    baseUrl: api.serverURL,
    prepareHeaders: (headers, { getState }) => {
      const google = localStorage.getItem('Google Data')
      const git = localStorage.getItem('Git Data')
      const signIn = localStorage.getItem('accessToken')
      let access
      if (google) {
        access = JSON.parse(google).accessToken
      } else if (git) {
        access = JSON.parse(git).accessToken
      } else if (signIn) {
        access = JSON.parse(signIn).signIn.accessToken
      }
      headers.set(
        'Authorization',
        `Bearer ${
          /* access */ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMDU5ODE0MCwiZXhwIjoxNzEwNTk5MDQwfQ.EqU7dvKJokKo929ytRoRVPYG_GQ95OT1WUDdw4dC1-0'
        }`
      )
    },
  }),
  endpoints: builder => ({
    viewPosts: builder.query({
      query: page => ({
        url: `/user-posts/${page}`,
      }),
    }),
  }),
})

export const { useViewPostsQuery } = viewPostsApi
