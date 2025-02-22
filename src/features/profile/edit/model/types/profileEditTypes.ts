export type ProfileData = {
  userName: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  city: string
  aboutMe: string
  userId: number | null
  createdAt: string
  updatedAt: string
  deletedAt: string
  profileImageURL: string | undefined
  canModify: boolean
}

export type ProfileDataResponse = {
  id: number | null
  userName: string
  firstName: string | null
  lastName: string | null
  city: string | null
  country: string | null
  region: string | null
  dateOfBirth: string | null
  aboutMe: string | null
  createdAt: string
  avatars: ProfileDataAvatars
}

export type ProfileDataUpdate = {
  userName: string
  firstName: string
  lastName: string
  city: string
  country: string
  region?: string
  dateOfBirth: string
  aboutMe: string
}

export type ProfileDataAvatars = [
  {
    url: string
    width: number
    height: number
    fileSize: number
    createdAt: string
  }
]
