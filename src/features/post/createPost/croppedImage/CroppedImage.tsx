import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { getCroppedImg } from '@/src/features/post/createPost/canvasUtils'
import { CropModal } from '@/src/features/post/createPost/cropModal'
import { PostImage } from '@/src/features/post/createPost/CreatePost'
import Image from 'next/image'

type Props = {
  images: PostImage[]
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear',
}

export const CroppedImage = ({ images, isOpenModal, setIsOpenModal }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArg>()
  const [croppedImage, setCroppedImage] = useState<string | undefined>('')
  const { locale } = useTranslate()

  const onCropComplete = (croppedArea: CropArg, croppedAreaPixels: CropArg) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  const showCroppedImage = async (imgUrl: string) => {
    try {
      const croppedImage = await getCroppedImg(imgUrl, croppedAreaPixels, rotation)
      setCroppedImage(croppedImage)
    } catch (error) {
      console.error('error cropped image: ', error)
    }
  }

  return (
    <CropModal
      className=""
      isOpen={isOpenModal}
      callback={() => {}}
      onCancel={() => {
        setIsOpenModal(false)
      }}
    >
      {croppedImage ? (
        <div className="">
          <Image src={croppedImage} alt="img" width={100} height={100} />
        </div>
      ) : (
        images.map(img => {
          return (
            <Slider {...settings}>
              <div className="">
                <div className="relative w-full h-[360px]">
                  <Cropper
                    image={img.url}
                    objectFit="contain"
                    showGrid={true}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div className="absolute left-0 bottom-5 ">
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={e => {
                      setZoom(+e.target.value)
                    }}
                    className=""
                  />
                </div>
              </div>
            </Slider>
          )
        })
      )}
    </CropModal>
  )
}

// types
enum AspectRatio {
  '1/1' = 1,
  '4/5' = 4 / 5,
  '16/9' = 16 / 9,
}

export type CropArg = {
    height: number
    width: number
    x: number
    y: number
}