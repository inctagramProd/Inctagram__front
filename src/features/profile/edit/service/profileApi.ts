import { baseApi } from '@/src/shared/api/baseApi'

export const profile = baseApi.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileData, void>({
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

export const { useGetProfileQuery, useUpdateProfileMutation } = profile

// type

export type UpdateProfileData = {
  profileImage: File | null
  username: string
  firstName: string
  lastName: string
  dateOfBirth: string | null
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