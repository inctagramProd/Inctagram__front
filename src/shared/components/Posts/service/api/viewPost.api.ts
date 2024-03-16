import { AccessToken } from '@/src/features/auth/signIn/service/types/signInTypes'
import { baseApi } from '@/src/shared/api/baseApi'

export const ViewPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    veiwPosts: builder.query({
      query: page => ({ url: `user-posts/${page}` }),
    }),
  }),
})

export const { useVeiwPostsQuery } = ViewPostsApi
