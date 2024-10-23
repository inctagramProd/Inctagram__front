import { baseApi } from '@/src/shared/api/baseApi'
import { setProfileData } from '@/src/features/profile/edit/model/profileSlice'
import { ProfileData } from '@/src/features/profile/edit/model/types/profileEditTypes'

export const profile = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileData, void>({
      query: data => ({
        body: data,
        url: 'user-profile/me',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)
          dispatch(setProfileData(data))
        } catch (e) {
          console.error('some error occurred: ', e)
        }
      },
      providesTags: ['UserProfile'],
    }),
    updateProfile: build.mutation<ProfileData, FormData>({
      query: data => ({
        body: data,
        method: 'PATCH',
        url: 'user-profile',
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
  overrideExisting: false,
})
export const { useGetProfileQuery, useUpdateProfileMutation } = profile