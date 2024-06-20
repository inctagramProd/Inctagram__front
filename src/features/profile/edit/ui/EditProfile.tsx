import { ChangeEvent, RefObject, useRef, useState } from 'react'

import { useTranslate } from '@/src/app/hooks/useTranslate'
import {
  UpdateProfileData,
  useUpdateProfileMutation,
} from '@/src/features/profile/edit/service/editProfileApi'
import { profileEditSchema } from '@/src/features/profile/edit/service/schema/profileEditSchema'
import { ProfileEditParams } from '@/src/features/profile/edit/service/types/profileEditTypes'
import {
  Button,
  DatePickerInput,
  Icon,
  Input,
  Select,
  Tabs,
  TextArea,
  Typography,
} from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import { useToast } from '@/src/app/hooks/useToast'

type Props = {
  onSubmit?: (values: ProfileEditParams, actions: FormikHelpers<ProfileEditParams>) => void
}

export const EditProfile = ({ onSubmit }: Props) => {
  const { locale } = useTranslate()
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const [username, setUsername] = useState<string>('')
  const uploadRef: RefObject<HTMLInputElement> = useRef(null)
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)

  const [profileData, setProfileData] = useState<UpdateProfileData>({
    profileImage: null,
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    country: '',
    city: '',
    aboutMe: '',
  })

  const [updateProfile, { isError, isLoading, isSuccess }] = useUpdateProfileMutation()

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value)
    setProfileData(prevData => ({ ...prevData, dateOfBirth: date }))
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    if (profileData.profileImage) {
      formData.append('profileImage', profileData.profileImage)
    }
    formData.append('username', profileData.username)
    formData.append('firstName', profileData.firstName)
    formData.append('lastName', profileData.lastName)
    if (dateOfBirth) {
      formData.append('dateOfBirth', dateOfBirth.toISOString()) // Преобразование даты в ISO формат
    }
    formData.append('country', profileData.country)
    formData.append('city', profileData.city)
    formData.append('aboutMe', profileData.aboutMe)

    try {
      await updateProfile(formData).unwrap()
      useToast(locale.profile.profileSetting.changesSaved)
    } catch (error) {
      useToast(JSON.stringify(error), true)
      const err = error as { data: { message: string } }
    }
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileData(prev => ({ ...prev, profileImage: file }))
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result)
        }
      }
    }
  }

  const handleOpenFileUploadWindow = () => {
    if (uploadRef.current) {
      uploadRef.current.click()
    }
  }

  const onSubmitHandler = (
    values: ProfileEditParams,
    actions: FormikHelpers<ProfileEditParams>
  ) => {
    if (onSubmit) {
      onSubmit(values, actions)
    }
  }
  const initialValues: ProfileEditParams = {
    firstName: '',
    lastName: '',
    username: '',
  }

  return (
    <div className={'pt-6 pl-6'}>
      <button onClick={handleSubmit}>hello world</button>
      <Tabs
        options={[
          { key: 'general_information', label: 'General information' },
          { key: 'devices', label: 'Devices' },
          { key: 'account_management', label: 'Account Management' },
          { key: 'my_payments', label: 'My payments' },
        ]}
      ></Tabs>
      <div className={'flex gap-12 flex-row mt-6'}>
        <div className={'w-full max-w-[196px]'}>
          <div
            className={
              'photo_block w-[196px] h-[196px] bg-dark-500 rounded-full flex justify-center items-center'
            }
          >
            {selectedImage ? (
              <img
                alt={'Profile'}
                className={'rounded-full w-full h-full object-cover'}
                src={selectedImage}
              />
            ) : (
              <Icon height={48} iconName={'Picture'} width={48} />
            )}
          </div>
          <div className={'mt-6 upload'}>
            <label>
              <Button
                label={'Add a Profile Photo'}
                onClick={handleOpenFileUploadWindow}
                style={'outline'}
              ></Button>
              <input
                accept={'image/jpeg, image/png'}
                className={'hidden'}
                id={'upload-button'}
                onChange={handleImageUpload}
                ref={uploadRef}
                type={'file'}
              />
            </label>
          </div>
        </div>
        <div className={'w-full'}>
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
            }: FormikProps<ProfileEditParams>) => (
              <Form className={'flex-1 flex flex-col gap-4'}>
                <Field
                  as={Input}
                  error={touched.username && errors.username}
                  label={locale.auth.userName}
                  name={'username'}
                  required={'true'}
                  type={'username'}
                />
                <Field
                  as={Input}
                  error={touched.firstName && errors.firstName}
                  label={locale.profile.profileSetting.firstName}
                  name={'firstName'}
                  required={'true'}
                  type={'firstName'}
                />
                <Field
                  as={Input}
                  error={touched.lastName && errors.lastName}
                  label={locale.profile.profileSetting.lastName}
                  name={'lastName'}
                  required={'true'}
                  type={'lastName'}
                />
                <DatePickerInput label={locale.profile.profileSetting.dateOfBirthday} />
                <div className={'flex flex-row gap-4'}>
                  <div className={'flex-1'}>
                    <Typography
                      children={locale.profile.profileSetting.country}
                      className={'text-light-900'}
                      variant={'regular_14'}
                    />
                    <Select
                      className={'max-w-none z-10'}
                      options={[
                        { title: 'Belarus', value: 'Belarus' },
                        { title: 'Russia', value: 'Russia' },
                      ]}
                    />
                  </div>
                  <div className={'flex-1'}>
                    <Typography
                      children={locale.profile.profileSetting.city}
                      className={'text-light-900'}
                      variant={'regular_14'}
                    />
                    <Select
                      className={'max-w-none w-full z-10'}
                      options={[
                        { title: 'Minsk', value: 'Minsk' },
                        { title: 'Moscow', value: 'Moscow' },
                      ]}
                    />
                  </div>
                </div>
                <div>
                  <Typography
                    children={locale.profile.profileSetting.aboutMe}
                    className={'text-light-900'}
                    variant={'regular_14'}
                  />
                  <TextArea />
                </div>
                <div className={'flex items-end flex-col'}>
                  <div className={'w-full h-px bg-dark-300 mt-4 mb-4'}></div>
                  <div>
                    <Button
                      label={'Save Changes'}
                      onClick={handleSubmit}
                      style={'primary'}
                      disable={isLoading}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

EditProfile.getLayout = getLayoutWithSidebar

export default EditProfile
