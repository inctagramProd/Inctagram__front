type Img = {
  imageId: number
  imageUrl: string
}
type Like = {
  name: string
  like: boolean
  avatar: string
}
type Comment = {
  name: string
  comment: string
  data: string
}
export type PostProps = {
  comments: any
  name: string
  images: Img[]
  postDescription: string | null
  likes: Like[]
  avatarUrl: string
}
