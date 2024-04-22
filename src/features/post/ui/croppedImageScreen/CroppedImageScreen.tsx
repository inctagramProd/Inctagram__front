import React from 'react'
import { AddImage, AspectRatioImage, CropperImage, ZoomImage } from '@/src/entities/post/ui'
import { ImageObj } from '@/src/entities/post/model/types/postSliceTypes'
import { SlickSlider } from '@/src/shared/ui/Slider/Slider'
import {CurrentWindow} from "@/src/features/post/types/creatPostTypes";

type Props = {
  images: ImageObj[]
  setCurrentWindow: (currentWindow: CurrentWindow) => void
}

export const CroppedImageScreen = ({ images, setCurrentWindow }: Props) => {
  return (
    <SlickSlider isShowNavigation={images.length !== 1}>
      {images.map((image, index) => {
        return (
          <div key={index} className="w-[492px] h-[500px]">
            <CropperImage image={image} />
            <div className="absolute bottom-2 left-0 flex items-center w-full">
              <div className="flex gap-x-6 ml-3">
                <AspectRatioImage imageURL={image.imageURL} aspectRatio={image.aspect} />
                <ZoomImage imageURL={image.imageURL} zoom={image.zoom} />
              </div>
              <div className="ml-auto m-3">
                <AddImage images={images} setCurrentWindow={setCurrentWindow} />
              </div>
            </div>
          </div>
        )
      })}
    </SlickSlider>
  )
}