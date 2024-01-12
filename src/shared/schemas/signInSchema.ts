import * as Yup from 'yup'
import { LocaleType } from '@/public/locales/en'

export const signInSchema = (locale: LocaleType) => {
  return Yup.object().shape({
    email: Yup.string()
      .email(locale.auth.authErrors.emailField.email)
      .required(locale.auth.authErrors.emailField.nonEmpty),
    password: Yup.string()
      .min(6, locale.auth.authErrors.password.min)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%*+-?^_]).*$/,
        locale.auth.authErrors.password.regex
      )
      .required(locale.auth.authErrors.password.nonEmpty),
  })
}
