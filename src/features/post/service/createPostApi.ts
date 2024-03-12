import { baseApi } from '@/src/shared/api/baseApi'
import { createPostParams, CreatePostResponse } from '@/src/features/post/types/CreatePostType'

export const createPost = baseApi.injectEndpoints({
  endpoints: build => ({
    createPost: build.mutation<CreatePostResponse, createPostParams>({
      query: data => ({
        method: 'POST',
        url: 'user-posts',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useCreatePostMutation} = createPost

//const formData = new FormData();
//     formData.append("image", file);