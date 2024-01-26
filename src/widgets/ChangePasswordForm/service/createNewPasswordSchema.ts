import { useTranslate } from '@/src/app/hooks/useTranslate'
import * as Yup from 'yup'

const { locale } = useTranslate()

export const createNewPasswordSchema = Yup.object().shape({
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
