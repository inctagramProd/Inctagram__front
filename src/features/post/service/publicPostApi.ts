import { baseApi } from '@/src/shared/api/baseApi'
import { GetPostsArgs, GetPublicPostsResponse } from '@/src/features/post/types/publicPostTypes'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllPublicPosts: build.query<GetPublicPostsResponse, GetPostsArgs>({
      query: ({ pageSize = 4, sortDirection = 'desc', ...rest}) => ({
        params: { pageSize, sortDirection, ...rest },
        url: `public-posts/all`,
      }),
    }),
  })
})

export const {useGetAllPublicPostsQuery} = publicPostApi