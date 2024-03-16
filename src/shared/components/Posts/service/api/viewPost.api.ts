import { baseApi } from '@/src/shared/api/baseApi'

const accessToken = () => {
  console.log(localStorage.getItem('accessToken'))
  return localStorage.getItem('accessToken')
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
