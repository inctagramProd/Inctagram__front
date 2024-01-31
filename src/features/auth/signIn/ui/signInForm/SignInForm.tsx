import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Card, Typography, Input, Button } from '@/src/shared/ui'
import { Field, Form, Formik, FormikHelpers, FormikProps, useFormik } from 'formik'
import { signInSchema } from '@/src/shared/schemas'
import Link from 'next/link'
import { SingInParams } from '../../service/types/signInTypes'
import { GithubLogo, GoogleLogo } from '@/src/shared/assets/icons/icons'

type Props = {
  onSubmit: (values: SingInParams, actions: FormikHelpers<SingInParams>) => void
}

export const SignInForm = ({ onSubmit }: Props) => {
  const { locale } = useTranslate()

  const onSubmitHandler = (values: SingInParams, actions: FormikHelpers<SingInParams>) => {
    onSubmit(values, actions)
  }
  const initialValues: SingInParams = {
    email: '',
    password: '',
  }

  return (
    <Card className="w-[378px]">
      <Typography variant="h1" className="text-center mb-[13px]">
        {locale.auth.signIn}
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
        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema(locale)}
          onSubmit={onSubmitHandler}
        >
          {({
            touched,
            errors,
            status,
            isValid,
            dirty,
            isSubmitting,
          }: FormikProps<SingInParams>) => (
            <Form>
              <div className="flex flex-col gap-y-6 mb-9">
                <Field
                  name="email"
                  type="email"
                  as={Input}
                  label={locale.auth.email}
                  error={touched.email && errors.email}
                />
                <Field
                  name="password"
                  type="password"
                  as={Input}
                  label={locale.auth.password}
                  error={
                    (touched.password && errors.password) ||
                    (status && locale.auth.authErrors.incorrectEmailOrPassword)
                  }
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
                  disable={!((isValid && dirty) || isSubmitting)}
                  className="w-full"
                />
              </div>
            </Form>
          )}
        </Formik>
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
