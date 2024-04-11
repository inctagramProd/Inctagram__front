import React, { ChangeEvent, useState } from 'react'
import { ImageURL } from '@/src/entities/post/model/types/postSliceTypes'
import Image from 'next/image'
import { Button, TextArea, Typography } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useCreatePostMutation, useGetPostsQuery } from '@/src/features/post/service/createPostApi'
import { getModifiedImage } from '@/src/shared/helpers/canvasUtils'
import { SlickSlider } from '@/src/shared/ui/Slider/Slider'

type Props = {
  imagesWithFilters: ImageURL[]
}

export const DescriptionImage = ({ imagesWithFilters }: Props) => {
  const [createPost, { isLoading }] = useCreatePostMutation()
  const { data } = useGetPostsQuery(10)
  const [textPostDescription, setTextPostDescription] = useState<string>('')
  const { locale } = useTranslate()
  console.log(data)
  const createPostHandler = () => {
    getModifiedImage({
      imageSrc: imagesWithFilters[0].imageURL,
      mode: 'blob',
    }).then(res => {
      const formData = new FormData()
      formData.append('files', res as Blob)
      console.log(formData, res)
      createPost(formData)
    })
  }
  const upLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    if (e.target.files) formData.append('files', e.target.files[0])
    console.log(formData)
    // createPost({files:formData, description:'post text'})
  }

  return (
    <div className="flex gap-6">
      <div className="w-1/2">
        <SlickSlider isShowArrow={imagesWithFilters.length !== 1}>
          {imagesWithFilters.map(img => (
            <Image src={img.imageURL} alt={img.imageURL} width={100} height={100} />
          ))}
        </SlickSlider>
      </div>
      <div className="w-1/2 p-6">
        <Typography variant="regular_14" className="text-light-900">
          {locale.profile.addNewPost.addDescription}
        </Typography>
        <TextArea
          value={textPostDescription}
          onChange={e => {
            setTextPostDescription(e.target.value)
          }}
        />
        <input type="file" accept="image*/,.png,.jpeg,.jpg" onChange={upLoadFile} />
        <Button
          variant="regular_14"
          style="outline"
          label="create post"
          onClick={() => {
            createPostHandler()
          }}
        />
      </div>
    </div>
  )
}
