import { useState } from 'react'
import { Typography } from '@/src/shared/ui'
import type { PageText } from '../'
import { AvatarImageLink, truncateDescription } from '../'

type Props = {
  authorName: string
  avatarUrl: string
  pageText: PageText
  postDescription: string | null
}

export const DescriptionPanel = ({ authorName, avatarUrl, pageText, postDescription }: Props) => {
  const [showDescription, setShowDescription] = useState<boolean>(false)

  const openDescription = () => {
    console.log(`> open description ${showDescription}`)
    setShowDescription(!showDescription)
  }

  return (
    <>
      {postDescription ? (
        <div
          className={`post__lower__description-panel flex flex-col w-full min-h-15 overflow-hidden gap-2`}
        >
          <div className={`flex gap-2`}>
            <AvatarImageLink src={avatarUrl} className="block mt-1" />
            <div className="text-justify text-s">
              <Typography variant="small_bold" className="inline text-s">
                {authorName}
              </Typography>
              <Typography variant="small" className="inline ml-2">
                {showDescription ? postDescription : truncateDescription(postDescription)}
              </Typography>
              {postDescription && postDescription.length >= 97 ? (
                <Typography
                  className={
                    'text-dark-100 hover:text-light-900 duration-500 cursor-pointer italic inline ml-2'
                  }
                  onClick={openDescription}
                >
                  {showDescription ? pageText.hide : pageText.else}
                </Typography>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
