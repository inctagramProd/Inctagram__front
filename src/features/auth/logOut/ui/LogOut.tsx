import { useLogOutMutation } from '../service/logOutApi'
import React, { useState } from 'react'
import { LinkItem } from '@/src/widgets/Sidebar/LinkedItem'
import { Modal } from '@/src/shared/ui'
import { useRouter } from 'next/router'
import { Button } from '@/src/shared/ui'

export const LogOut = () => {
  const [logOut] = useLogOutMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = () => {
    handleLogout().then(() => setIsModalOpen(false))
  }

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        title="Log Out"
        onCancel={handleCancel}
        footer={[
          <Button label="Yes" style="outline" onClick={handleOk}></Button>,
          <Button label="No" style="primary" onClick={handleCancel}></Button>,
        ]}
      >
        <p>Are you really want to log out of your account</p>
      </Modal>
      <div onClick={() => setIsModalOpen(!isModalOpen)}>
        <LinkItem iconName={'LogOut'} label={'Log Out'} link={'#'} style={'default'} />
      </div>
    </>
  )
}
