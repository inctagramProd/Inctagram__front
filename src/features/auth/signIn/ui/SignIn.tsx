import { FormikHelpers } from 'formik'
import { useSignInMutation } from '../service/signInApi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SignInForm } from './signInForm/SignInForm'
import { SingInParams } from '../service/types/signInTypes'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useGitAuthMutation } from '@/src/features/auth/signInWithSocialMedia/service/authApi'

export const SignIn = () => {
  const { locale } = useTranslate()
  const router = useRouter()
  const [loginUser, { data, isSuccess }] = useSignInMutation()
  const [
    GitAuth,
    { data: gitData, isLoading: gitIsLoading, isError: gitIsError, isSuccess: gitIsSuccess },
  ] = useGitAuthMutation()

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    if (Code) {
      if (localStorage.getItem('Git') === 'true') {
        localStorage.setItem('accessToken', 'Token')
        localStorage.setItem('name', 'name')
        console.log('code', Code)
      }
    } else {
      if (isSuccess) {
        router.push('/home')
      }
    }
  }, [isSuccess, gitIsSuccess])

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
  const onGitSubmit = async () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const Code = urlParams.get('code')
    GitAuth({ code: Code }).unwrap()
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)]">
      <SignInForm onGitSubmit={onGitSubmit} onSubmit={onSubmitHandler} />
    </div>
  )
}
