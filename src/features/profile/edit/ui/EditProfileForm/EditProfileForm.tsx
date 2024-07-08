import React from 'react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { profileEditSchema } from '@/src/features/profile/edit/service/schema/profileEditSchema'
import { ProfileEditParams } from '@/src/features/profile/edit/service/types/profileEditTypes'
import { Button, DatePickerInput, Input, Select, TextArea, Typography } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'

type Props = {
  onSubmitHandler: (values: ProfileEditParams, actions: FormikHelpers<ProfileEditParams>) => void
}

export const EditProfileForm = ({ onSubmitHandler }: Props) => {
  const { locale } = useTranslate()

  const initialValues: ProfileEditParams = {
    firstName: '',
    lastName: '',
    username: '',
    country: '',
    city: '',
    aboutMe: '',
    dateOfBirth: '',
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={profileEditSchema(locale)}
      >
        {({
          dirty,
          errors,
          isSubmitting,
          isValid,
          touched,
          handleChange,
          handleBlur,
          values,
        }: FormikProps<ProfileEditParams>) => (
          <Form>
            <div className="flex-1 flex flex-col gap-4">
              <Field
                as={Input}
                error={touched.username && errors.username}
                label={locale.auth.userName}
                name="username"
              />
              <Field
                as={Input}
                error={touched.firstName && errors.firstName}
                label={locale.profile.profileSetting.firstName}
                name="firstName"
              />
              <Field
                as={Input}
                error={touched.lastName && errors.lastName}
                label={locale.profile.profileSetting.lastName}
                name="lastName"
              />
              <Field
                as={DatePickerInput}
                error={touched.dateOfBirth && errors.dateOfBirth}
                label={locale.profile.profileSetting.dateOfBirthday}
                name="dateOfBirth"
              />
              <div className={'flex flex-row gap-4'}>
                <div className={'flex-1'}>
                  <Typography
                    children={locale.profile.profileSetting.country}
                    className={'text-light-900'}
                    variant={'regular_14'}
                  />
                  <Field
                    className="max-w-none z-10"
                    name="country"
                    id="country"
                    component={Select}
                    error={touched.country && errors.country}
                    options={[
                      { title: 'Belarus', value: 'Belarus' },
                      { title: 'Russia', value: 'Russia' },
                      { title: 'France', value: 'France' },
                    ]}
                  ></Field>
                </div>
                <div className={'flex-1'}>
                  <Typography
                    children={locale.profile.profileSetting.city}
                    className={'text-light-900'}
                    variant={'regular_14'}
                  />
                  <Field
                    className="max-w-none w-full z-10"
                    component={Select}
                    name="city"
                    id="city"
                    error={touched.city && errors.city}
                    options={[
                      { title: 'Minsk', value: 'Minsk' },
                      { title: 'Moscow', value: 'Moscow' },
                      { title: 'Paris', value: 'Paris' },
                    ]}
                  ></Field>
                </div>
              </div>
              <div>
                <Typography
                  children={locale.profile.profileSetting.aboutMe}
                  className={'text-light-900'}
                  variant={'regular_14'}
                />
                <Field as={TextArea} name={'aboutMe'} error={touched.aboutMe && errors.aboutMe} />
              </div>
              <div className={'flex items-end flex-col'}>
                <div className={'w-full h-px bg-dark-300 mt-4 mb-4'}></div>
                <div className="[&>button]:w-full">
                  <Button
                    type="submit"
                    style="primary"
                    label={locale.profile.profileSetting.save}
                    disable={!(isValid && dirty) || isSubmitting}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

