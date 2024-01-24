import { Card, Typography, Input, Button, Modal, ReCaptcha } from '@/src/shared/ui'
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
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [email, setEmail] = useState('')

  const { locale } = useTranslate()
  const router = useRouter()

  const initialValues: FormValues = { email: '' }

  const [sendUserEmail, { isSuccess }] = useSendUserEmailMutation()

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(locale.auth.authErrors.emailField.email)
      .required(locale.auth.authErrors.emailField.nonEmpty),
  })

  const handleCaptchaChange = (value: string | null) => {
    setIsCaptchaValid(value !== null)
  }

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
            {isSuccess && (
              <Typography className="mt-2 mb-5 text-light-900" variant="regular_14">
                {locale.auth.linkHasBeenSent}
              </Typography>
            )}
            <Button
              className="w-full"
              style="primary"
              label={isSuccess ? locale.auth.sendLinkAgain : locale.auth.sendLink}
              type="submit"
              disable={isSubmitting || !isValid || !isCaptchaValid || values.email === ''}
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
      {!isSuccess && (
        <div className="flex justify-center">
          <ReCaptcha onChange={handleCaptchaChange} />
        </div>
      )}
    </Card>
  )
}
