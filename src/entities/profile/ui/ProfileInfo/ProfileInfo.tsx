import React from 'react'
import { Icon, Typography } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { ProfileData } from '@/src/features/profile/edit/service/profileApi'
import Link from 'next/link'

type Props = {
  userData: ProfileData
}

export const ProfileInfo = ({ userData }: Props) => {
  const { username, aboutMe, profileImageURL } = userData

  const { locale } = useTranslate()
  return (
    <div className="flex gap-x-9 pt-9 pl-6">
      <div>
        <div
          className={
            'w-[196px] h-[196px] bg-dark-500 rounded-full flex justify-center items-center'
          }
        >
          {profileImageURL ? (
            <img
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
              src={profileImageURL}
            />
          ) : (
            <Icon height={48} iconName="Picture" width={48} />
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center mb-5">
          <Typography variant="bold_16">{username}</Typography>
          <Link
            className="ml-auto"
            href={{
              pathname: '/profile/settings',
            }}
          >
            {locale.profile.profileSettings}
          </Link>
        </div>
        <div>
          <ul className="flex gap-x-14 mb-6">
            <li className="">
              <Typography variant="bold_14" className="block">
                2 140
              </Typography>{' '}
              <Typography variant="regular_14">{locale.profile.subscriptions}</Typography>
            </li>
            <li className="">
              <Typography variant="bold_14" className="block">
                2 234
              </Typography>{' '}
              <Typography variant="regular_14">{locale.profile.subscribers}</Typography>
            </li>
            <li className="">
              <Typography variant="bold_14" className="block">
                2 434
              </Typography>{' '}
              <Typography variant="regular_14">{locale.profile.publications}</Typography>
            </li>
          </ul>
        </div>
        <div>
          <Typography variant="regular_16">{aboutMe}</Typography>
        </div>
      </div>
    </div>
  )
}