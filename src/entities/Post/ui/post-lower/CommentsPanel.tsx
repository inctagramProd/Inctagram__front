import { useState } from 'react'
import { Typography } from '@/src/shared/ui'
import type { Comment, PageText } from '../'
import { AvatarImageLink } from '../'

type Props = {
  comments: Comment[]
  pageText: PageText
}

export const CommentsPanel = ({ comments, pageText }: Props) => {
  const [commentOpen, setCommentOpen] = useState<boolean>(false)

  const openComments = () => {
    setCommentOpen(!commentOpen)
  }

  return (
    <div className="post__lower__comments-panel mt-4 w-full m-h-[30px] h-auto">
      <div className="post__lower__comments-panel__spoiler cursor-pointer" onClick={openComments}>
        <Typography
          variant="bold_14"
          className="text-dark-100 hover:text-light-900 transition duration-500 ease-in-out"
        >
          {comments?.length > 0
            ? `${pageText.viewAllComments} (${comments?.length}) `
            : pageText.noComments}
        </Typography>
      </div>
      <div className="transition duration-600 ease-in-out my-3">
        {commentOpen
          ? comments.map((el: Comment, i: number) => {
              return (
                <div key={i} className="flex gap-2 mb-1">
                  <AvatarImageLink size="small" src={el.avatar} />
                  <div className="inline">
                    <div className="text-justify text-s">
                      <Typography variant="small_bold" className="inline">
                        {el.name}
                      </Typography>
                      <Typography variant="small" className="inline ml-1">
                        {el.comment}
                      </Typography>
                    </div>
                    <Typography
                      variant="small"
                      className={
                        'text-dark-100 hover:text-light-900 cursor-pointer italic transition duration-500 ease-in-out'
                      }
                    >
                      {el.date}
                    </Typography>
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}
