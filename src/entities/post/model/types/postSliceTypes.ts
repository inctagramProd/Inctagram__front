import { Point } from 'react-easy-crop'
import { FilterImage } from '@/src/shared/helpers/canvasUtils'
import { CroppedArea } from '@/src/shared/types/CroppedArea'

type Nullable<T> = T | null

export type ImageURL = {
  imageURL: string
}

type ImageOptions = {
  aspect: number
  crop: Point
  croppedAreaPixels: Nullable<CroppedArea>
  zoom: number
}

export type ImageObj = ImageURL & ImageOptions

export type UpdateImageModel = ImageURL & Partial<ImageObj>

export type CroppedImage = ImageURL & { filter: FilterImage }

export type PostsState = {
  croppedImages: CroppedImage[]
  images: ImageObj[]
  imagesWithFilters: ImageURL[]
}
