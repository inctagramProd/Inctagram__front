import { baseApi } from '@/src/shared/api/baseApi'
import { Post } from '@/src/features/post/types/CreatePostType'

export const createPost = baseApi.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<Post[], number>({
      query: arg => ({
        method: 'GET',
        url: `user-posts/${arg}`,
      }),
      providesTags: ['Posts'],
    }),
    createPost: build.mutation<Post, FormData>({
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
