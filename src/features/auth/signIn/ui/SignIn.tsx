import { FormikHelpers } from 'formik'
import { useSignInMutation } from '../service/signInApi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SignInForm } from './signInForm/SignInForm'
import { SingInParams } from '../service/types/signInTypes'

export const SignIn = () => {
  const router = useRouter()
  const [loginUser, { data, isLoading, isSuccess }] = useSignInMutation()

  useEffect(() => {
    if (isSuccess) {
      router.push('/home')
    }
  }, [isSuccess])

  const onSubmitHandler = async (values: SingInParams, actions: FormikHelpers<SingInParams>) => {
    actions.setStatus('')
    await loginUser(values)
      .unwrap()
      .then(() => {
        actions.resetForm()
      })
      .catch(e => {
        const error = e as { data: { message: [string] } }
        if (error.data.message.length) {
          actions.setStatus(error.data.message)
        }
      })
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-60px)]">
      <SignInForm onSubmit={onSubmitHandler} />
    </div>
  )
}
