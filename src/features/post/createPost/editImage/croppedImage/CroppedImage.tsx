import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { getCroppedImg } from '@/src/features/post/createPost/canvasUtils'
import { CropModal } from '@/src/features/post/createPost/cropModal'
import { PostImage } from '@/src/features/post/createPost/CreatePost'
import Image from 'next/image'
import { AddImage } from '@/src/features/post/createPost/addImage'
import Cropper from 'react-easy-crop'
import { SwiperArrowIcon } from '@/src/shared/assets/icons/SwiperArrowIcon'
import { ZoomImage } from '../zoomImage'
import { AspectRatioImage } from '@/src/features/post/createPost/editImage/aspectRatioImage'

type Props = {
  images: PostImage[]
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  setImages: (images: PostImage[]) => void
}

type SamplePrevArrow = {
  onClick?: () => void
  direction?: 'left' | 'right'
}

function SwiperArrows({ direction, onClick }: SamplePrevArrow) {
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
      <SwiperArrowIcon direction={direction} />
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
  arrows: true,
  nextArrow: <SwiperArrows direction="left" />,
  prevArrow: <SwiperArrows direction="right" />,
}

export const CroppedImage = ({ images, isOpenModal, setIsOpenModal, setImages }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspectRatio, setAspectRatio] = useState<number>(4/3)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArg>()
  const [croppedImage, setCroppedImage] = useState<string[]>([])
  const [showCroppedImage, setShowCroppedImage] = useState<boolean>(false)
  const { locale } = useTranslate()

  const onCropComplete = (croppedArea: CropArg, croppedAreaPixels: CropArg) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  return (
    <CropModal
      isOpen={isOpenModal}
      callback={() => {
        setShowCroppedImage(true)
        console.log('show picture')
      }}
      onCancel={() => {
        setIsOpenModal(false)
      }}
    >
      <Slider {...settings}>
        {showCroppedImage
          ? croppedImage.map((imgSrc: string) => (
              <Image key={imgSrc} src={imgSrc} alt="img" width={200} height={200} />
            ))
          : images.map((img, index) => {
              const showCroppedImage = async (imgUrl: string) => {
                try {
                  const croppedImage = await getCroppedImg(imgUrl, croppedAreaPixels, rotation)
                  console.log(croppedImage)
                  if (croppedImage) setCroppedImage(prev => [...prev, croppedImage])
                } catch (error) {
                  console.error('error cropped image: ', error)
                }
              }

              return (
                <div key={index} className="w-[492px] min-h-[486px]">
                  <Cropper
                    image={img.url}
                    objectFit="contain"
                    showGrid={true}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                  <div className="absolute bottom-0 left-0 flex items-center w-full">
                    {/*<button*/}
                    {/*  onClick={() => {*/}
                    {/*    showCroppedImage(img.url)*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  accept*/}
                    {/*</button>*/}
                    <div className="flex gap-x-6 ml-3">
                      <AspectRatioImage aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}/>
                      <ZoomImage zoom={zoom} setZoom={setZoom} />
                    </div>
                    <div className="ml-auto m-3">
                      <AddImage images={images} setImages={setImages} />
                    </div>
                  </div>
                </div>
              )
            })}
      </Slider>
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