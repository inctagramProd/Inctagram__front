import { Card, Typography, Input, Button, Modal, ReCaptcha } from '@/src/shared/ui'
import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useSendUserEmailMutation } from '@/src/shared/api/authApi'
import { useState } from 'react'
import { useForgotPasswordForm } from '../service/useForgotPasswordForm'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type FormValues = {
  email: string
}

export const ForgotPasswordForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [reCaptcha, setReCaptcha] = useState<null | string>(null)
  const [email, setEmail] = useState('')

  const router = useRouter()

  const initialValues: FormValues = { email: '' }

  const [sendUserEmail, { isSuccess }] = useSendUserEmailMutation()
  const { forgotPasswordSchema, locale } = useForgotPasswordForm()

  const handleSubmit = async (values: FormValues, { setFieldError }: FormikHelpers<FormValues>) => {
    try {
      const payload = {
        email: values.email,
        ...(isSuccess ? {} : { recaptchaToken: reCaptcha }),
      }
      console.log(payload.email)
      await sendUserEmail(payload).unwrap()
      setIsModalOpen(true)
    } catch (error) {
      const err = error as FetchBaseQueryError

      if (err.status === 404) {
        setFieldError('email', 'test')
      }
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
        {locale.forgotPasswordTitle}
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
              error={touched.email && errors.email}
            />
            <Typography className="mt-2 mb-5 text-light-900" variant="regular_14">
              {locale.instructions}
            </Typography>
            {isSuccess && (
              <Typography className="mt-2 mb-5 text-light-900" variant="regular_14">
                {locale.linkHasBeenSent}
              </Typography>
            )}
            <Button
              className="w-full"
              style="primary"
              label={isSuccess ? locale.sendLinkAgain : locale.sendLink}
              type="submit"
              disable={
                isSubmitting || !isValid || (!isSuccess && !reCaptcha) || values.email === ''
              }
            />
            <Button
              style="text"
              label={locale.backToSignIn}
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
          <ReCaptcha onChange={value => setReCaptcha(value)} />
        </div>
      )}
    </Card>
  )
}
