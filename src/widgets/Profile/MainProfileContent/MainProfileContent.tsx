import { ProfileInfo } from '@/src/entities/profile'
import { useGetProfileQuery } from '@/src/features/profile/edit/service/profileApi'

type Props = {}

function MainProfileContent({}: Props) {
  const { data: getProfile } = useGetProfileQuery()
  return (
    <div>
      <ProfileInfo userName={getProfile?.username} aboutMe={getProfile?.aboutMe}/>
    </div>
  )
}

export default MainProfileContent