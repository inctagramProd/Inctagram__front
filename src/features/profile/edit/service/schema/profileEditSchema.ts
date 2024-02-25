import { LocaleType } from '@/public/locales/en'
import * as Yup from 'yup'

export const profileEditSchema = (locale: LocaleType) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .required(locale.profile.profileSetting.profileSettingsErrors.firstNameField.nonEmpty)
      .matches(
        /^[A-Za-zА-Яа-я-' ]{1,50}$/,
        locale.profile.profileSetting.profileSettingsErrors.firstNameField.regex
      )
      .min(1, locale.profile.profileSetting.profileSettingsErrors.firstNameField.min)
      .max(50, locale.profile.profileSetting.profileSettingsErrors.firstNameField.max),
    lastName: Yup.string()
      .required(locale.profile.profileSetting.profileSettingsErrors.lastNameField.nonEmpty)
      .matches(
        /^[A-Za-zА-Яа-я-' ]{1,50}$/,
        locale.profile.profileSetting.profileSettingsErrors.lastNameField.regex
      )
      .min(1, locale.profile.profileSetting.profileSettingsErrors.lastNameField.min)
      .max(50, locale.profile.profileSetting.profileSettingsErrors.lastNameField.max),
    username: Yup.string()
      .required(locale.profile.profileSetting.profileSettingsErrors.usernameField.nonEmpty)
      .matches(
        /^[A-Za-z0-9!#$%*+-?^_]{6,30}$/,
        locale.profile.profileSetting.profileSettingsErrors.usernameField.regex
      )
      .min(6, locale.profile.profileSetting.profileSettingsErrors.usernameField.min)
      .max(30, locale.profile.profileSetting.profileSettingsErrors.usernameField.max),
  })
}
