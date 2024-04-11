import { baseApi } from '@/src/shared/api/baseApi'

export const createPost = baseApi.injectEndpoints({
  endpoints: build => ({
    getPosts: build.query<any[], number>({
      query: arg => ({
        method: 'GET',
        url: `user-posts/${arg}`,
      }),
      providesTags: ['Posts'],
    }),
    createPost: build.mutation<CreatePostResponse, FormData>({
      query: body => ({
        method: 'POST',
        url: 'user-posts',
        body: {
            files: body,
            description: 'text post'
        },
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreatePostMutation, useGetPostsQuery } = createPost


export type CreatePostResponse = {
	postId: number;
	postDescription: string;
	createdAt: string;
	updatedAt: string;
	postImages: PostImage[];
}
export type PostImage = {
	imageId: number;
	imageUrl: string;
}

type CreatePostArgs = {
  files: FormData
  description: string
}