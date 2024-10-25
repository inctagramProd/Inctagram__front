import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { EditProfileForm } from '@/src/features/profile/edit/ui/EditProfileForm/EditProfileForm'
import { EditProfilePhoto } from '@/src/features/profile/edit/ui/ProfilePhoto/EditProfilePhoto'
import { useUpdateProfile } from '@/src/features/profile/edit/model/hooks/useUpdateProfile'
import { useImageUpload } from '@/src/features/profile/edit/model/hooks/useImageUpload'

export const GeneralInformation = () => {
  const { handleUpdateProfile } = useUpdateProfile()
  const { handleImageUpload } = useImageUpload()
  return (
    <div className="mt-6">
      <div className="flex gap-12 flex-row max-lg:flex-col">
        <div className="lg:max-w-[210px] w-full">
          <EditProfilePhoto imageUpload={handleImageUpload} />
        </div>
        <div className="w-full">
          <EditProfileForm onSubmitHandler={handleUpdateProfile} />
        </div>
      </div>
    </div>
  )
}

GeneralInformation.getLayout = getLayoutWithSidebar

export default GeneralInformation