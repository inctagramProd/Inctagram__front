import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { withAuth } from '@/src/features/private_routes/withAuth'
import {MainProfileContent} from "@/src/widgets/Profile";

const ProfilePage = () => {
  return (
    <>
      <MainProfileContent />
    </>
  )
}

ProfilePage.getLayout = getLayoutWithSidebar

export default withAuth(ProfilePage)
