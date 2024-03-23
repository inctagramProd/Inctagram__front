import React, { ChangeEvent, useRef, useState } from 'react'
import { Button, Icon, Modal } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { CroppedImage } from '@/src/features/post/createPost/croppedImage/CroppedImage'

export const CreatePost = () => {
  const [imageSrc, setImageSrc] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [isBaseModalOpen, setIsBaseModalOpen] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true)
  const { locale } = useTranslate()
  const handlerPick = () => {
    inputRef.current?.click()
  }
  const uploadPhotoHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files?.length) {
        const file = event.target.files[0]
        const url = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = e => {
            resolve(e.target?.result as string)
          }
          reader.onerror = e => {
            reject(e.target?.error)
          }
          reader.readAsDataURL(file)
        })
        setImageSrc(url)
        setIsBaseModalOpen(false)
        setIsOpenModal(true)
      }
    } catch (error) {
      console.error('Ошибка при обработке файла:', error)
    }
  }

  return (
    <div>
      {isBaseModalOpen ? (
        <Modal
          className="max-w-[492px] w-full h-[564px]"
          title={'Add Photo'}
          isOpen={isBaseModalOpen}
          onCancel={() => {
            setIsOpenModal(prev => !prev)
          }}
        >
          <>
            <input
              ref={inputRef}
              onChange={uploadPhotoHandler}
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
          imageSrc={imageSrc}
        />
      )}
    </div>
  )
}