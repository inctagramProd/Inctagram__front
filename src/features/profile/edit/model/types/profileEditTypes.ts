export type ProfileEditParams = {
  username: string
  firstName: string
  lastName: string
  country: string
  city: string
  aboutMe: string
  dateOfBirth: string
}

export type ProfileData = {
  username: string
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