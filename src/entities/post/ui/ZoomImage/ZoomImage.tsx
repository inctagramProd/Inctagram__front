import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import { Icon } from '@/src/shared/ui'
import { useAppDispatch } from '@/src/app/store/store'
import { updateImage } from '@/src/entities/post/model/slice/postSlice'

type Props = {
  imageURL: string
  zoom: number
}

export const ZoomImage = ({ zoom, imageURL }: Props) => {
  const [isOpenZoom, setIsOpenZoom] = useState<boolean>(false)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>

  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addRef.current && !e.composedPath().includes(addRef.current)) {
        setIsOpenZoom(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  const onZoomChange = (event: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(event.target.value)
    dispatch(updateImage({ imageURL, zoom: scale }))
  }

  return (
    <div
      ref={addRef}
      className="relative w-9 h-9 flex items-center justify-center rounded-sm bg-dark-500 bg-opacity-75"
    >
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsOpenZoom(prev => !prev)
        }}
      >
        <Icon
          iconName="zoomIcon"
          width={26}
          height={26}
          iconStyle={`${isOpenZoom && 'fill-primary-500'} fill-light-100 hover:fill-primary-500`}
        />
      </div>
      {isOpenZoom && (
        <div className="absolute w-[124px] h-9 -top-10 left-0 flex items-center justify-center rounded-sm bg-dark-500 bg-opacity-75">
          <input
            className="w-[100px] h-[2px] cursor-pointer"
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={onZoomChange}
          />
        </div>
      )}
    </div>
  )
}

