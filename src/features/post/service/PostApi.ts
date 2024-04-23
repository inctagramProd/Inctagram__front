import { baseApi } from '@/src/shared/api/baseApi'
import { CreatePostResponse } from '@/src/features/post/types/creatPostTypes'

export const postApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostResponse, FormData>({
      query: body => ({
        method: 'POST',
        url: 'user-posts',
        body,
      }),
      // TODO: refactor invalidatesTags
      invalidatesTags: ['Posts'],
    }),
    deletePost: build.mutation<void, number>({
      query: postId => ({
        method: 'POST',
        url: `user-posts/${postId}`,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePostMutation, useDeletePostMutation } = postApi
