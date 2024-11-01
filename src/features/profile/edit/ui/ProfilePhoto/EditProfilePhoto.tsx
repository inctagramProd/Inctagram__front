import React, { ChangeEvent, RefObject, useRef, useState } from 'react'
import { Button, Icon, Modal } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import Image from 'next/image'
import { useAppSelector } from '@/src/app/hooks/useAppSelectorAndDispatch'
import { getGoogleDriveImageUrl } from '@/src/shared/lib/utils/getGoogleDriveImageUrl'
import { uploadFile } from '@/src/shared/helpers/uploadFile'

type Props = {
  imageUpload: (image: File) => void
}
export const EditProfilePhoto = ({ imageUpload }: Props) => {
  const { locale } = useTranslate()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<null | string>(null)
  const [file, setFile] = useState<null | File>(null)
  const uploadRef: RefObject<HTMLInputElement> = useRef(null)
  const profilePhoto = useAppSelector(state => state.profile?.profileImageURL)
  const imageUrl = getGoogleDriveImageUrl(profilePhoto)

  const imageUploadHandler = () => {
    if (file) {
      imageUpload(file)
      onClearHandler()
    }
  }

  const selectImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
      await uploadFile(event, locale).then(imageUrl => {
        if (imageUrl) {
          setSelectedImageUrl(imageUrl?.url)
        }
      })
    }
  }

  const handlerPick = () => {
    if (uploadRef.current) {
      uploadRef.current.click()
    }
  }
  const onClearHandler = () => {
    setIsOpenModal(false)
    setSelectedImageUrl(null)
    setFile(null)
  }
  const OpenModalHandler = () => {
    setIsOpenModal(true)
  }

  return (
    <div>
      <div
        className={
          'w-[196px] h-[196px] bg-dark-500 rounded-full flex justify-center items-center m-auto'
        }
      >
        {imageUrl ? (
          <Image
            width={196}
            height={196}
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
            src={imageUrl}
          />
        ) : (
          <Icon height={48} iconName="Picture" width={48} />
        )}
      </div>
      <div className={'[&>button]:w-full mt-6'}>
        <Button
          label={locale.profile.profileSetting.addAProfilePhoto}
          onClick={OpenModalHandler}
          style="outline"
          className="w-full"
        />
      </div>
      <Modal
        isOpen={isOpenModal}
        title={locale.profile.profileSetting.addAProfilePhoto}
        className={'max-w-[492px] w-full h-[564px]'}
        onCancel={onClearHandler}
      >
        <div>
          <input
            ref={uploadRef}
            onChange={selectImageHandler}
            type="file"
            accept="image*/,.png,.jpeg,.jpg"
            className="hidden"
          />
          <div className="flex justify-center items-center flex-col mt-[72px]">
            {!selectedImageUrl ? (
              <>
                <div className="bg-dark-500 w-[222px] h-[228px] flex items-center justify-center mb-[60px]">
                  {imageUrl ? (
                    <Image src={imageUrl} width={222} height={228} alt="photo profile" />
                  ) : (
                    <Icon iconName="imgOutlineIcon" height={48} width={48} />
                  )}
                </div>
                <Button
                  onClick={handlerPick}
                  style="primary"
                  label={locale.profile.selectFromComputer}
                />
              </>
            ) : (
              <div className={''}>
                <Image src={selectedImageUrl} width={422} height={228} alt="photo profile" />
                <Button onClick={imageUploadHandler} style="primary" label={locale.profile.save} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}
