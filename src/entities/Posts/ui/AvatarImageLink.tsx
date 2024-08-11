import { isNotEmpty } from '@/src/shared'
import { AvatarImageLinkProps } from '../model/types'

export const AvatarImageLink = ({
  avatarUrl = '',
  onClickImage = () => {
    console.log(`> Link "go to profile"`)
  },
  className,
}: AvatarImageLinkProps) => {
  return (
    <img
      className={`cursor-pointer rounded-full bg-dark-100 w-9 h-9 ${className}`}
      src={isNotEmpty(avatarUrl) ? avatarUrl : '/mock-pics/no-data.png'}
      alt="avatar"
      onClick={onClickImage}
    />
  )
}
