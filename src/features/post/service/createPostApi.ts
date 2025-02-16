import { baseApi } from '@/src/shared/api/baseApi'
import { CreatePostSchema } from '@/src/features/post/types/creatPostTypes'

export const createPost = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostSchema, FormData>({
      query: body => ({
        method: 'POST',
        url: 'posts/image',
        body,
      }),
      // TODO: refactor invalidatesTags
      invalidatesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePostMutation } = createPost


