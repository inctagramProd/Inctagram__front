import React from 'react'
import Cropper, { Point } from 'react-easy-crop'
import { updateImage } from '@/src/entities/post/model/slice/postSlice'
import { CroppedArea, ImageObj } from '@/src/entities/post/model/types/postSliceTypes'
import { useAppDispatch } from '@/src/app/store/store'

type Props = {
  image: ImageObj
}

export const CropperImage = ({ image }: Props) => {
  const dispatch = useAppDispatch()

  const handleChangeCrop = (crop: Point) => {
    dispatch(updateImage({ crop, imageURL: image.imageURL }))
  }
  const handleCropComplete = (imageURL: string) => (_: Point, croppedAreaPixels: CroppedArea) => {
    if (croppedAreaPixels) {
      dispatch(updateImage({ croppedAreaPixels, imageURL }))
    }
  }
  const onZoomChange = (zoom: number) => {
    dispatch(updateImage({ imageURL: image.imageURL, zoom }))
  }
  return (
    <Cropper
      image={image.imageURL}
      objectFit="contain"
      showGrid={true}
      crop={image.crop}
      zoom={image.zoom}
      aspect={image.aspect}
      onCropChange={handleChangeCrop}
      onCropComplete={handleCropComplete(image.imageURL)}
      onZoomChange={onZoomChange}
    />
  )
}

