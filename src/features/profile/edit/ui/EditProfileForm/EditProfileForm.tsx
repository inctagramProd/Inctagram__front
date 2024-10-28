import React from 'react'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { profileEditSchema } from '@/src/features/profile/edit/model/schema/profileEditSchema'
import { ProfileEditParams } from '@/src/features/profile/edit/model/types/profileEditTypes'
import { Button, DatePickerInput, Input, TextArea, Typography } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useGetProfileQuery } from '@/src/features/profile/edit/api/profileApi'
import { LocationSelector } from '@/src/features/profile/edit/ui/SelectLocation/SelectLocation'

type Props = {
  onSubmitHandler: (values: ProfileEditParams, actions: FormikHelpers<ProfileEditParams>) => void
}

export const EditProfileForm = ({ onSubmitHandler }: Props) => {
  const { locale } = useTranslate()
  const { data: profileData, isLoading, isSuccess } = useGetProfileQuery()

  const initialValues: ProfileEditParams = {
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    username: profileData?.username || '',
    dateOfBirth: profileData?.dateOfBirth || '',
    country: '',
    city: '',
    aboutMe: profileData?.aboutMe || '',
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={profileEditSchema(locale)}
        enableReinitialize
      >
        {({ dirty, errors, isSubmitting, isValid, touched }: FormikProps<ProfileEditParams>) => (
          <Form>
            <div className="flex-1 flex flex-col gap-y-4 px-1">
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
                error={errors.dateOfBirth}
                label={locale.profile.profileSetting.dateOfBirthday}
                name="dateOfBirth"
              />
              <LocationSelector />
              <div>
                <Typography
                  children={locale.profile.profileSetting.aboutMe}
                  className={'text-light-900'}
                  variant={'regular_14'}
                />
                <Field as={TextArea} name={'aboutMe'} error={touched.aboutMe && errors.aboutMe} />
              </div>
              <div className="">
                <div className="w-full h-px bg-dark-300 mt-4 mb-6" />
                <div className="[&>button]:w-[159px] max-lg:[&>button]:w-full flex">
                  <Button
                    type="submit"
                    style="primary"
                    label={locale.profile.profileSetting.save}
                    disable={!(isValid && dirty) || isSubmitting}
                    className="w-full text-center ml-auto"
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