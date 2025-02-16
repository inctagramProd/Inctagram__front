import { useToast } from '@/src/app/hooks/useToast'
import { useUpdateProfileMutation } from '@/src/features/profile/edit/api/profileApi'
import { useTranslate } from '@/src/app/hooks/useTranslate'

export const useImageUpload = () => {
  const { locale } = useTranslate()
  const [updateProfile, { isLoading: isUpdateImgLoading, isSuccess: isUpdateImgSuccess }] =
    useUpdateProfileMutation()

  const handleImageUpload = async (profileImage: FormData) => {
    try {
      await updateProfile(profileImage).unwrap()
      useToast(locale.profile.profileSetting.changesSaved)
    } catch (error) {
      const errMessage =
        (error as { data?: { message?: string } })?.data?.message ?? 'Unknown error'
      useToast(errMessage, true)
    }
  }
  return { handleImageUpload, isUpdateImgLoading, isUpdateImgSuccess }
}