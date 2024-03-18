import { baseApi } from '@/src/shared/api/baseApi'
import { CreatePostResponse } from '@/src/features/post/types/CreatePostType'

export const createPost = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostResponse, FormData>({
      query: data => ({
        method: 'POST',
        url: 'user-posts',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePostMutation } = createPost
