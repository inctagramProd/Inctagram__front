import { ProfileInfo } from '@/src/entities/profile'
import { useGetProfileQuery } from '@/src/features/profile/edit/service/profileApi'

type Props = {}

function MainProfileContent({}: Props) {
  const { data: getProfile } = useGetProfileQuery()
  if (getProfile) // TODO исправить
    return (
      <div>
        <ProfileInfo userData={getProfile} />
      </div>
    )
}

export default MainProfileContent