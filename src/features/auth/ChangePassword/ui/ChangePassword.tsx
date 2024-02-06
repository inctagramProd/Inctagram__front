import { Card, Typography, Input, Button } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useSendNewPasswordMutation } from '../service/changePasswordApi'
import { createNewPasswordSchema } from '../service/createNewPasswordSchema'

type FormValues = {
  password: string
  passwordConfirmation: string
}

export const ChangePassword = () => {
  const { locale } = useTranslate()
  const router = useRouter()
  const token = router.query.code

  const initialValues: FormValues = {
    password: '',
    passwordConfirmation: '',
  }

  const [sendNewPassword] = useSendNewPasswordMutation()

  const handleSubmit = async (values: FormValues, { setStatus }: FormikHelpers<FormValues>) => {
    try {
      const payload = {
        passwordRecoveryCode: token,
        password: values.password,
      }
      await sendNewPassword(payload).unwrap()
      router.push('/auth/signin')
    } catch (error) {
      const err = error as { data: { message: string } }

      setStatus(err.data.message)
    }
  }

  return (
    <Card className="my-20 mx-auto">
      <Typography className="text-center mb-9" variant="h1">
        {locale.auth.createNewPassword}
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={createNewPasswordSchema(locale)}
      >
        {({ isSubmitting, errors, touched, status }) => (
          <Form className="flex flex-col gap-6">
            <Field
              name="password"
              type="password"
              as={Input}
              label={locale.auth.newPassword}
              error={touched.password && errors.password}
            />
            <Field
              name="passwordConfirmation"
              type="password"
              as={Input}
              label={locale.auth.passwordConfirmation}
              error={(touched.passwordConfirmation && errors.passwordConfirmation) || status}
            />
            <Typography className="mb-5 text-light-900" variant="regular_14">
              {locale.auth.passwordCharacters}
            </Typography>
            <Button
              className="w-full"
              style="primary"
              label={locale.auth.createNewPassword}
              disable={isSubmitting}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </Card>
  )
}
