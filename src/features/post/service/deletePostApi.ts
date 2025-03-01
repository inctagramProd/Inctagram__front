import { baseApi } from '@/src/shared/api/baseApi'

export const deletePost = baseApi.injectEndpoints({
  endpoints: build => ({
    removePost: build.mutation<any, { postId: number }>({
      query: ({ postId }) => ({
        method: 'DELETE',
        url: `posts/${postId}`,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
})

export const { useRemovePostMutation } = deletePost
