import { FormikHelpers } from 'formik'
import { useGoogleAuthMutation, useSignInMutation } from '../service/signInApi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SignInForm } from './signInForm/SignInForm'
import { SingInParams } from '../service/types/signInTypes'
import { useTranslate } from '@/src/app/hooks/useTranslate'

export const SignIn = () => {
  const { locale } = useTranslate()
  const router = useRouter()
  const [loginUser, { data, isSuccess }] = useSignInMutation()
  const [
    GoogleAuth,
    {
      data: googleData,
      isLoading: googleLoading,
      isError: googleError,
      isSuccess: googleIsSuccess,
    },
  ] = useGoogleAuthMutation()
  const [
    GitAuth,
    { data: gitData, isLoading: gitLoading, isError: gitError, isSuccess: gitIsSuccess },
  ] = useGoogleAuthMutation()
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    console.log(localStorage.getItem('Google'))

    if (Code) {
      if (localStorage.getItem('Google') === 'true') {
        GitAuth({ code: Code }).unwrap()
      }
    }
    if (isSuccess || gitIsSuccess || googleIsSuccess) {
      router.push('/home')
    }
  }, [isSuccess, gitIsSuccess])
  console.log(googleData)
  console.log(gitData)

  const onGitSubmit = () => {}
  const onGoogleSubmit = () => {}
  const onSubmitHandler = async (values: SingInParams, actions: FormikHelpers<SingInParams>) => {
    actions.setStatus('')
    await loginUser(values)
      .unwrap()
      .then(() => {
        actions.resetForm()
      })
      .catch(e => {
        const error = e as { data: { message: [string]; statusCode: number } }
        if (error.data.statusCode === 400 || 401) {
          actions.setFieldError('password', locale.auth.authErrors.incorrectEmailOrPassword)
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
      })
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)]">
      <SignInForm onSubmit={onSubmitHandler} />
    </div>
  )
}
