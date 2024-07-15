import { baseApi } from '@/src/shared/api/baseApi'
import { ProfileDataResponse } from '@/src/features/profile/edit/model/types/profileEditTypes'

export const profile = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileDataResponse, void>({
      query: data => ({
        body: data,
        url: 'user-profile/me',
      }),
      providesTags: ['userProfile'],
    }),
    updateProfile: build.mutation<ProfileDataResponse, FormData>({
      query: data => ({
        body: data,
        method: 'PATCH',
        url: 'user-profile',
      }),
      invalidatesTags: ['userProfile'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profile
