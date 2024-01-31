import { useState } from 'react'
import { SignUpForm } from '@/src/features/auth/signUp/ui/SignUpForm/SignUpForm'
import { Modal } from '@/src/shared/ui'
import { useSignUpMutation } from '../service/signUpApi'
import { SignUpFormValues, SignUpParams } from '../service/types/signUpTypes'
import { FormikHelpers } from 'formik'

export const SignUp = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userEmail, setEmail] = useState<string>('')
  const [userRegistration] = useSignUpMutation()

  const onSubmitHandler = async (value: SignUpParams) => {
    await userRegistration(value)
      .unwrap()
      .then((data) => {
        console.log('registration has been completed!: ', data)
      })
      .catch(e => {
        setEmail(value.email)
        setEmailSentModal(true)
        // actions.resetForm()
        return e.data
      })
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)]">
      <Modal
        email={userEmail}
        isOpen={emailSentModal}
        onOpenChange={() => {
          setEmailSentModal(false)
        }}
      />
      <SignUpForm onSubmit={onSubmitHandler} />
    </div>
  )
}
