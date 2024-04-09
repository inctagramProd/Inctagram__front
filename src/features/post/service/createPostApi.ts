import { baseApi } from '@/src/shared/api/baseApi'

export const createPost = baseApi.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<any[], number>({
      query: arg => ({
        method: 'GET',
        url: `user-posts/${arg}`,
      }),
      providesTags: ['Posts'],
    }),
    createPost: build.mutation<any, FormData>({
      query: body => ({
        method: 'POST',
        url: 'user-posts',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePostMutation, useGetPostsQuery } = createPost
