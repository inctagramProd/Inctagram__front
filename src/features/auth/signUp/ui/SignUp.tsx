import React, { useEffect, useState } from 'react'
import { SignUpForm } from '@/src/features/auth/signUp/ui/SignUpForm/SignUpForm'
import { Modal } from '@/src/shared/ui'
import { useSignUpMutation } from '../service/signUpApi'
import { SignUpParams } from '../service/types/signUpTypes'

export const SignUp = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [email, setEmail] = useState('')

  const [userRegistration, { data, isSuccess, isError }] = useSignUpMutation()

  const onSubmit = async (value: SignUpParams): Promise<void> => {
    userRegistration(value)
      .unwrap()
      .catch(e => {
        const regex = /\s(\S+)$/ // Регулярное выражение для поиска последнего слова после пробела
        const match = e.data.match(regex)
        if (match) {
          const lastWord = match[1]
          setEmail(lastWord)
        }
      })
  }

  useEffect(() => {
    if (isError) setEmailSentModal(true)
  }, [isError])

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Modal
        email={`${email}`}
        isOpen={emailSentModal}
        onOpenChange={() => {
          setEmailSentModal(false)
        }}
      />
      <SignUpForm onSubmit={onSubmit} />
    </div>
  )
}
