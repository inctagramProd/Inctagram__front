import { signInSchema } from '@/src/shared/schemas'
import { FormikHelpers, useFormik } from 'formik'
import Link from 'next/link'
import { useSignInMutation } from '../service/signInApi'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Card, Typography, Input, Button } from '@/src/shared/ui'

type FormValues = {
  email: string
  password: string
}

export const SignIn = () => {
  const { locale } = useTranslate()
  const router = useRouter()
  const [loginUser, { data: loginData, isLoading, isSuccess }] = useSignInMutation()

  useEffect(() => {
    if (isSuccess && loginData) {
      router.push('#')
    }
  }, [isSuccess, loginData, router])

  const onSubmitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    actions.setStatus('')
    loginUser(values)
      .unwrap()
      .catch(e => {
        const error = e as { data: { message: string } }
        actions.setStatus(error.data.message)
      })
    actions.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    } as FormValues,
    validationSchema: signInSchema(locale),
    onSubmit: onSubmitHandler,
  })

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Card className="w-[378px]">
        <Typography variant="h1" className="text-center mb-[13px]">
          {locale.auth.signIn}
        </Typography>
        <div className="mb-[18px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-6 mb-9">
              <Input
                label={locale.auth.email}
                type="text"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && formik.errors.email}
              />
              <Input
                label={locale.auth.password}
                type="password"
                {...formik.getFieldProps('password')}
                error={(formik.touched.password && formik.errors.password) || formik.status}
              />
            </div>
            <div className="text-end mb-6">
              <Link href="/auth/password-recovery" className="inline-block">
                <Typography variant="regular_14" className="text-light-900">
                  {locale.auth.forgotPassword}
                </Typography>
              </Link>
            </div>
            <div className="[&>button]:w-full">
              <Button
                type="submit"
                style="primary"
                label={locale.auth.signIn}
                disable={!(formik.isValid && formik.dirty)}
                className="w-full"
              />
            </div>
          </form>
        </div>
        <Typography variant="regular_16" className="text-center mb-[18px]">
          {locale.auth.dontHaveAccount}
        </Typography>
        <Link href="/auth/sign-up" className="block text-center text-primary-500">
          {locale.auth.signUp}
        </Link>
      </Card>
    </div>
  )
}
