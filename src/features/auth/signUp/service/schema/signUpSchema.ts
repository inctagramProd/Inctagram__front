import * as Yup from 'yup'
import { LocaleType } from '@/public/locales/en'

export const signUpSchema = (locale: LocaleType) => {
  return Yup.object().shape({
    username: Yup.string()
      .min(6, locale.auth.authErrors.usernameField.min)
      .max(30, locale.auth.authErrors.usernameField.max)
      .matches(/^[A-Za-z0-9-_]+$/, locale.auth.authErrors.usernameField.regex)
      .required(locale.auth.authErrors.usernameField.nonEmpty),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], locale.auth.authErrors.refine)
      .required(locale.auth.authErrors.passwordConfirm),
    terms: Yup.bool().oneOf([true], locale.auth.authErrors.terms),
  })
}
