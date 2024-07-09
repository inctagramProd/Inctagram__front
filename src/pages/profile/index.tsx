import { Typography } from '@/src/shared/ui'
import { getLayoutWithSidebar } from '@/src/widgets/Layout/LayoutWithSidebar'
import { withAuth } from '@/src/features/private_routes/withAuth'
import Link from 'next/link'
import MainProfileContent from "@/src/widgets/Profile/MainProfileContent/MainProfileContent";

const ProfilePage = () => {
  return (
    <>
        <MainProfileContent/>

    </>
  )
}

ProfilePage.getLayout = getLayoutWithSidebar

export default withAuth(ProfilePage)
