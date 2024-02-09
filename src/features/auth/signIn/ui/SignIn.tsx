import { FormikHelpers } from 'formik'
import { useSignInMutation, useGitAuthMutation } from '../service/signInApi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SignInForm } from './signInForm/SignInForm'
import { SingInParams } from '../service/types/signInTypes'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { LoaderSpin } from '@/src/shared/ui'
import { useGoogleAuthMutation } from '@/src/features/auth/signInWithSocialMedia/service/authApi'

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
  const queryCode = router.query as { code: string }
  let Code
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    Code = urlParams.get('code')
    if (isSuccess || gitIsSuccess) {
      router.push('/home')
    } else if (queryCode.code || Code) {
      localStorage.getItem('Git')
        ? gitUser({ code: queryCode.code }).unwrap()
        : googleUser({ code: Code }).unwrap()
    }
  }, [isSuccess, gitIsSuccess, googleIsSuccess, queryCode, Code])
  console.log(`code`, queryCode.code)
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
