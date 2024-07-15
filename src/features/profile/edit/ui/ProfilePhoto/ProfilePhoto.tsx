import React, { ChangeEvent, RefObject, useRef, useState } from 'react'
import { Button, Icon } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import {useUpdateProfileMutation} from "@/src/features/profile/edit/api/profileApi";

type Props = {
  imageUpload: (image: File) => void
}
export const ProfilePhoto = ({ imageUpload }: Props) => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const uploadRef: RefObject<HTMLInputElement> = useRef(null)
  const { locale } = useTranslate()
  const [updateProfile] = useUpdateProfileMutation()

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      const formData = new FormData
      formData.append('profileImage', file)
      formData.append('aboutMe', 'about me')
      imageUpload(file)
      // updateProfile(formData).unwrap()
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result)
          // imageUpload(reader.result.split(',')[1])
          // imageUpload(reader.result)
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
        {selectedImage ? (
          <img
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
            src={selectedImage}
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
