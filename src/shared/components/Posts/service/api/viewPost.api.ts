import { baseApi } from '@/src/shared/api/baseApi'

const accessToken = (): string | null => {
  const dataString = localStorage.getItem('Google Data')
  if (dataString) {
    const data = JSON.parse(dataString)
    if (data && data.accessToken && typeof data.accessToken === 'string') {
      return data.accessToken
    }
  }
  return null
}

export const viewPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    viewPosts: builder.query({
      query: page => ({
        url: `user-posts/${page}`,
        headers: {
          Authorization: `Bearer ${accessToken()}`,
        },
      }),
    }),
  }),
})

export const { useViewPostsQuery } = viewPostsApi
