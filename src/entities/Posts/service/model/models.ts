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
export type PostsProps = {
  comments: any
  name: string
  img: Img[]
  postDescription: string | null
  likes: Like[]
}
