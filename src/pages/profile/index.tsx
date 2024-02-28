import { Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'

const ProfilePage = () => {
  return (
    <Typography variant="h1" className="text-center mt-12">
      Profile Page
    </Typography>
  )
}

ProfilePage.getLayout = getLayoutWithSidebar
export default ProfilePage
