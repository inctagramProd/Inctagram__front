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
type Comment = {
  name: string
  comment: string
  data: string
}

export type CircleBlocksProps = {
  imagesLen: number
  imgNumber: number
  setImgNumber: (imgNumber: number) => void
}

export type PostProps = {
  comments: any
  name: string
  postDescription: string | null
  images: Img[]
  likes: Like[]
  avatarUrl: string
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
  avatarUrl?: string
  className?: string
  onClickImage?: () => void
}
