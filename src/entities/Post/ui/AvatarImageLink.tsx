import { isNotEmpty } from '@/src/shared'

type Props = {
  size?: 'small' | 'regular'
  src?: string
  className?: string
  onClickImage?: () => void
}

export const AvatarImageLink = ({
  size = 'regular',
  src = '',
  onClickImage = () => {
    console.log(`> Link "go to profile"`)
  },
  className,
}: Props) => {
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
