import React, { useState } from 'react'
import { SignUpForm } from '@/src/features/auth/signUp/ui/SignUpForm'
import { Modal } from '@/src/shared/ui'

export const SignUp = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)

  return (
    <div>
      <Modal
        email={''}
        isOpen={emailSentModal}
        onOpenChange={() => {
          setEmailSentModal(false)
        }}
      />
      <SignUpForm />
    </div>
  )
}
