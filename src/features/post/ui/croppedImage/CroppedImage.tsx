import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cropper, { Point } from 'react-easy-crop'
import { SliderArrowIcon } from '@/src/shared/assets/icons/SliderArrowIcon'
import { AddImage, AspectRatioImage, ZoomImage } from '@/src/entities/post/ui'
import { CroppedArea, ImageObj } from '@/src/entities/post/model/types/postSliceTypes'
import { useAppDispatch } from '@/src/app/store/store'
import { removeImage, setImage, updateImage } from '@/src/entities/post/model/slice/postSlice'
import {CurrentWindow} from "@/src/features/post/ui/createPost/CreatePost";

type Props = {
  images: ImageObj[]
  setCurrentWindow: (currentWindow: CurrentWindow) => void
}

type SamplePrevArrow = {
  onClick?: () => void
  direction?: 'left' | 'right'
}
const SliderArrows = ({ direction, onClick }: SamplePrevArrow) => {
  return (
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '2px',
        backgroundColor: '#171717',
        opacity: '50%',
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        visibility: onClick === null ? 'hidden' : 'visible',
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        left: direction === 'left' ? '10px' : undefined,
        right: direction === 'right' ? '10px' : undefined,
        zIndex: '10',
      }}
      onClick={onClick}
    >
      <SliderArrowIcon direction={direction} />
    </div>
  )
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear',
  mobileFirst: true,
  nextArrow: <SliderArrows direction="left" />,
  prevArrow: <SliderArrows direction="right" />,
}

export const CroppedImage = ({ images, setCurrentWindow }: Props) => {

  const dispatch = useAppDispatch()

  const setImageHandler = (imageURL: string) => {
    dispatch(setImage(imageURL))
  }
  const removeImageHandler = (imageURL: string) => {
    if (images.length === 1) {
      setCurrentWindow('upload')
    }
    dispatch(removeImage(imageURL))
  }


  return (
      <Slider arrows={images.length !== 1} {...settings}>
      {images.map((img, index) => {
        const handleChangeCrop = (crop: Point) => {
          dispatch(updateImage({ crop, imageURL: img.imageURL }))
        }
        const handleCropComplete =
          (imageURL: string) => (_: Point, croppedAreaPixels: CroppedArea) => {
            if (croppedAreaPixels) {
              dispatch(updateImage({ croppedAreaPixels, imageURL }))
            }
          }
        const onZoomChange = (zoom: number) => {
          dispatch(updateImage({ imageURL: img.imageURL, zoom }))
        }
        return (
          <div key={index} className="w-[492px] h-[492px]">
            <Cropper
              image={img.imageURL}
              objectFit="contain"
              showGrid={true}
              crop={img.crop}
              zoom={img.zoom}
              aspect={img.aspect}
              onCropChange={handleChangeCrop}
              onCropComplete={handleCropComplete(img.imageURL)}
              onZoomChange={onZoomChange}
            />
            <div className="absolute bottom-0 left-0 flex items-center w-full">
              <div className="flex gap-x-6 ml-3">
                <AspectRatioImage imageURL={img.imageURL} aspectRatio={img.aspect} />
                <ZoomImage imageURL={img.imageURL} zoom={img.zoom} />
              </div>
              <div className="ml-auto m-3">
                <AddImage
                  images={images}
                  setImages={setImageHandler}
                  removeImages={removeImageHandler}
                />
              </div>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}