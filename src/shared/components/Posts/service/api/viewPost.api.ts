import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from '@/src/shared/api/ThirdPartyApi'

export const viewPostsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({
    baseUrl: api.serverURL,
    prepareHeaders: (headers, { getState }) => {
      const dataString = localStorage.getItem('accessToken')
      if (dataString) {
        const data = JSON.parse(dataString)
        headers.set('Authorization', `Bearer ${data.signIn}`)
      }
      return headers
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
