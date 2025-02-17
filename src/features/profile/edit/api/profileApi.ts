import { baseApi } from '@/src/shared/api/baseApi'
import { setProfileData } from '@/src/features/profile/edit/model/profileSlice'
import { ProfileData } from '@/src/features/profile/edit/model/types/profileEditTypes'
import { getGoogleDriveImageUrl } from '@/src/shared/lib/utils/getGoogleDriveImageUrl'

export const profile = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileData, void>({
      query: data => ({
        body: data,
        url: 'users/profile',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            setProfileData({
              ...data,
              profileImageURL: getGoogleDriveImageUrl(data.profileImageURL),
            })
          )
        } catch (e) {
          console.error('some error occurred: ', e)
        }
      },
      providesTags: ['UserProfile'],
    }),
    updateProfile: build.mutation<ProfileData, FormData>({
      query: data => ({
        body: data,
        method: 'PUT',
        url: 'users/profile',
      }),
      invalidatesTags: ['UserProfile'],
    }),
    updatePhotoProfile: build.mutation<ProfileData, FormData>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'users/profile/avatar',
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
  overrideExisting: false,
})
export const { useGetProfileQuery, useUpdateProfileMutation, useUpdatePhotoProfileMutation } =
  profile