import { baseApi } from '@/src/shared/api/baseApi'

export const editProfile = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<any, void>({
      query: data => ({
        body: data,
        url: 'user-profile/me',
      }),
    }),
    updateProfile: build.mutation<any, any>({
      query: data => ({
        body: data,
        method: 'PATCH',
        url: 'user-profile',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetProfileQuery, useUpdateProfileMutation } = editProfile
