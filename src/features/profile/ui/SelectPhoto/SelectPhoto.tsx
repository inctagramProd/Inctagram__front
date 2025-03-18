import Image from 'next/image'
import { Button, Icon } from '@/src/shared/ui'
import React, { ChangeEvent, RefObject, useRef } from 'react'
import { uploadFile } from '@/src/shared/helpers/uploadFile'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  profileImageURL?: string
  setSelectedImageUrl: (url: string) => void
}

export const SelectPhoto = ({ profileImageURL, setSelectedImageUrl }: Props) => {
  const uploadRef: RefObject<HTMLInputElement> = useRef(null)
  const { locale } = useTranslate()

  const selectImageHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
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

  return (
    <>
      <input
        ref={uploadRef}
        onChange={selectImageHandler}
        type="file"
        accept="image*/,.png,.jpeg,.jpg"
        className="hidden"
      />
      <div
        className={
          'bg-dark-500 w-[222px] h-[228px] flex items-center justify-center mt-[72px] mb-[60px]'
        }
      >
        {profileImageURL ? (
          <Image
            src={profileImageURL}
            width={222}
            height={228}
            alt="photo profile"
            className="w-full h-full object-cover"
            priority
          />
        ) : (
          <Icon iconName="imgOutlineIcon" height={48} width={48} />
        )}
      </div>
      <Button onClick={handlerPick} style="primary" label={locale.profile.selectFromComputer} />
    </>
  )
}
