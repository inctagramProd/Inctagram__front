import React, { useState } from 'react'
import { ImageURL } from '@/src/entities/post/model/types/postSliceTypes'
import Image from 'next/image'
import { Button, TextArea, Typography } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useCreatePostMutation } from '@/src/features/post/service/createPostApi'
import { getModifiedImage } from '@/src/shared/helpers/canvasUtils'
import { SlickSlider } from '@/src/shared/ui/Slider/Slider'
import { useToast } from '@/src/app/hooks/useToast'

const MAX_NUMBER_OF_CHARACTERS = 500

type Props = {
  imagesWithFilters: ImageURL[]
  closeModal: () => void
}

export const DescriptionImageScreen = ({ imagesWithFilters, closeModal }: Props) => {
  const [createPost, { isLoading, isSuccess, isError }] = useCreatePostMutation()
  const [postDescription, setPostDescription] = useState<string>('')
  const { locale } = useTranslate()

  const textErrorMessage =
    postDescription.length > MAX_NUMBER_OF_CHARACTERS ? locale.profile.descriptionError.error : ''
  const isMaxNumberOfCharacters = postDescription.length > MAX_NUMBER_OF_CHARACTERS

  const handleLoadImages = (imagesArray: ImageURL[]) => {
    const formData = new FormData()
    const imagesFiles = imagesArray.map(el =>
      getModifiedImage({
        imageSrc: el.imageURL,
        mode: 'blob',
      })
    )
    return Promise.all(imagesFiles).then(res => {
      res.forEach(el => {
        formData.append('files', el as Blob)
      })
      formData.append('description', postDescription)
      return formData
    })
  }

  const createPostHandler = () => {
    handleLoadImages(imagesWithFilters).then(res => {
      createPost(res)
    })
  }

  if (isSuccess) {
    closeModal()
    useToast({ text: locale.profile.addNewPost.successCreate, error: true })
  }
  if (isError) {
    useToast({ text: 'An error has occurred', error: true })
  }

  return (
    <div className="flex gap-6">
      <div className="w-1/2">
        <SlickSlider isShowNavigation={imagesWithFilters.length !== 1}>
          {imagesWithFilters.map((img, i) => (
            <Image
              key={img.imageURL}
              src={img.imageURL}
              alt={img.imageURL}
              width={100}
              height={100}
              className="object-contain w-full h-[506px]"
            />
          ))}
        </SlickSlider>
      </div>
      <div className="w-1/2 p-6 flex flex-col">
        <div>
          <Typography variant="regular_14" className="text-light-900">
            {locale.profile.addNewPost.addDescription}
          </Typography>
          <TextArea
            errorMessage={textErrorMessage}
            className="h-[120px] resize-none overflow-y-auto scrollbar-thin scrollbar-track-dark-300 scrollbar-thumb-primary-700"
            value={postDescription}
            onChange={e => {
              setPostDescription(e.target.value)
            }}
          />
          <Typography
            variant="small"
            className={`${isMaxNumberOfCharacters ? 'text-danger-500' : 'text-light-900'} text-end`}
          >
            {postDescription.length}/{MAX_NUMBER_OF_CHARACTERS}
          </Typography>
        </div>
        <div className="flex-1 flex items-end justify-end">
          <Button
            disable={isMaxNumberOfCharacters}
            variant="regular_14"
            style="primary"
            label={locale.profile.addNewPost.publication}
            onClick={() => {
              createPostHandler()
            }}
          />
        </div>
      </div>
    </div>
  )
}
