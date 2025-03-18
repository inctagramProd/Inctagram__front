import { baseApi } from '@/src/shared/api/baseApi'

export const publicUserProfile = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicUserProfile: build.query({
      query: profileId => ({
        url: `api/v1/public-user/profile/${profileId}`,
      }),
    }),
  }),
})

export const {useGetPublicUserProfileQuery} = publicUserProfile