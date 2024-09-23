import React, { ChangeEvent, RefObject, useRef, useState } from 'react'
import { Button, Icon } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import Image from 'next/image'
import { useAppSelector } from '@/src/app/hooks/useAppSelectorAndDispatch'
import { getGoogleDriveImageUrl } from '@/src/shared/lib/utils/getGoogleDriveImageUrl'

type Props = {
  imageUpload: (image: File) => void
}
export const EditProfilePhoto = ({ imageUpload }: Props) => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const uploadRef: RefObject<HTMLInputElement> = useRef(null)
  const { locale } = useTranslate()

  const profilePhoto = useAppSelector(state => state.profile?.profileImageURL)
  const imageUrl = getGoogleDriveImageUrl(profilePhoto)

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      imageUpload(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result)
        }
      }
    }
  }

  const handleOpenFileUploadWindow = () => {
    if (uploadRef.current) {
      uploadRef.current.click()
    }
  }

  return (
    <div>
      <div
        className={'w-[196px] h-[196px] bg-dark-500 rounded-full flex justify-center items-center'}
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
      <div className="mt-6 upload">
        <label>
          <div className='className="[&>button]:w-full"'>
            <Button
              label={locale.profile.profileSetting.addAProfilePhoto}
              onClick={handleOpenFileUploadWindow}
              style={'outline'}
              className="w-full"
            ></Button>
          </div>
          <input
            accept={'image/jpeg, image/png'}
            className={'hidden'}
            id={'upload-button'}
            onChange={handleImageUpload}
            ref={uploadRef}
            type={'file'}
          />
        </label>
      </div>
    </div>
  )
}
