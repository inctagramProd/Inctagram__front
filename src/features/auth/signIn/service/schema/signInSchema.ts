import * as Yup from 'yup'
import { LocaleType } from '@/public/locales/en'

export const signInSchema = (locale: LocaleType) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(locale.auth.authErrors.emailField.nonEmpty)
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        locale.auth.authErrors.emailField.email
      ),
    password: Yup.string()
      .min(6, locale.auth.authErrors.password.min)
      .max(20, locale.auth.authErrors.password.max)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
        locale.auth.authErrors.password.regex
      )
      .required(locale.auth.authErrors.password.nonEmpty),
  })
}
