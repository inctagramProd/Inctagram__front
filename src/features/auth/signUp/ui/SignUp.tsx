import { useEffect, useState } from 'react'
import { SignUpForm } from '@/src/features/auth/signUp/ui/SignUpForm/SignUpForm'
import { Modal } from '@/src/shared/ui'
import { useSignUpMutation } from '../service/signUpApi'
import { SignUpFormValues, SignUpParams } from '../service/types/signUpTypes'
import { FormikHelpers } from 'formik'
import  Head  from 'next/head'

export const SignUp = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userEmail, setEmail] = useState<string>('')

  const [userRegistration, { data, isSuccess, isError }] = useSignUpMutation()

  const onSubmit = async (value: SignUpParams, actions: FormikHelpers<SignUpFormValues>) => {
    userRegistration(value)
      .unwrap()
      .then(() => {
        setEmailSentModal(true)
        console.log('registration has been completed!: ', data)
        actions.resetForm()
      })
      .catch(e => {
        console.log('registration error: ', e)
        const regex = /\s(\S+)$/ // Регулярное выражение для поиска последнего слова после пробела
        // const match = e.data.match(regex)
        // if (match) {
        //   const lastWord = match[1]
        //   setEmail(lastWord)
        // }
      })
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)]">
      <Head>
        <title>My page title</title>
      </Head>
      <Modal
        email={userEmail}
        isOpen={emailSentModal}
        onOpenChange={() => {
          setEmailSentModal(false)
        }}
      />
      <SignUpForm onSubmit={onSubmit} />
    </div>
  )
}
