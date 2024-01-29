import { useLogOutMutation } from '../service/logOutApi'
import React, { useState } from 'react'

export const LogOut = () => {
  const [logOut] = useLogOutMutation()
  const [openModal, setOpenModal] = useState(false)

  const handleLogout = async () => {
    logOut()
      .unwrap()
      .then(() => {
        console.log('Logout successful')
      })
      .catch(e => {
        console.log('Logout failed')
      })
  }

  return (
    <>
      <div onClick={handleLogout}>Logout</div>
    </>
  )
}
