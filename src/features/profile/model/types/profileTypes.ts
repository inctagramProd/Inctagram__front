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
  firstName: string
  lastName: string
  city: string
  country: string
  region: string
  dateOfBirth: string
  aboutMe: string
  createdAt: string
  avatars: ProfileDataAvatar[]
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

export type ProfileDataAvatar = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}
export type GetTotalUsersResponse = {
  totalCount: number
}
