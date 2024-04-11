import { Icon } from '@/src/shared/ui'
import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { uploadFile } from '@/src/shared/helpers/uploadFile'
import { useToast } from '@/src/app/hooks/useToast'
import { ImageObj } from '@/src/entities/post/model/types/postSliceTypes'

type Props = {
  images: ImageObj[]
  setImages: (imageURL: string) => void
  removeImages: (ImageURL: string) => void
}

export const AddImage = ({ images, setImages, removeImages }: Props) => {
  const [isOpenAddImage, setIsOpenAddImage] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => {
      if (addRef.current && !e.composedPath().includes(addRef.current)) {
        setIsOpenAddImage(false)
      }
    }
    document.body.addEventListener('click', clickOutsideHandler)
    return () => document.body.removeEventListener('click', clickOutsideHandler)
  }, [])

  const uploadImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    //TODO зарефакторить
    await uploadFile(event).then(imageURL => {
      if (imageURL && images.length <= 9) {
        const { url } = imageURL
        setImages(url)
      } else {
        useToast({ text: 'разместить можно не более 10 изображений', error: true })
      }
    })
  }

  const deleteImageHandler = (imageURL: string) => {
    removeImages(imageURL)
  }

  const pickHandler = () => {
    inputRef.current?.click()
  }

  return (
    <div
      ref={addRef}
      className="w-9 h-9 flex items-center justify-center rounded-sm bg-dark-500 bg-opacity-75"
    >
      {isOpenAddImage && (
        <div className="absolute right-3 bottom-14">
          <input
            ref={inputRef}
            onChange={uploadImageHandler}
            type="file"
            accept="image*/,.png,.jpeg,.jpg"
            className="hidden"
          />
          <div className="flex gap-3 flex-wrap py-3 pl-3 pr-14 max-w-[425px] rounded-sm bg-dark-500 bg-opacity-75">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <span
                  className="absolute top-[2px] right-[2px] p-[3px] rounded-sm bg-dark-300 bg-opacity-75 cursor-pointer"
                  onClick={() => {
                    deleteImageHandler(img.imageURL)
                  }}
                >
                  <Icon
                    iconName="closeIcon"
                    width={16}
                    height={16}
                    iconStyle="fill-light-100 hover:fill-primary-500"
                  />
                </span>
                <Image
                  src={img.imageURL}
                  width={80}
                  height={82}
                  alt="image"
                  className="max-w-[80px] h-[82px] w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div onClick={pickHandler} className="absolute top-3 right-3 cursor-pointer max-h-full">
            <Icon
              iconName="plusCircleOutlineIcon"
              width={36}
              height={36}
              iconStyle="fill-light-100 hover:fill-primary-500"
            />
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setIsOpenAddImage(prevState => !prevState)
        }}
        className="cursor-pointer"
      >
        <Icon
          iconName="imgOutlineIcon"
          width={24}
          height={24}
          iconStyle={'fill-light-100 hover:fill-primary-500'}
        />
      </div>
    </div>
  )
}

