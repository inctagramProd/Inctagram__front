import { FormikHelpers } from 'formik'
import { useSignInMutation, useGitAuthMutation, useGoogleAuthMutation } from '../service/signInApi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SignInForm } from './signInForm/SignInForm'
import { SingInParams } from '../service/types/signInTypes'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { LoaderSpin } from '@/src/shared/ui'

export const SignIn = () => {
  const { locale } = useTranslate()
  const router = useRouter()
  const [loginUser, { isSuccess }] = useSignInMutation()
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

  useEffect(() => {
    const encodedCode = router.query.code as string
    const originalCode = decodeURIComponent(encodedCode)
    console.log(originalCode)
    if (isSuccess || gitIsSuccess || googleIsSuccess) {
      router.push('/home')
    } else if (router.query) {
      localStorage.getItem('Git')
        ? gitUser({ code: originalCode }).unwrap()
        : googleUser({ code: originalCode }).unwrap()
    }
  }, [isSuccess, gitIsSuccess, googleIsSuccess, router.query])
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
      <SignInForm onSubmit={onSubmitHandler} />
    </div>
  )
}
