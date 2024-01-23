import React, { useEffect, useState } from 'react'
import { SignUpForm } from '@/src/features/auth/signUp/ui/SignUpForm/SignUpForm'
import { Modal } from '@/src/shared/ui'
import { useSignUpMutation } from '../service/signUpApi'
import { SignUpParams } from '../service/types/signUpTypes'

export const SignUp = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(true)
  const [userRegistration, { data, isSuccess }] = useSignUpMutation()

  const onSubmit = (value: SignUpParams) => {
    userRegistration(value)
  }
  useEffect(() => {
    setEmailSentModal(true)
  }, [isSuccess])

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Modal
        email={`${''}`}
        isOpen={emailSentModal}
        onOpenChange={() => {
          setEmailSentModal(false)
        }}
      />
      <SignUpForm onSubmit={onSubmit} />
    </div>
  )
}
