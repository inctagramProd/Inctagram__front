import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileDataResponse } from '@/src/features/profile/model/types/profileTypes'

const initialState: ProfileDataResponse = {
  id: null,
  userName: '',
  firstName: '',
  lastName: '',
  city: '',
  country: '',
  region: '',
  dateOfBirth: '',
  aboutMe: '',
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
