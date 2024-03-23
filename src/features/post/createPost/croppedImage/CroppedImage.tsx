import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { getCroppedImg } from '@/src/features/post/createPost/canvasUtils'
import { CropModal } from '@/src/features/post/createPost/cropModal'

type Props = {
  imageSrc: string
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
}

export const CroppedImage = ({ imageSrc, isOpenModal, setIsOpenModal }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArg>()
  const [croppedImage, setCroppedImage] = useState<string | undefined>('')
  const { locale } = useTranslate()

  const onCropComplete = (croppedArea: CropArg, croppedAreaPixels: CropArg) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
      setCroppedImage(croppedImage)
    } catch (error) {
      console.error('error cropped image: ', error)
    }
  }

  return (
    <CropModal
      className=""
      isOpen={isOpenModal}
      callback={showCroppedImage}
      onCancel={() => {
        setIsOpenModal(false)
      }}
    >
      {croppedImage ? (
        <div className="border ">
          <img src={croppedImage} alt="img" className="object-contain" />
        </div>
      ) : (
        <div className="">
          <div className="relative w-full h-[360px]">
            <Cropper
              image={imageSrc}
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
          <div className="absolute left-0 bottom-0">
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