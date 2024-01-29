import { Card, Typography, Input, Button, Modal, ReCaptcha } from '@/src/shared/ui'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useSendUserEmailMutation } from '@/src/shared/api/authApi'
import { useState } from 'react'
import { forgotPasswordSchema } from '../service/forgotPasswordSchema'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type FormValues = {
  email: string
}

export const ForgotPasswordForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reCaptcha, setReCaptcha] = useState<null | string>(null)

  const router = useRouter()
  const { locale } = useTranslate()

  const initialValues: FormValues = { email: '' }

  const [sendUserEmail, { isSuccess }] = useSendUserEmailMutation()

  const handleSubmit = async (values: FormValues, { setStatus }: FormikHelpers<FormValues>) => {
    try {
      const payload = {
        email: values.email,
        recaptchaToken: reCaptcha,
      }
      await sendUserEmail(payload).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      const err = error as { data: { message: string } } // error as FetchBaseQueryError

      setStatus(err.data.message)
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
        validationSchema={forgotPasswordSchema(locale)}
      >
        {({ isSubmitting, isValid, errors, touched, values, status, dirty }) => (
          <Form>
            <Field
              name="email"
              type="email"
              as={Input}
              placeholder="Epam@epam.com"
              label="Email"
              error={(touched.email && errors.email) || status}
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
              disable={isSubmitting || !isValid || !reCaptcha || !dirty}
            />
            <Button
              style="text"
              label={locale.auth.backToSignIn}
              className="w-full my-3"
              type="button"
              onClick={handleToGoBack}
            ></Button>
            <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} email={values.email} />
          </Form>
        )}
      </Formik>

      <div className="flex justify-center">
        <ReCaptcha onChange={value => setReCaptcha(value)} />
      </div>
    </Card>
  )
}
