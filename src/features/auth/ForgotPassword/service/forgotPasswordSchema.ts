import * as Yup from 'yup'
import { LocaleType } from '@/public/locales/en'

export const forgotPasswordSchema = (locale: LocaleType) => {
  return Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        locale.auth.authErrors.emailField.email
      )
      .required(locale.auth.authErrors.emailField.nonEmpty),
  })
}
