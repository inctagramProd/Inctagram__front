import { useTranslate } from '@/src/app/hooks/useTranslate'
import * as Yup from 'yup'

export const useForgotPasswordForm = () => {
  const { locale } = useTranslate()

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(locale.auth.authErrors.emailField.email)
      .required(locale.auth.authErrors.emailField.nonEmpty),
  })

  return { forgotPasswordSchema, locale: locale.auth }
}
