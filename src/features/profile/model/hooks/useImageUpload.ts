import { useToast } from '@/src/app/hooks/useToast'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import {useUpdatePhotoProfileMutation} from "@/src/features/profile/api/profileApi";

export const useImageUpload = () => {
  const { locale } = useTranslate()
  const [updateProfile, { isLoading: isUpdateImgLoading, isSuccess: isUpdateImgSuccess }] =
    useUpdatePhotoProfileMutation()

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