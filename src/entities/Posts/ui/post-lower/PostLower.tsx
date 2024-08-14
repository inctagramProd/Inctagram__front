import { useState } from 'react'
import { TextArea } from '@/src/shared/ui'
import { useTranslate } from '@/src/app/hooks/useTranslate'
import { ButtonsPanel, CommentsPanel, DescriptionPanel, LikesPanel } from './'
import { Comment, Like, PageText } from '../'

type PostLowerProps = {
  authorName: string
  avatarUrl: string
  postDescription: string | null
  likes: Like[]
  comments: Comment[]
}

export const PostLower = ({
  authorName,
  avatarUrl,
  postDescription,
  likes,
  comments,
}: PostLowerProps) => {
  const [textArea, setTextArea] = useState<boolean>(false)

  const { locale } = useTranslate()
  const pageText: PageText = locale.profile.postViews

  const openTextArea = () => {
    setTextArea(!textArea)
  }

  return (
    <div className="post__lower">
      <ButtonsPanel />
      <DescriptionPanel
        authorName={authorName}
        avatarUrl={avatarUrl}
        pageText={pageText}
        postDescription={postDescription}
      />
      <LikesPanel likes={likes} pageText={pageText} />
      <CommentsPanel comments={comments} pageText={pageText} />
      ///
      <div className={'flex flex-col'}>
        <div className="flex justify-between transition duration-700 ease-in-out">
          <span className="text-dark-100 cursor-pointer" onClick={openTextArea}>
            {pageText.addComment}
          </span>
          {/*<Button label={pageText.publish} style={'text'} />*/}
        </div>
        <TextArea borderStyle={'bottom'} />
      </div>
      ///
    </div>
  )
}
