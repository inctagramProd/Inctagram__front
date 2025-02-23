import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileDataResponse } from '@/src/features/profile/edit/model/types/profileEditTypes'

const initialState: ProfileDataResponse = {
  id: null,
  userName: '',
  firstName: null,
  lastName: null,
  city: null,
  country: null,
  region: null,
  dateOfBirth: null,
  aboutMe: null,
  createdAt: '',
  avatars: [
    {
      url: '',
      width: 0,
      height: 0,
      fileSize: 0,
      createdAt: '',
    },
  ],
}

export const profileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<ProfileDataResponse>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setProfileData } = profileSlice.actions
export const profileReducer = profileSlice.reducer
