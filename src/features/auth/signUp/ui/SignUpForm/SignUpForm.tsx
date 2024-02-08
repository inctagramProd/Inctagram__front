import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import Link from 'next/link'
import { Trans } from '@/src/shared/helpers/Trans'
import { Button, Card, Checkbox, Input, Typography } from '@/src/shared/ui'
import { signUpSchema } from '@/src/features/auth/signUp/service/schema/signUpSchema'
import {
  SignUpFormValues,
  SignUpParams,
} from '@/src/features/auth/signUp/service/types/signUpTypes'
import GoogleAuth from '@/src/features/auth/signInWithSocialMedia/GoogleAuth'
import GitAuth from '@/src/features/auth/signInWithSocialMedia/GitAuth'

type Props = {
  onSubmit: (values: SignUpParams, actions: FormikHelpers<SignUpFormValues>) => void
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const { locale } = useTranslate()

  const onSubmitHandler = (values: SignUpFormValues, actions: FormikHelpers<SignUpFormValues>) => {
    const { username, email, password } = values
    onSubmit({ username, email, password }, actions)
  }
  const initialValues: SignUpFormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  }

  return (
    <Card className="w-[378px]">
      <Typography variant="h1" className="text-center mb-[13px] cursor-default">
        {locale.auth.signUp}
      </Typography>
      <div className={`flex justify-center gap-x-[60px] mb-6`}></div>
      <div className="mb-[18px]">
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema(locale)}
          onSubmit={onSubmitHandler}
        >
          {({ errors, touched, isValid, dirty, isSubmitting }: FormikProps<SignUpFormValues>) => (
            <Form>
              <div className="flex flex-col gap-y-6 mb-6">
                <Field
                  name="username"
                  type="text"
                  as={Input}
                  label={locale.auth.userName}
                  error={touched.username && errors.username}
                />
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
                <Field
                  name="confirmPassword"
                  type="password"
                  as={Input}
                  label={locale.auth.passwordConfirmation}
                  error={touched.confirmPassword && errors.confirmPassword}
                />
              </div>
              <div className="mb-[18px]">
                <Field name="terms" type="checkbox" as={Checkbox} className="text-xs">
                  {locale.auth.agree}
                </Field>
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
                <Typography variant="error">{touched.terms && errors.terms}</Typography>
              </div>
              <div className="[&>button]:w-full">
                <Button
                  iconName=""
                  style="primary"
                  type="submit"
                  label={locale.auth.signUp}
                  disable={!(dirty && isValid) || isSubmitting}
                  className="w-full"
                />
              </div>
            </Form>
          )}
        </Formik>
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
