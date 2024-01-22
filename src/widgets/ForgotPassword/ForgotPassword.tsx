import { Card, Typography, Input, Button, Modal } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useSendUserEmailMutation } from '@/src/shared/api/authApi'
import { useState } from 'react'

type FormValues = {
  email: string
}

export const ForgotPassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')

  const { locale } = useTranslate()
  const router = useRouter()

  const initialValues: FormValues = { email: '' }

  const [sendUserEmail] = useSendUserEmailMutation()

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(locale.auth.authErrors.emailField.email)
      .required(locale.auth.authErrors.emailField.nonEmpty),
  })

  const handleSubmit = async (values: FormValues) => {
    try {
      await sendUserEmail(values.email).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      console.log(error)
      setEmail(values.email)
      setIsModalOpen(true)
    }
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
        {({ isSubmitting, isValid, errors, touched, values }) => (
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
              type="submit"
              disable={isSubmitting || !isValid || values.email === ''}
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
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} email={email} />
    </Card>
  )
}
