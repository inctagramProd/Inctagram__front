import { ProfileInfo } from '@/src/entities/profile'
import { useGetProfileQuery } from '@/src/features/profile/edit/api/profileApi'

export const MainProfileContent = () => {
  const { data: userProfile } = useGetProfileQuery()

  return (
    <div>
      <ProfileInfo
        username={userProfile?.userName}
        profileImageURL={userProfile?.avatars[0]?.url}
        aboutMe={userProfile?.aboutMe}
      />
      <div className="text-light-900 mt-9 text-center">post list will be here...</div>
    </div>
  )
}