import { baseApi } from '@/src/shared/api/baseApi'

export const editProfile = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<any, void>({
      query: data => ({
        body: data,
        url: 'user-profile/me',
      }),
    }),
    updateProfile: build.mutation<ProfileData, FormData>({
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

// type

export type UpdateProfileData = {
  profileImage: File | null
  username: string
  firstName: string
  lastName: string
  dateOfBirth: Date | null
  country: string
  city: string
  aboutMe: string
}

export type ProfileData = {
  username: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  city: string
  aboutMe: string
  userId: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  profileImageURL: string
  canModify: boolean
}