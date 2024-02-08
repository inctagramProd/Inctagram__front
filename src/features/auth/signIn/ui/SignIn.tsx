import { FormikHelpers } from 'formik'
import { useSignInMutation, useGitAuthMutation } from '../service/signInApi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SignInForm } from './signInForm/SignInForm'
import { SingInParams } from '../service/types/signInTypes'
import { useTranslate } from '@/src/app/hooks/useTranslate'

export const SignIn = () => {
  const { locale } = useTranslate()
  const router = useRouter()
  const [loginUser, { data, isSuccess }] = useSignInMutation()
  const [gitUser, { data: gitData, isSuccess: gitIsSuccess }] = useGitAuthMutation()
  const queryCode = router.query as { code: string }
  useEffect(() => {
    if (isSuccess || gitIsSuccess) {
      router.push('/home')
    } else if (queryCode.code) {
      if (localStorage.getItem('Git') === 'true') {
        gitUser({ code: queryCode.code }).unwrap()
      }
    }
  }, [isSuccess, gitIsSuccess, queryCode])
  console.log(`git Data`, gitData)
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
