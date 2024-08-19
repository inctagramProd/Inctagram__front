import { Typography } from '@/src/shared/ui'
import { AvatarImageLink, PostIconButton } from '../'

type Props = {
  authorName: string
  avatarUrl: string
}

export const PostHeader = ({ authorName, avatarUrl }: Props) => {
  return (
    <div className="post__header flex justify-between items-center w-full h-[30px] mb-4">
      <div className="flex items-center justify-center gap-2">
        <div className="flex gap-2 items-center justify-center">
          <AvatarImageLink src={avatarUrl} />
          <Typography
            className="ml-1 cursor-pointer"
            variant="bold_16"
            onClick={() => {
              console.log(`> Link "go to profile"`)
            }}
          >
            {authorName}
          </Typography>
        </div>
        <div className="rounded-full w-1 h-1 bg-white" />
        <div className={'flex items-center'}>
          <Typography variant="small" className="text-light-900 leading-3">
            22 minutes ago
          </Typography>
        </div>
      </div>
      <PostIconButton iconName={'MoreHorizontal'} logMessage={`> Open modal "post actions"`} />
    </div>
  )
}
