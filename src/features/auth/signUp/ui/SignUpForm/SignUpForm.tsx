import { useTranslate } from '@/src/app/hooks/useTranslate'
import { signUpSchema } from '@/src/shared/schemas'
import { FormikHelpers, useFormik } from 'formik'
import Link from 'next/link'
import { Trans } from '@/src/shared/helpers/Trans'
import { Card, Checkbox, Typography, Input, Button } from '@/src/shared/ui'
import { GithubLogo, GoogleLogo } from '@/src/shared/assets/icons/icons'
import { FormValues, SignUpParams } from '../../service/types/signUpTypes'

type Props = {
  onSubmit: (values: SignUpParams) => void
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const { locale } = useTranslate()

  const onSubmitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { username, email, password } = values
    onSubmit({ username, email, password })
    actions.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    } as FormValues,
    validationSchema: signUpSchema(locale),
    onSubmit: onSubmitHandler,
  })

  return (
    <Card className="w-[378px]">
      <Typography variant="h1" className="text-center mb-[13px] cursor-default">
        {locale.auth.signUp}
      </Typography>
      <div className={`flex justify-center gap-x-[60px] mb-6`}>
        <Link href="#">
          <GoogleLogo width={36} height={36} />
        </Link>
        <Link href="#">
          <GithubLogo width={36} height={36} />
        </Link>
      </div>
      <div className="mb-[18px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-y-6 mb-6">
            <Input
              type="text"
              label={locale.auth.userName}
              {...formik.getFieldProps('username')}
              error={formik.touched.username && formik.errors.username}
            />
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
            <Input
              label={locale.auth.passwordConfirmation}
              type="password"
              {...formik.getFieldProps('confirmPassword')}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </div>
          <div className="mb-[18px]">
            <Checkbox {...formik.getFieldProps('terms')} />
            <Typography variant="small" className="inline">
              <Trans
                text={locale.auth.signUpTerms.description}
                tags={{
                  1: () => (
                    <Link
                      href="/terms-of-service"
                      className="text-primary-300 hover:underline underline-offset-[3px]"
                    >
                      {locale.auth.termsOfService}
                    </Link>
                  ),
                  2: () => (
                    <Link
                      href="/privacy-policy"
                      className="text-primary-300 hover:underline underline-offset-[3px]"
                    >
                      {locale.auth.policy}
                    </Link>
                  ),
                }}
              />
            </Typography>
            <Typography variant="error">
              {formik.touched.terms ? formik.errors.terms : ''}
            </Typography>
          </div>
          <div className="[&>button]:w-full">
            <Button
              style="primary"
              type="submit"
              label={locale.auth.signUp}
              disable={!(formik.isValid && formik.dirty)}
              className="w-full"
            />
          </div>
        </form>
      </div>
      <Typography variant="regular_16" className="block text-center mb-[18px]">
        {locale.auth.haveAccount}
      </Typography>
      <Link href="/auth/sign-in" className="block text-center text-primary-500">
        {locale.auth.signIn}
      </Link>
    </Card>
  )
}
