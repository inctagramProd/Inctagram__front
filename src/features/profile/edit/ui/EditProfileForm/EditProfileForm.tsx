import React, { useState } from 'react'
import { Field, Form, Formik, FormikHelpers, FormikProps, ErrorMessage } from 'formik'
import { profileEditSchema } from '@/src/features/profile/edit/model/schema/profileEditSchema'
import { ProfileEditParams } from '@/src/features/profile/edit/model/types/profileEditTypes'
import { Button, DatePickerInput, Icon, Input, Select, TextArea, Typography } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useGetProfileQuery } from '@/src/features/profile/edit/api/profileApi'

type Props = {
  onSubmitHandler: (values: ProfileEditParams, actions: FormikHelpers<ProfileEditParams>) => void
}

interface CityOptions {
  [key: string]: {
    title: string | number
    value: string | number
  }[]
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

  const [country, setCountry] = useState<string>('')
  const [city, setCity] = useState<string>('')

  const cityOptions: CityOptions = {
    belarus: [
      { title: 'Minsk', value: 'minsk' },
      { title: 'Brest', value: 'brest' },
    ],
    russia: [
      { title: 'Moscow', value: 'moscow' },
      { title: 'St.Petersburg', value: 'petersburg' },
      { title: 'Novosibirsk', value: 'novosibirsk' },
    ],
    france: [
      { title: 'Paris', value: 'paris' },
      { title: 'Leon', value: 'leon' },
    ],
    null: [{ title: 'Choose city', value: 0 }],
  }

  const handleCountryChange = (selectedValue: { title: string; value: string | number }) => {
    setCountry(selectedValue.value as string)
    setCity('')
  }

  const handleCityChange = (selectedValue: { title: string; value: string | number }) => {
    setCity(selectedValue.value as string)
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
                error={errors.dateOfBirth}
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
                    error={touched.country && errors.country}
                    component={Select}
                    onChange={handleCountryChange}
                    options={[
                      { title: 'Choose country', value: 0 },
                      { title: 'Belarus', value: 'belarus' },
                      { title: 'Russia', value: 'russia' },
                      { title: 'France', value: 'france' },
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
                    name="city"
                    id="city"
                    error={touched.city && errors.city}
                    component={Select}
                    onChange={handleCityChange}
                    options={country ? cityOptions[country] : []}
                    disabled={!country}
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
                <div className={'w-full h-px bg-dark-300 mt-4 mb-4'} />
                <div className="[&>button]">
                  <Button
                    type="submit"
                    style="primary"
                    label={locale.profile.profileSetting.save}
                    disable={!(isValid && dirty) || isSubmitting}
                    className="w-full text-center"
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