import { Typography } from '@/src/shared/ui'
import type { Like, PageText } from '../'
import { AvatarImageLink } from '../'

type Props = {
  likes: Like[]
  pageText: PageText
}

export const LikesPanel = ({ likes, pageText }: Props) => {
  return (
    <>
      {likes?.length > 0 ? (
        <div className="post__lower__likes-panel post__lower__likes-panel flex flex-row w-full h-[40px] items-center mt-2">
          <div className="flex">
            {likes
              .slice(-3)
              .reverse()
              .map((im, idx) => (
                <AvatarImageLink
                  size="small"
                  src={im.avatar}
                  className={`object-cover rounded-full ${
                    idx === 0 ? `ml-[0] z-20` : idx === 1 ? 'ml-[-1vh] z-10' : 'ml-[-1vh] z-0'
                  }`}
                />
              ))}
          </div>
          <Typography variant="medium_14" className={'inline-block pl-3'}>
            {likes.length}
            <span className="font-bold">{pageText.like}</span>
          </Typography>
        </div>
      ) : null}
    </>
  )
}
