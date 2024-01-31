import * as Yup from 'yup'
import { LocaleType } from '@/public/locales/en'

export const forgotPasswordSchema = (locale: LocaleType) => {
  return Yup.object().shape({
    email: Yup.string()
      .email(locale.auth.authErrors.emailField.email)
      .required(locale.auth.authErrors.emailField.nonEmpty),
  })
}
