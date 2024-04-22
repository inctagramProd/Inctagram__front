import { baseApi } from '@/src/shared/api/baseApi'
import { CreatePostResponse } from '@/src/features/post/types/creatPostTypes'

export const createPost = baseApi.injectEndpoints({
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
  }),
  overrideExisting: false,
})

export const { useCreatePostMutation } = createPost


