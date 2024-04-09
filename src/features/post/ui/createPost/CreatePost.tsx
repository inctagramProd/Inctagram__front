import React, { useState } from 'react'
import { Button } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useAppDispatch, useAppSelector } from '@/src/app/store/store'
import {
  resetImage,
  setCroppedImage,
  setImage,
  setImagesWithFilters,
} from '@/src/entities/post/model/slice/postSlice'
import { UpLoaderImage } from '@/src/entities/post/ui/upLoaderImage/UpLoaderImage'
import { useToast } from '@/src/app/hooks/useToast'
import { getModifiedImage } from '@/src/shared/helpers/canvasUtils'
import { CroppedImage } from '@/src/features/post/ui/croppedImage'
import { FilteredImage } from '@/src/features/post/ui/filteredImage'
import { CreatePostModal } from '@/src/entities/post/ui/createPostModal'
import Image from "next/image";

export const CreatePost = () => {
  const images = useAppSelector(state => state.posts?.images)
  const croppedImages = useAppSelector(state => state.posts?.croppedImages)
  const imagesWithFilters = useAppSelector(state => state.posts.imagesWithFilters)

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
    const croppedImages = images.map(
      img =>
        getModifiedImage({
          imageSrc: img.imageURL,
          crop: img.croppedAreaPixels,
          mode: 'url',
        }) as Promise<string>
    )

    Promise.all(croppedImages)
      .then(croppedImageURLs => {
        dispatch(setCroppedImage(croppedImageURLs))
        setCurrentWindow('filter')
      })
      .catch(error => {
        useToast({ text: `Error cropping images: ${error}`, error: true })
      })
  }

  const setImagesWithFiltersHandler = () => {
    const imagesWithFilter = croppedImages.map(
      img =>
        getModifiedImage({
          imageSrc: img.imageURL,
          filter: img.filter,
          mode: 'filters',
        }) as Promise<string>
    )

    Promise.all(imagesWithFilter)
      .then(ImageURLs => {
        dispatch(setImagesWithFilters(ImageURLs))
        setCurrentWindow('description')
      })
      .catch(error => {
        useToast({ text: `Error cropping images: ${error}`, error: true })
      })
  }

  const clickNextHandler = () => {
    if (currentWindow === 'crop') {
      setCroppedImageHandler()
    } else if (currentWindow === 'filter') {
      setImagesWithFiltersHandler()
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
        return <FilteredImage images={croppedImages} />
      }
      case currentWindow === 'description': {
        return <div>{imagesWithFilters.map(i => (<Image src={i.imageURL} alt={'100'} width={300} height={300}/>))}</div>
      }
    }
  }
  console.log(croppedImages)

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