import { Card, Typography, Input, Button } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/router'
import { useValidateEmailTokenMutation } from '@/src/shared/api/authApi'
import { useEffect } from 'react'
import { createNewPasswordSchema } from '../service/createNewPasswordSchema'

type FormValues = {
  password: string
  passwordConfirmation: string
}

export const ChangePassword = () => {
  // const [validateEmailToken, { isLoading }] = useValidateEmailTokenMutation()
  // const router = useRouter()
  // const token = router.query.code

  // useEffect(() => {
  //   validateEmailToken(token)
  //     .unwrap()
  //     .then()
  //     .catch(() => router.push('/resend-link'))
  // }, [token, validateEmailToken])

  // if (isLoading) {
  //   return <div>Загрузка ..</div>
  // }

  const { locale } = useTranslate()

  const initialValues: FormValues = {
    password: '',
    passwordConfirmation: '',
  }

  // const createNewPasswordSchema = Yup.object().shape({
  //   password: Yup.string()
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
  //       locale.auth.authErrors.password.regex
  //     )
  //     .min(6, locale.auth.authErrors.password.min)
  //     .max(20, locale.auth.authErrors.password.max)
  //     .required(locale.auth.authErrors.password.nonEmpty),
  //   passwordConfirmation: Yup.string()
  //     .oneOf([Yup.ref('password')], locale.auth.authErrors.refine)
  //     .required(locale.auth.authErrors.passwordConfirm),
  // })

  const handleSubmit = (values: FormValues) => {
    const payload = {
      password: values.password,
    }

    console.log(payload)
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
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-6">
            <Field
              name="password"
              type="password"
              as={Input}
              label={locale.auth.newPassword}
              error={touched.password && errors.password ? errors.password : null}
            />
            <Field
              name="passwordConfirmation"
              type="password"
              as={Input}
              label={locale.auth.passwordConfirmation}
              error={
                touched.passwordConfirmation && errors.passwordConfirmation
                  ? errors.passwordConfirmation
                  : null
              }
            />
            <Typography className="mb-5 text-light-900" variant="regular_14">
              {locale.auth.passwordCharacters}
            </Typography>
            <Button
              className="w-full"
              style="primary"
              label={locale.auth.sendLink}
              disable={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </Card>
  )
}
