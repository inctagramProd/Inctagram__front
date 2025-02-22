import React from 'react'
import { Icon, Typography } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  profileImageURL?: string
  username?: string
  aboutMe?: string
}

export const ProfileInfo = ({ profileImageURL, username, aboutMe }: Props) => {
  const { locale } = useTranslate()

  return (
    <div className="flex gap-x-9 pt-9 pl-6">
      <div>
        <div className="bg-dark-500 rounded-full flex justify-center items-center">
          {profileImageURL ? (
            <Image
              width={196}
              height={196}
              alt="profile photo"
              className="rounded-full w-full h-full object-cover"
              src={profileImageURL}
              priority
            />
          ) : (
            <Icon width={48} height={48} iconName="Picture" />
          )}
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center mb-5">
          <Typography variant="bold_16">{username}</Typography>
          <Link
            className="ml-auto px-6 py-[6px] bg-dark-300 text-light-100 rounded-[2px] cursor-pointer border-[1px] border-transparent
              active:bg-[#212121] active:text-light-100
              hover:bg-dark-100 hover:text-light-100
              focus:bg-dark-300 focus:border-[1px] focus:border-primary-300
              disabled:bg-dark-500 disabled:text-light-900`"
            href={{
              pathname: '/profile/settings',
            }}
          >
            {locale.profile.profileSettings}
          </Link>
        </div>
        <div>
          <ul className="flex gap-x-14 mb-6">
            <li>
              <Typography variant="bold_14" className="block">
                2 140
              </Typography>{' '}
              <Typography variant="regular_14">{locale.profile.subscriptions}</Typography>
            </li>
            <li>
              <Typography variant="bold_14" className="block">
                2 234
              </Typography>{' '}
              <Typography variant="regular_14">{locale.profile.subscribers}</Typography>
            </li>
            <li>
              <Typography variant="bold_14" className="block">
                2 434
              </Typography>{' '}
              <Typography variant="regular_14">{locale.profile.publications}</Typography>
            </li>
          </ul>
        </div>
        <div>{aboutMe && <Typography variant="regular_16">{aboutMe}</Typography>}</div>
      </div>
    </div>
  )
}
