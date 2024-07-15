import { FormikHelpers } from 'formik'
import { ProfileEditParams } from '@/src/features/profile/edit/model/types/profileEditTypes'
import { useUpdateProfileMutation } from '@/src/features/profile/edit/api/profileApi'
import { useToast } from '@/src/app/hooks/useToast'
import { useTranslate } from '@/src/app/hooks/useTranslate'

export const useUpdateProfile = () => {
  const { locale } = useTranslate()
  const [updateProfile] = useUpdateProfileMutation()
  const handleUpdateProfile = async (
    profileData: ProfileEditParams,
    actions: FormikHelpers<ProfileEditParams>
  ) => {
    const formData = new FormData()

    formData.append('username', profileData.username)
    formData.append('firstName', profileData.firstName)
    formData.append('lastName', profileData.lastName)
    if (profileData.dateOfBirth) {
      formData.append('dateOfBirth', '') // toISOString()
    }
    formData.append('country', profileData.country)
    formData.append('city', profileData.city)
    formData.append('aboutMe', profileData.aboutMe)

    try {
      await updateProfile(formData).unwrap()
      useToast(locale.profile.profileSetting.changesSaved)
      actions.resetForm()
    } catch (error) {
      const errMessage =
        (error as { data?: { message?: string } })?.data?.message ?? 'Unknown error'
      useToast(errMessage, true)
    }
  }
  return { handleUpdateProfile }
}