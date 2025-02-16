import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileData } from '@/src/features/profile/edit/model/types/profileEditTypes'

const initialState: ProfileData = {
  username: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  country: '',
  city: '',
  aboutMe: '',
  userId: null,
  createdAt: '',
  updatedAt: '',
  deletedAt: '',
  profileImageURL: '',
  canModify: false,
}

export const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<ProfileData>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setProfileData } = profileSlice.actions
export const profileReducer = profileSlice.reducer