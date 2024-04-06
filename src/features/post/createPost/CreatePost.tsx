import React, { useState } from 'react'
import { Button } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useAppDispatch, useAppSelector } from '@/src/app/store/store'
import { resetImage, setCroppedImage, setImage } from '@/src/entities/post/model/slice/postSlice'
import { UpLoaderImage } from '@/src/entities/post/ui/upLoaderImage/UpLoaderImage'
import { CroppedImage } from '@/src/features/post/createPost/editImage/croppedImage'
import { CreatePostModal } from '@/src/features/post/createPost/createPostModal'
import { getCroppedImg } from '@/src/features/post/createPost/canvasUtils'
import Image from 'next/image'
import {useToast} from "@/src/app/hooks/useToast";

export const CreatePost = () => {
  const images = useAppSelector(state => state.posts?.images)
  const croppedImages = useAppSelector(state => state.posts?.croppedImages)
  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('upload')
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false)
  const { locale } = useTranslate()

  const isBigSizeScreen = currentWindow === 'filter' || currentWindow === 'description'

  const dispatch = useAppDispatch()

  const titles: Record<CurrentWindow, string> = {
    upload: locale.profile.addPostPhoto,
    crop: locale.profile.addNewPost.cropping,
    filter: locale.profile.addNewPost.filters,
    description: locale.profile.addNewPost.addDescription,
  }

  const setImageHandler = (imageURL: string) => {
    dispatch(setImage(imageURL))
    setCurrentWindow('crop')
  }

  const setCroppedImageHandler = () => {
    const croppedImages = images.map(img => getCroppedImg(img.imageURL, img.croppedAreaPixels))

    Promise.all(croppedImages)
      .then(croppedImageURLs => {
        dispatch(setCroppedImage(croppedImageURLs))
        setCurrentWindow('filter')
      })
      .catch(error => {
        useToast({text:'Error cropping images:', error:true})
      })
  }

  const clickNextHandler = () => {
    if (currentWindow === 'crop') {
      setCroppedImageHandler()
    } else if (currentWindow === 'filter') {
    }
  }

  const renderWindow = (currentWindow: CurrentWindow) => {
    switch (true) {
      case !images.length && currentWindow === 'upload': {
        return <UpLoaderImage setImage={setImageHandler} />
      }
      case currentWindow === 'crop': {
        return <CroppedImage images={images} setCurrentWindow={setCurrentWindow} />
      }
      case currentWindow === 'filter': {
        return (
          <div className='flex'>
            {' '}
            {croppedImages?.map(img => (
              <Image src={img.imageURL} alt={'ll'} width={320} height={180} />
            ))}
          </div>
        )
      }
      case currentWindow === 'description': {
        return 'description'
      }
    }
  }
  console.log(images)

  return (
    <div>
      {isBaseModalOpen && (
        <CreatePostModal
          className={`${isBigSizeScreen ? 'max-w-[972px]' : 'max-w-[492px]'}  w-full h-[564px]`}
          title={titles[currentWindow]}
          onNextClick={clickNextHandler}
          isOpen={isBaseModalOpen}
          onCancel={() => {
            setIsBaseModalOpen(prev => !prev)
            dispatch(resetImage())
            setCurrentWindow('upload')
          }}
        >
          {renderWindow(currentWindow)}
        </CreatePostModal>
      )}
      <Button
        variant="medium_14"
        iconName={'PlusSquare'}
        label={locale.profile.createPost}
        style="default"
        onClick={() => {
          setIsBaseModalOpen(true)
        }}
      />
    </div>
  )
}

export type CurrentWindow = 'description' | 'crop' | 'filter' | 'upload'