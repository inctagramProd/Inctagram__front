import { useState } from 'react'
import { SignUpForm } from '@/src/features/auth/signUp/ui/SignUpForm/SignUpForm'
import { Button, Modal } from '@/src/shared/ui'
import { useSignUpMutation } from '../service/signUpApi'
import { SignUpFormValues, SignUpParams } from '../service/types/signUpTypes'
import { FormikHelpers } from 'formik'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useRouter } from 'next/router'
import { useGitAuthMutation, useGoogleAuthMutation } from '../../signIn/service/signInApi'

export const SignUp = () => {
  const [emailSentModal, setEmailSentModal] = useState<boolean>(false)
  const [userEmail, setEmail] = useState<string>('')
  const [userRegistration] = useSignUpMutation()
  const { locale } = useTranslate()
  const router = useRouter()
  const [
    gitUser,
    { data: gitData, isSuccess: gitIsSuccess, isLoading: gitLoading, isError: gitError },
  ] = useGitAuthMutation()
  const [
    googleUser,
    {
      data: googleData,
      isSuccess: googleIsSuccess,
      isLoading: googleLoading,
      isError: googleError,
    },
  ] = useGoogleAuthMutation()
  const queryCode = router.query as { code: string }
  useEffect(() => {
    if (gitIsSuccess || googleIsSuccess) {
      router.push('/home')
    } else if (queryCode.code) {
      localStorage.getItem('Git')
        ? gitUser({ code: queryCode.code }).unwrap()
        : googleUser({ code: queryCode.code.replace('/', '%2F') }).unwrap()
    }
  }, [gitIsSuccess, googleIsSuccess, queryCode])

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
  if (gitLoading || googleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderSpin />
      </div>
    )
  } else if (gitError || googleError) {
    return <div>{localStorage.apiError}</div>
  }
  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)]">
      <Modal
        isOpen={emailSentModal}
        title="Письмо отправлено"
        onCancel={() => setEmailSentModal(false)}
        footer={[
          <Button label="Ok" style="primary" onClick={() => setEmailSentModal(false)}></Button>,
        ]}
      >
        <p>Мы отправили ссылку для подтверждения электронной почты на {userEmail}</p>
      </Modal>
      <SignUpForm onSubmit={onSubmitHandler} />
    </div>
  )
}
