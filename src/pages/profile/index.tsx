import { Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { withAuth } from '@/src/features/private_routes/withAuth'
import Link from 'next/link'
import MainProfileContent from "@/src/widgets/Profile/MainProfileContent/MainProfileContent";

const ProfilePage = () => {
  return (
    <>
        <MainProfileContent/>
        <Typography variant="h1" className="text-center mt-12">
            My Profile
            <br />
            <Link
                href={{
                    pathname: '/profile/settings',
                }}
            >
                settings
            </Link>
        </Typography>
    </>
  )
}

ProfilePage.getLayout = getLayoutWithSidebar

export default withAuth(ProfilePage)
