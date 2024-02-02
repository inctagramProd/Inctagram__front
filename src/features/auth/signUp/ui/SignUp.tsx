import { useState } from 'react'
import { SignUpForm } from '@/src/features/auth/signUp/ui/SignUpForm/SignUpForm'
import { Modal } from '@/src/shared/ui'
import { useSignUpMutation } from '../service/signUpApi'
import { SignUpFormValues, SignUpParams } from '../service/types/signUpTypes'
import { FormikHelpers } from 'formik'
import { useTranslate } from '@/src/app/hooks/useTranslate'

export const SignUp = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userEmail, setEmail] = useState<string>('')
  const [userRegistration] = useSignUpMutation()
  const { locale } = useTranslate()

  const onSubmitHandler = async (value: SignUpParams, actions: FormikHelpers<SignUpFormValues>) => {
    await userRegistration(value)
      .unwrap()
      .then(() => {
        setEmail(value.email)
        setEmailSentModal(true)
        actions.resetForm()
      })
      .catch(e => {
        const error = e as { data: { message: string }; status: number }
        console.log(error)
        if (error.status === 400) {
          actions.setFieldError('confirmPassword', locale.auth.authErrors.alreadyInUse)
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
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
