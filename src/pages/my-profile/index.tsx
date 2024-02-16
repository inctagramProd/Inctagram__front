import { Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { withAuth } from '@/src/features/private_routes/withAuth'

const ProfilePage = () => {
  return (
    <Typography variant="h1" className="text-center mt-12">
      My Profile
    </Typography>
  )
}

ProfilePage.getLayout = getLayoutWithSidebar
export default withAuth(ProfilePage)
