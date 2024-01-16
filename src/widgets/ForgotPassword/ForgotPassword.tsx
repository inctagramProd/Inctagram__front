import { Card, Typography, Input, Button } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

type FormValues = {
  email: string
}

export const ForgotPassword = () => {
  const { locale } = useTranslate()
  const router = useRouter()

  const initialValues: FormValues = { email: '' }

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(locale.auth.authErrors.emailField.email)
      .required(locale.auth.authErrors.emailField.nonEmpty),
  })

  const handleSubmit = (values: FormValues) => {
    console.log(values)
  }

  const handleToGoBack = () => {
    router.push('./signin')
  }

  return (
    <Card className="my-20 mx-auto">
      <Typography className="text-center mb-9" variant="h1">
        {locale.auth.forgotPasswordTitle}
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
      >
        {({ isSubmitting, isValid, errors, touched }) => (
          <Form>
            <Field
              name="email"
              type="email"
              as={Input}
              placeholder="Epam@epam.com"
              label="Email"
              error={touched.email && errors.email ? errors.email : null}
            />
            <Typography className="mt-2 mb-5 text-light-900" variant="regular_14">
              {locale.auth.instructions}
            </Typography>
            <Button
              className="w-full"
              style="primary"
              label={locale.auth.sendLink}
              disable={isSubmitting || !isValid}
            />
            <Button
              style="text"
              label={locale.auth.backToSignIn}
              className="w-full my-3"
              type="button"
              onClick={handleToGoBack}
            ></Button>
          </Form>
        )}
      </Formik>
    </Card>
  )
}
