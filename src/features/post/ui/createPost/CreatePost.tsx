import React, { useState } from 'react'
import { Button } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useAppDispatch, useAppSelector } from '@/src/app/store/store'
import {
  resetImage,
  resetImagesWithFilters,
  setCroppedImage,
  setImage,
  setImagesWithFilters,
} from '@/src/entities/post/model/slice/postSlice'
import { UpLoaderImage } from '@/src/entities/post/ui/upLoaderImage/UpLoaderImage'
import { useToast } from '@/src/app/hooks/useToast'
import { getModifiedImage } from '@/src/shared/helpers/canvasUtils'
import { CroppedImage } from '@/src/features/post/ui/croppedImage'
import { FilteredImage } from '@/src/features/post/ui/filteredImage'
import { DescriptionImage } from '@/src/features/post/ui/decriptionImage'
import { CreatePostModal } from '@/src/shared/ui/СreatePostModal'

export const CreatePost = () => {
  const images = useAppSelector(state => state.posts?.images)
  const croppedImages = useAppSelector(state => state.posts?.croppedImages)
  const imagesWithFilters = useAppSelector(state => state.posts.imagesWithFilters)

  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('upload')
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false)
  const { locale } = useTranslate()

  const isBigSizeScreen = currentWindow === 'filter' || currentWindow === 'description'
  const isShowUploadScreen = currentWindow === 'upload' && images.length === 0

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
  const clickBackHandler = () => {
    switch (true) {
      case currentWindow === 'description': {
        setCurrentWindow('filter')
        break
      }
      case currentWindow === 'filter': {
        setCurrentWindow('crop')
        dispatch(resetImagesWithFilters())
        break
      }
      case currentWindow === 'crop': {
        setCurrentWindow('upload')
        dispatch(resetImage())
        break
      }
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
        return <DescriptionImage imagesWithFilters={imagesWithFilters} />
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
          onBackClick={clickBackHandler}
          isOpen={isBaseModalOpen}
          onCancel={() => {
            setIsBaseModalOpen(prev => !prev)
            dispatch(resetImage())
            setCurrentWindow('upload')
          }}
          onShowLeftButton={currentWindow !== 'upload'}
          onShowRightButton={currentWindow !== 'description' && !isShowUploadScreen}
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