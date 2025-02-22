import { baseApi } from '@/src/shared/api/baseApi'
import {
  CreatePostRequest,
  CreatePostResponse,
  UploadImageResponse,
} from '@/src/features/post/types/creatPostTypes'

export const createPost = baseApi.injectEndpoints({
  endpoints: build => ({
    upLoadImagesPost: build.mutation<UploadImageResponse, FormData>({
      query: body => ({
        method: 'POST',
        url: 'posts/image',
        body,
      }),
      // TODO: refactor invalidatesTags
      invalidatesTags: ['Posts'],
    }),
    createDescriptionPost: build.mutation<CreatePostResponse, CreatePostRequest>({
      query: body => ({
        method: 'POST',
        url: 'posts',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useUpLoadImagesPostMutation, useCreateDescriptionPostMutation } = createPost
