import { useEffect, useMemo, useState } from 'react'

import { useTranslate } from '@/src/app/hooks/useTranslate'
import { useUpdateProfileMutation } from '@/src/features/profile/edit/service/profileApi'
import { ProfileEditParams } from '@/src/features/profile/edit/service/types/profileEditTypes'
import { Tabs } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { FormikHelpers } from 'formik'
import { useToast } from '@/src/app/hooks/useToast'
import { EditProfileForm } from '@/src/features/profile/edit/ui/EditProfileForm/EditProfileForm'
import { ProfilePhoto } from '@/src/features/profile/edit/ui/ProfilePhoto/ProfilePhoto'
import { useRouter } from 'next/router'

type Props = {
  onSubmit?: (values: ProfileEditParams, actions: FormikHelpers<ProfileEditParams>) => void
}
const valuesTabs = ['general', 'devices', 'management', 'payments']

export const EditProfile = ({ onSubmit }: Props) => {
  const { push, query } = useRouter()
  const { locale } = useTranslate()
  const [activeTab, setActiveTab] = useState((query.tab as string) || 'general')
  const [updateProfile, { isError, isLoading, isSuccess }] = useUpdateProfileMutation()

  const handleSubmit = async (profileData: ProfileEditParams) => {
    const dateOfBirthday = String(new Date().toISOString())
    console.log(dateOfBirthday, 'dateOfBirthday')
    console.log(profileData.dateOfBirth, 'profileData.dateOfBirth')

    const formData = new FormData()
    formData.append('profileImage', '')
    formData.append('userName', profileData.username)
    formData.append('firstName', profileData.firstName)
    formData.append('lastName', profileData.lastName)
    formData.append('dateOfBirth', '')
    formData.append('country', profileData.country)
    formData.append('city', profileData.city)
    formData.append('aboutMe', profileData.aboutMe)
    try {
      await updateProfile(formData).unwrap()
      useToast(locale.profile.profileSetting.changesSaved)
    } catch (error) {
      useToast(JSON.stringify(error), true)
      const err = error as {
        data: {
          message: string
        }
      }
    }
  }

  const onSubmitHandler = async (
    values: ProfileEditParams,
    actions: FormikHelpers<ProfileEditParams>
  ) => {
    try {
      handleSubmit(values).then(() => {
        actions.resetForm()
      })
    } catch (e) {}
  }

  const handleChangeTabValue = (value: string) => {
    setActiveTab(value)
    void push({ query: { id: query.id, tab: value } })
  }

  const tabs = useMemo(() => {
    return [
      {
        key: 'general_information',
        label: locale.profile.profileSetting.generalInformation,
        value: 'general',
      },
      { key: 'devices', label: locale.profile.profileSetting.devices, value: 'devices' },
      {
        key: 'account_management',
        label: locale.profile.profileSetting.accountManagement,
        value: 'management',
      },
      { key: 'my_payments', label: locale.profile.profileSetting.myPayment, value: 'payments' },
    ]
  }, [locale])

  useEffect(() => {
    // if (!query.tab || !valuesTabs.includes(query.tab as string)) {
    //   setActiveTab('general')
    //   void push({ query: { id: query.id, tab: 'general' } })
    // }
  }, [push, query.tab, query.id])

  return (
    <div className="pt-6 pl-6">
      <Tabs defaultActiveKey={activeTab} options={tabs} onChange={handleChangeTabValue}></Tabs>
      <div className="flex gap-12 flex-row mt-6">
        <div className="w-full max-w-[196px]">
          <ProfilePhoto />
        </div>
        <div className="w-full">
          <EditProfileForm onSubmitHandler={onSubmitHandler} />
        </div>
      </div>
    </div>
  )
}

EditProfile.getLayout = getLayoutWithSidebar

export default EditProfile