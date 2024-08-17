import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api, getAccessToken } from '@/src/shared'

export const viewPostsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({
    baseUrl: api.serverURL,
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${getAccessToken()}`)
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
