import React, { useEffect, useState } from 'react'
import { Modal } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useAppSelector } from '@/src/app/hooks/useAppSelectorAndDispatch'
import { CroppedPhoto } from '@/src/features/profile/ui/CroppedPhoto/CroppedPhoto'
import { getModifiedImage } from '@/src/shared/helpers/canvasUtils'
import { SelectPhoto } from '@/src/features/profile/ui/SelectPhoto/SelectPhoto'
import { ProfilePhoto } from '@/src/features/profile/ui/ProfilePhoto/ProfilePhoto'
import { CroppedArea } from '@/src/shared/types'

type Props = {
  imageUpload: (image: FormData) => void
  isUpdateImgSuccess: boolean
}
export const EditProfilePhoto = ({ imageUpload, isUpdateImgSuccess }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedImageUrl, setSelectedImageUrl] = useState<null | string>(null)
  const profileImageURL = useAppSelector(state => state.profile?.avatars[0]?.url)
  const { locale } = useTranslate()

  const openModalHandler = () => {
    setIsOpenModal(true)
  }

  const imageUploadHandler = (cropArea: CroppedArea) => {
    if (cropArea && selectedImageUrl) {
      getModifiedImage({
        imageSrc: selectedImageUrl,
        crop: cropArea,
        mode: 'formData',
      })
        .then(res => imageUpload(res as FormData))
        .then(() => setIsOpenModal(false))
    }
  }

  const onClearHandler = () => {
    setIsOpenModal(false)
    setSelectedImageUrl(null)
  }

  useEffect(() => {
    if (isUpdateImgSuccess) {
      onClearHandler()
    }
  }, [])

  return (
    <div>
      <ProfilePhoto profileImageURL={profileImageURL} onClickHandler={openModalHandler} />
      <Modal
        isOpen={isOpenModal}
        title={locale.profile.profileSetting.addAProfilePhoto}
        className={'max-w-[492px] w-full h-[564px]'}
        onCancel={onClearHandler}
      >
        <div className={'flex justify-center items-center flex-col'}>
          {!selectedImageUrl ? (
            <SelectPhoto
              profileImageURL={profileImageURL}
              setSelectedImageUrl={setSelectedImageUrl}
            />
          ) : (
            <CroppedPhoto
              selectedImageUrl={selectedImageUrl}
              onSetCroppedArea={imageUploadHandler}
            />
          )}
        </div>
      </Modal>
    </div>
  )
}
