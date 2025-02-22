export type CurrentWindow = 'description' | 'crop' | 'filter' | 'upload'

export type UploadImageResponse = {
  images: imagePost[]
}

export type CreatePostRequest = {
  description: string
  childrenMetadata: {
    uploadId: string
  }[]
}

export type CreatePostResponse = {
  id: number
  userName: string
  description: string
  location: string
  images: imagePost[]
  createdAt: string
  updatedAt: string
  ownerId: number
  avatarOwner: string
  owner: {
    firstName: string
    lastName: string
  }
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

type imagePost = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}
