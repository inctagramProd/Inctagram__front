import { FormikHelpers } from 'formik'
import { useSignInMutation } from '../service/signInApi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SignInForm } from './signInForm/SignInForm'
import { SingInParams } from '../service/types/signInTypes'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useGitAuthMutation } from '@/src/features/auth/signInWithSocialMedia/service/authApi'

export const SignIn = () => {
  const { locale } = useTranslate()
  const router = useRouter()
  const [loginUser, { data, isSuccess }] = useSignInMutation()
  const [gitUser, { data: gitData, isSuccess: gitIsSuccess }] = useGitAuthMutation()
  const [apiStatus, setApiStatus] = useState<boolean>(false)
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    const ApiStatus = localStorage.getItem('api')
    if (Code) {
      if (localStorage.getItem('Git') === 'true') {
        localStorage.setItem('accessToken', 'Token')
        localStorage.setItem('name', 'name')
        gitUser({ code: Code }).unwrap()
      }
    } else {
      if (isSuccess || ApiStatus === 'true') {
        router.push('/home')
      }
    }
  }, [isSuccess, apiStatus])

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
      <SignInForm setApiStatus={setApiStatus} onSubmit={onSubmitHandler} />
    </div>
  )
}
