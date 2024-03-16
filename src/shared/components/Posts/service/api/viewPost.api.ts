import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from '@/src/shared/api/ThirdPartyApi'

const accessToken = (): string | null => {
  const dataString = localStorage.getItem('Google Data')
  if (dataString) {
    console.log(dataString)
    const data = JSON.parse(dataString)
    if (data && data.accessToken && typeof data.accessToken === 'string') {
      return data.accessToken
    }
  }
  return null
}

export const viewPostsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: api.serverURL }),
  endpoints: builder => ({
    viewPosts: builder.query({
      query: page => ({
        url: `/user-posts/${page}`,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
        },
      }),
    }),
  }),
})

export const { useViewPostsQuery } = viewPostsApi
