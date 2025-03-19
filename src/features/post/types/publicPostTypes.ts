export type GetPostsArgs = {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type ResponsePublicPostsType = {
  totalCount: number
  pageSize: number
  totalUsers: number
  items: PublicPostType[]
}
export type ImagePublicPostType = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}
export type OwnerType = {
  firstName: string
  lastName: string
}
export type PublicPostType = {
  id: number
  userName: string
  description: string
  location: string
  images: ImagePublicPostType[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: OwnerType
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}