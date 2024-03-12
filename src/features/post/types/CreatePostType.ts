export type CreatePostResponse = {
  postId: number
  postDescription: string
  createdAt: string
  updatedAt: string
  postImages: PostImage[]
}
export type PostImage = {
  imageId: number
  imageUrl: string
}

export type createPostParams = {
  files: string
  description?: string
}
