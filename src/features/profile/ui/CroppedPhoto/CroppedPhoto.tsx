import Cropper, { Point } from 'react-easy-crop'
import { useState } from 'react'
import { Button } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { CroppedArea } from '@/src/shared/types'

type Props = {
  selectedImageUrl: string
  onSetCroppedArea: (croppedArea: CroppedArea) => void
}

export const CroppedPhoto = ({ selectedImageUrl, onSetCroppedArea }: Props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)

  const cropCompleteHandler = (_: Point, croppedAreaPixels: CroppedArea) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleSetCroppedArea = () => {
    if (croppedAreaPixels) {
      onSetCroppedArea(croppedAreaPixels)
    }
  }

  const { locale } = useTranslate()

  return (
    <div className={'flex flex-col items-center w-full h-full mt-7'}>
      <div className={'relative w-[322px] h-[340px]'}>
        <Cropper
          aspect={1}
          image={selectedImageUrl}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={cropCompleteHandler}
          objectFit="cover"
          cropShape="round"
          showGrid={false}
        />
      </div>
      <div className={'mt-10 ml-auto'}>
        <Button label={locale.profile.save} style={'primary'} onClick={handleSetCroppedArea} />
      </div>
    </div>
  )
}

