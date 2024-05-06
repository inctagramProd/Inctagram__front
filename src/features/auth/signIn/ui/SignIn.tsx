import { useEffect } from 'react'

import { useTranslate } from '@/src/app/hooks/useTranslate'
import { LoaderSpin } from '@/src/shared/ui'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'

import { useGitAuthMutation, useGoogleAuthMutation, useSignInMutation } from '../service/signInApi'
import { SingInParams } from '../service/types/signInTypes'
import { SignInForm } from './signInForm/SignInForm'

export const SignIn = () => {
  const { locale } = useTranslate()
  const router = useRouter()
  const [loginUser, { isSuccess }] = useSignInMutation()
  const [
    gitUser,
    { data: gitData, isError: gitError, isLoading: gitLoading, isSuccess: gitIsSuccess },
  ] = useGitAuthMutation()
  const [
    googleUser,
    {
      data: googleData,
      isError: googleError,
      isLoading: googleLoading,
      isSuccess: googleIsSuccess,
    },
  ] = useGoogleAuthMutation()
  const queryCode = router.query as { code: string }

  useEffect(() => {
    console.log(queryCode)
    if (isSuccess || gitIsSuccess || googleIsSuccess) {
      router.push('/home')
    } else if (queryCode.code) {
      localStorage.getItem('Git')
        ? gitUser({ code: queryCode.code }).unwrap()
        : googleUser({ code: queryCode.code.replace('/', '%2F') }).unwrap()
    }
  }, [isSuccess, gitIsSuccess, googleIsSuccess, queryCode])
  const onSubmitHandler = async (values: SingInParams, actions: FormikHelpers<SingInParams>) => {
    actions.setStatus('')
    await loginUser(values)
      .unwrap()
      .then(() => {
        actions.resetForm()
      })
      .catch(e => {
        const error = e as { data: { message: [string]; statusCode: number } }

        // if (error.data.statusCode === 400 || 401) {
        //   actions.setFieldError('password', locale.auth.authErrors.incorrectEmailOrPassword)
        // }
      })
      .finally(() => {
        actions.setSubmitting(false)
      })
  }

  if (gitLoading || googleLoading) {
    return (
      <div className={'min-h-screen flex items-center justify-center'}>
        <LoaderSpin />
      </div>
    )
  } else if (gitError || googleError) {
    return <div>{localStorage.apiError}</div>
  }

  return (
    <div className={'flex items-center justify-center h-[calc(100vh-60px)]'}>
      <SignInForm onSubmit={onSubmitHandler} />
    </div>
  )
}
