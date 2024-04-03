import { PostImage } from '@/src/features/post/createPost/CreatePost'
import { Icon } from '@/src/shared/ui'
import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { uploadFile } from '@/src/shared/helpers/uploadFile'
import { v4 as uuidv4 } from 'uuid'
import { useToast } from '@/src/app/hooks/useToast'

type Props = {
  images: PostImage[]
  setImages: (images: PostImage[]) => void
}

export const AddImage = ({ images, setImages }: Props) => {
  const [isOpenAddImage, setIsOpenAddImage] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const addRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addRef.current && !e.composedPath().includes(addRef.current)) {
        setIsOpenAddImage(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  const uploadImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    await uploadFile(event).then(imageUrl => {
      if (imageUrl && images.length <= 9) {
        console.log('added image', images.length)
        setImages([...images, { id: uuidv4(), url: imageUrl.url }])
      } else {
        useToast({ text: 'разместить можно не более 10 изображений', error: true })
      }
    })
  }

  const deleteImageHandler = (id: string) => {
    let deletedImages = images.filter(img => img.id !== id)
    setImages(deletedImages)
  }

  const handlerPick = () => {
    inputRef.current?.click()
  }

  return (
    <div
      ref={addRef}
      className="w-9 h-9 flex items-center justify-center rounded-sm bg-dark-500 bg-opacity-75"
    >
      {isOpenAddImage ? (
        <div className="absolute right-3 bottom-14">
          <input
            ref={inputRef}
            onChange={uploadImageHandler}
            type="file"
            accept="image*/,.png,.jpeg,.jpg"
            className="hidden"
          />
          <div className="flex gap-3 flex-wrap py-3 pl-3 pr-14 max-w-[425px] rounded-sm bg-dark-500 bg-opacity-75">
            {images.map((i, index) => (
              <div key={index} className="relative">
                <span
                  className="absolute top-[2px] right-[2px] p-[3px] rounded-sm bg-dark-300 bg-opacity-75 cursor-pointer"
                  onClick={() => {
                    deleteImageHandler(i.id)
                  }}
                >
                  <Icon
                    iconName="closeIcon"
                    width={16}
                    height={16}
                    iconStyle={'fill-light-100 hover:fill-primary-500'}
                  />
                </span>
                <Image
                  src={i.url}
                  width={80}
                  height={82}
                  alt="image"
                  className="max-w-[80px] h-[82px] w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div onClick={handlerPick} className="absolute top-3 right-3 cursor-pointer max-h-full">
            <Icon
              iconName="plusCircleOutlineIcon"
              width={36}
              height={36}
              iconStyle={'fill-light-100 hover:fill-primary-500'}
            />
          </div>
        </div>
      ) : (
        ''
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

