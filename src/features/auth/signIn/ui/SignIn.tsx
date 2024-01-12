import { useTranslate } from '@/src/app/hooks/useTranslate'
import { signInSchema } from '@/src/shared/schemas'
import { FormikHelpers, useFormik } from 'formik'
import Link from 'next/link'
import { Typography } from '@/src/shared/ui/Typography/Typography'
import { Input } from '@/src/shared/ui/Input/Input'
import { Button } from '@/src/shared/ui/Button/Button'
import { Card } from '@/src/shared/ui/Card/Card'
import { default as GithubLogo, default as GoogleLogo } from '../../../../shared/ui/Icon/Icon'

type FormValues = {
  email: string
  password: string
}

export const SignIn = () => {
  const { locale } = useTranslate()
  const onSubmitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    alert(JSON.stringify(values, null, 2))
    actions.resetForm()
    actions.setSubmitting(false)
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
    <Card className="w-[378px]">
      <Typography variant="h1" className="text-center mb-[13px]">
        {locale.auth.signIn}
      </Typography>
      <div className={`flex justify-center gap-x-[60px] mb-6`}>
        <Link href="#">
          <GoogleLogo width={36} height={36} iconName={'GoogleLogo'} />
        </Link>
        <Link href="#">
          <GithubLogo width={36} height={36} iconName={'GithubLogo'} />
        </Link>
      </div>
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
              error={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="text-end mb-6">
            <Link href="/auth/password-recovery" className="inline-block">
              <Typography variant="regular_14" className="text-light-900">
                {locale.auth.forgotPassword}
              </Typography>
            </Link>
          </div>
          <Button
            style="primary"
            type="submit"
            label={locale.auth.signIn}
            disable={!(formik.isValid && formik.dirty)}
          />
        </form>
      </div>
      <Typography variant="regular_16" className="text-center mb-[18px]">
        {locale.auth.dontHaveAccount}
      </Typography>
      <Link href="/auth/sign-up" className="block text-center text-primary-500">
        {locale.auth.signUp}
      </Link>
    </Card>
  )
}
