import { baseApi } from '@/src/shared/api/baseApi'
import { setProfileData } from '@/src/features/profile/edit/model/profileSlice'
import {
  ProfileData,
  ProfileDataAvatar,
  ProfileDataResponse,
  ProfileDataUpdate,
} from '@/src/features/profile/edit/model/types/profileEditTypes'

export const profile = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileDataResponse, void>({
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
            })
          )
        } catch (e) {
          console.error('some error occurred: ', e)
        }
      },
      providesTags: ['UserProfile'],
    }),
    updateProfile: build.mutation<ProfileData, ProfileDataUpdate>({
      query: data => ({
        body: data,
        method: 'PUT',
        url: 'users/profile',
      }),
      invalidatesTags: ['UserProfile'],
    }),
    updatePhotoProfile: build.mutation<ProfileDataAvatar, FormData>({
      query: data => ({
        body: data,
        method: 'POST',
        url: 'users/profile/avatar',
      }),
      invalidatesTags: ['UserProfile'],
    }),
    deletePhotoProfile: build.mutation({
      query: () => ({
        method: 'DELETE',
        url: 'users/profile/avatar',
      }),
      invalidatesTags: ['UserProfile'],
    }),
  }),
  overrideExisting: false,
})
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePhotoProfileMutation,
  useDeletePhotoProfileMutation,
} = profile
