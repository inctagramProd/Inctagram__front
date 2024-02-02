import { useLogOutMutation } from '../service/logOutApi'
import React, { useState } from 'react'
import { LinkItem } from '@/src/widgets/Sidebar/LinkedItem'
import { Modal } from '@/src/shared/ui'
import { useRouter } from 'next/router'

export const LogOut = () => {
  const [logOut] = useLogOutMutation()
  const router = useRouter()

  const handleLogout = async () => {
    logOut()
      .unwrap()
      .then(() => {
        router.push('/auth/sign-in')
      })
      .catch(e => {
        console.log('Logout failed', e)
      })
  }

  return (
    <>
      <div onClick={handleLogout}>
        <LinkItem iconName={'LogOut'} label={'Log Out'} link={'#'} style={'default'} />
      </div>
    </>
  )
}
