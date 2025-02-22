import { ProfileDataUpdate } from '@/src/features/profile/edit/model/types/profileEditTypes'
import { useUpdateProfileMutation } from '@/src/features/profile/edit/api/profileApi'
import { useToast } from '@/src/app/hooks/useToast'
import { useTranslate } from '@/src/app/hooks/useTranslate'

export const useUpdateProfile = () => {
  const { locale } = useTranslate()
  const [updateProfile, { isLoading: isUpdateProfileLoading, isSuccess: isUpdateProfileSuccess }] =
    useUpdateProfileMutation()
  const handleUpdateProfile = async (profileData: ProfileDataUpdate) => {
    try {
      await updateProfile(profileData).unwrap()
      useToast(locale.profile.profileSetting.changesSaved)
    } catch (error) {
      const errorResponse = error as {
        data: { statusCode: number; messages: { message: string }[] }
      }
      if (errorResponse.data.statusCode === 400) {
        useToast(errorResponse.data.messages[0].message, true)
      } else {
        useToast('Unknown error', true)
      }
    }
  }
  return { handleUpdateProfile, isUpdateProfileLoading, isUpdateProfileSuccess }
}
