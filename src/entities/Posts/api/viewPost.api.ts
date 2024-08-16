import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from '@/src/shared/api/ThirdPartyApi'

const getAccessToken = (): string => {
  const tokenData = JSON.parse(
    localStorage.getItem('Google Data') ||
      localStorage.getItem('Git Data') ||
      localStorage.getItem('accessToken') ||
      ''
  )

  return tokenData?.accessToken || ''
}

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
