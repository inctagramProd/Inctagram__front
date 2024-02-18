import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Button, Card, Input, Typography } from '@/src/shared/ui'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import Link from 'next/link'
import { signInSchema } from '@/src/features/auth/signIn/service/schema/signInSchema'
import { SingInParams } from '@/src/features/auth/signIn/service/types/signInTypes'
import GoogleAuth from '../../../signInWithSocialMedia/GoogleAuth'
import GitAuth from '../../../signInWithSocialMedia/GitAuth'

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
        <GoogleAuth name={'Google'} />
        <GitAuth name={'Git'} />
      </div>
      <div className="mb-[18px]">
        <Formik
          initialValues={initialValues}
          validationSchema={signInSchema(locale)}
          onSubmit={onSubmitHandler}
        >
          {({ touched, errors, isValid, dirty, isSubmitting }: FormikProps<SingInParams>) => (
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
                  error={touched.password && errors.password}
                />
              </div>
              <div className="text-end mb-6">
                <Link href="/auth/forgot-password" className="inline-block">
                  <Typography variant="regular_14" className="text-light-900">
                    {locale.auth.forgotPassword}
                  </Typography>
                </Link>
              </div>
              <div className="[&>button]:w-full">
                <Button
                  iconName=""
                  type="submit"
                  style="primary"
                  label={locale.auth.signIn}
                  disable={!(isValid && dirty) || isSubmitting}
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
