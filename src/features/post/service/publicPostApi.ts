import { baseApi } from '@/src/shared/api/baseApi'
import { GetPostsArgs, ResponsePublicPostsType } from '@/src/features/post/types/publicPostTypes'

export const publicPostApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getAllPublicPosts: build.query<ResponsePublicPostsType, GetPostsArgs>({
      query: ({ pageSize = 4, sortDirection = 'desc', ...rest}) => ({
        params: { pageSize, sortDirection, ...rest },
        url: `public-posts/all`,
      }),
    }),
  })
})

export const {useGetAllPublicPostsQuery} = publicPostApi