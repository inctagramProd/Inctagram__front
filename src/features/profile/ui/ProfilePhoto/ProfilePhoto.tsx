import React from 'react'
import Image from 'next/image'
import { Button, Icon } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  profileImageURL?: string
  onClickHandler: () => void
}
export const ProfilePhoto = ({ profileImageURL, onClickHandler }: Props) => {
  const { locale } = useTranslate()

  return (
    <>
      <div
        className={
          'w-[196px] h-[196px] bg-dark-500 rounded-full flex justify-center items-center m-auto'
        }
      >
        {profileImageURL ? (
          <Image
            width={196}
            height={196}
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
            src={profileImageURL}
            priority
          />
        ) : (
          <Icon height={48} iconName="Picture" width={48} />
        )}
      </div>
      <div className={'[&>button]:w-full mt-6'}>
        <Button
          label={locale.profile.profileSetting.addAProfilePhoto}
          onClick={onClickHandler}
          style="outline"
          className="w-full"
        />
      </div>
    </>
  )
}
