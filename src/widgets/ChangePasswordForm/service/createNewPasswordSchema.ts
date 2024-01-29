import * as Yup from 'yup'
import { LocaleType } from '@/public/locales/en'

export const createNewPasswordSchema = (locale: LocaleType) => {
  return Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
        locale.auth.authErrors.password.regex
      )
      .min(6, locale.auth.authErrors.password.min)
      .max(20, locale.auth.authErrors.password.max)
      .required(locale.auth.authErrors.password.nonEmpty),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], locale.auth.authErrors.refine)
      .required(locale.auth.authErrors.passwordConfirm),
  })
}
