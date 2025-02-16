import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { withAuth } from '@/src/features/private_routes/withAuth'
import { MainProfileContent } from '@/src/widgets/Profile'
import { HeadMeta } from '@/src/widgets/HeadMeta/HeadMeta'

const ProfilePage = () => {
  return (
    <>
      <HeadMeta title="My Profile" />
      <MainProfileContent />
    </>
  )
}

ProfilePage.getLayout = getLayoutWithSidebar

export default withAuth(ProfilePage)
