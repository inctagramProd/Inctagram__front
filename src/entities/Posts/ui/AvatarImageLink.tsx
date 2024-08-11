import { isNotEmpty } from '@/src/shared'
import { AvatarImageLinkProps } from '../model/types'

export const AvatarImageLink = ({
  size = 'regular',
  src = '',
  onClickImage = () => {
    console.log(`> Link "go to profile"`)
  },
  className,
}: AvatarImageLinkProps) => {
  return (
    <img
      className={`cursor-pointer rounded-full bg-dark-100 ${
        size === 'regular' ? 'w-9 h-9' : 'w-6 h-6'
      } ${className}`}
      src={isNotEmpty(src) ? src : '/mock-pics/no-data.png'}
      alt="avatar"
      onClick={onClickImage}
    />
  )
}
