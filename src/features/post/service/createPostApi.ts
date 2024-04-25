import { baseApi } from '@/src/shared/api/baseApi'
import { CreatePostSchema, GetPostResponse, EditPostArgs } from '@/src/features/post/types/creatPostTypes'

export const createPost = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostSchema, FormData>({
      query: body => ({
        method: 'POST',
        url: 'user-posts',
        body,
      }),
      // TODO: refactor invalidatesTags
      invalidatesTags: ['Posts'],
    }),
    getPost: build.query<GetPostResponse, number>({
      query: id => ({
        method: 'GET',
        url: `user-posts/${id}`,
      }),
      providesTags: ['Posts'],
    }),
    editPost: build.mutation<CreatePostSchema, EditPostArgs>({
      query: body => ({
        method: 'PATCH',
        url: 'user-posts',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePostMutation, useGetPostQuery, useEditPostMutation } = createPost


