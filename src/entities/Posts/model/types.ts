import { SetStateAction } from 'react'

type Img = {
  imageId: number
  imageUrl: string
}
type Like = {
  name: string
  like: boolean
  avatar: string
}
export type Comment = {
  name: string
  comment: string
  date: string
  avatar: string
}

export type CircleBlocksProps = {
  imagesLen: number
  imgNumber: number
  setImgNumber: (imgNumber: number) => void
}

export type PostProps = {
  name: string
  avatarUrl: string
  postDescription: string | null
  images: Img[]
  likes: Like[]
  comments: Comment[]
}
export type SliderArrowProps = {
  imgItem: number
  direction: 'left' | 'right'
  images: Img[]
  setImgItem: (value: SetStateAction<number>) => void
}
export type PostIconButtonProps = {
  iconName: string
  logMessage: string
}
export type AvatarImageLinkProps = {
  size?: 'small' | 'regular'
  src?: string
  className?: string
  onClickImage?: () => void
}
