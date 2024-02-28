import { EditProfile } from '@/src/features/profile/edit'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const EditProfilePage = () => {
  return <EditProfile />
}

EditProfilePage.getLayout = getLayoutWithSidebar

export default EditProfilePage
