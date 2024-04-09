import { Point } from 'react-easy-crop'
import {FilterImage} from "@/src/shared/helpers/canvasUtils";

type Nullable<T> = T | null

export type CroppedArea = {
    height: number
    width: number
    x: number
    y: number
}


export type ImageURL = {
    imageURL: string
}

type ImageOptions = {
    aspect: number
    crop: Point
    croppedAreaPixels: Nullable<CroppedArea> | null
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
