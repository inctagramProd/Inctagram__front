import { ProfileInfo } from '@/src/entities/profile'
import {useGetPublicUserProfileQuery} from "@/src/features/publicProfile/api/publicProfileApi";

export const PublicProfileModule = () => {
    // const {data: userProfile} = useGetPublicUserProfileQuery()

  return (
    <div>
      <ProfileInfo username={'username'} profileImageURL={''} aboutMe={'userProfile?.aboutMe'} />
      <div className="text-light-900 mt-9 text-center">post list will be here...</div>
    </div>
  )
}
