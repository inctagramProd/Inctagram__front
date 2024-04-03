import React, { ChangeEvent, useRef, useState } from 'react'
import { Button, Icon, Modal } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { uploadFile } from '@/src/shared/helpers/uploadFile'
import { v4 as uuidv4 } from 'uuid'
import { CroppedImage } from '@/src/features/post/createPost/editImage/croppedImage'

export const CreatePost = () => {
  const [images, setImages] = useState<PostImage[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const { locale } = useTranslate()

  const uploadImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    await uploadFile(event).then(imageUrl => {
      if (imageUrl) {
        setImages([...images, { id: uuidv4(), url: imageUrl?.url }])
        setIsBaseModalOpen(false)
        setIsOpenModal(true)
      }
    })
  }

  const handlerPick = () => {
    inputRef.current?.click()
  }

  return (
    <div>
      {isBaseModalOpen ? (
        <Modal
          className="max-w-[492px] w-full h-[564px]"
          title={'Add Photo'}
          isOpen={isBaseModalOpen}
          onCancel={() => {
            setIsBaseModalOpen(prev => !prev)
          }}
        >
          <>
            <input
              ref={inputRef}
              onChange={uploadImageHandler}
              type="file"
              accept="image*/,.png,.jpeg,.jpg"
              className="hidden"
            />
            <div className="flex justify-center items-center flex-col mt-[72px]">
              <div className="bg-dark-500 w-[222px] h-[228px] flex items-center justify-center mb-[60px]">
                <Icon iconName="imgOutlineIcon" height={48} width={48} />
              </div>
              <Button
                onClick={handlerPick}
                style="primary"
                label={locale.profile.selectFromComputer}
              />
            </div>
          </>
        </Modal>
      ) : (
        <CroppedImage
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          images={images}
          setImages={setImages}
        />
      )}
      <Button
        variant="medium_14"
        iconName={'PlusSquare'}
        label={locale.profile.createPost}
        style='default'
        onClick={() => {
          setIsBaseModalOpen(true)
        }}
      />
    </div>
  )
}

export type PostImage = {
    id: string
    url: string
}