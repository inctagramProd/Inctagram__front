import { Icon } from '@/src/shared/ui'
import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { uploadFile } from '@/src/shared/helpers/uploadFile'
import { useToast } from '@/src/app/hooks/useToast'
import { ImageObj } from '@/src/entities/post/model/types/postSliceTypes'
import { useAppDispatch } from '@/src/app/store/store'
import { removeImage, setImage } from '@/src/entities/post/model/slice/postSlice'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import {CurrentWindow} from "@/src/features/post/types/creatPostTypes";

type Props = {
  images: ImageObj[]
  setCurrentWindow: (currentWindow: CurrentWindow) => void
}
export const AddImage = ({ images, setCurrentWindow }: Props) => {
  const [isOpenAddImage, setIsOpenAddImage] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>
  const { locale } = useTranslate()

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

  const uploadImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    await uploadFile(event, locale).then(imageURL => {
      if (imageURL && images.length <= 9) {
        const { url } = imageURL
        setImageHandler(url)
      }
      if (images.length === 10) {
        useToast({ text: locale.profile.addNewPost.imageError.upload, error: true })
      }
    })
  }
  const pickHandler = () => {
    inputRef.current?.click()
  }
  useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => {
      if (addRef.current && !e.composedPath().includes(addRef.current)) {
        setIsOpenAddImage(false)
      }
    }
    document.body.addEventListener('click', clickOutsideHandler)
    return () => document.body.removeEventListener('click', clickOutsideHandler)
  }, [])

  return (
    <div
      ref={addRef}
      onClick={() => {
        setIsOpenAddImage(prevState => !prevState)
      }}
      className="w-9 h-9 flex items-center justify-center rounded-sm bg-dark-500 bg-opacity-75 cursor-pointer"
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
          <div className="overflow-x-auto scrollbar-thin scrollbar-track-dark-300 scrollbar-thumb-primary-700 py-3 pl-3 pr-14 flex gap-3.5 max-w-[430px] w-full rounded-sm bg-dark-500 bg-opacity-75">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <span
                  className="absolute top-[2px] right-[2px] p-[3px] rounded-sm bg-dark-300 bg-opacity-75 cursor-pointer"
                  onClick={() => {
                    removeImageHandler(img.imageURL)
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
                  className="max-w-[80px] h-[82px] object-cover"
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

      <Icon
        iconName="imgOutlineIcon"
        width={24}
        height={24}
        iconStyle={'fill-light-100 hover:fill-primary-500'}
      />
    </div>
  )
}

