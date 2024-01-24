import { FormikHelpers } from 'formik'
import { useSignInMutation } from '../service/signInApi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SignInForm } from './signInForm/signInForm'
import { SingInParams } from '../service/types/signInTypes'

export const SignIn = () => {
  const router = useRouter()
  const [loginUser, { data, isLoading, isSuccess }] = useSignInMutation()

  const onSubmitHandler = async (values: SingInParams, actions: FormikHelpers<SingInParams>) => {
    actions.setStatus('')
    loginUser(values)
      .unwrap()
      .then(() => {
        actions.resetForm()
      })
      .catch(e => {
        const error = e as { data: { message: string } }
        actions.setStatus(error.data.message)
      })
  }

  useEffect(() => {
    if (isSuccess) {
      router.push('/home')
    }
  }, [isSuccess, router])

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <SignInForm onSubmit={onSubmitHandler} />
    </div>
  )
}
