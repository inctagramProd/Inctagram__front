import { isNotEmpty } from '@/src/shared'
import { AvatarImageLinkProps } from '../model/types'

export const AvatarImageLink = ({
  avatarUrl = '',
  onClickImage = () => {
    console.log(`> Link "go to profile"`)
  },
}: AvatarImageLinkProps) => {
  return (
    <img
      className="cursor-pointer rounded-full bg-dark-100 w-7 h-7"
      src={isNotEmpty(avatarUrl) ? avatarUrl : '/mock-pics/no-data.png'}
      alt="avatar"
      onClick={onClickImage}
    />
  )
}
